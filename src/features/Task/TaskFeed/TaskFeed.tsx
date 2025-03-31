import { memo, useEffect } from "react";
import TaskFeedItem from "./TaskFeedItem";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useIntersection } from "@mantine/hooks";
import { ErrorResponse, PaginatedQueryType } from "~/shared/typings/common/common";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useService from "~/entities/useService";
import { GetTasksResponseType } from "~/shared/typings/tasks/tasks";


const TaskFeed = memo(() => {

    const { getTasks } = useService()
    const PAGE_SIZE = 10
  
    const {
      data,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      isLoading,
      isError,
    } = useInfiniteQuery<GetTasksResponseType, AxiosError<ErrorResponse>>({
      queryKey: ['tasks'],
      queryFn: async ({ pageParam = 1, signal }) => {
        const params: PaginatedQueryType = {
          page: pageParam as number,
          size: PAGE_SIZE,
        }
  
        const response = await getTasks(params, signal)
        return response
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const totalItems = lastPage.data?.tasks?.length
        const loadedItems = allPages.reduce(
          (acc, page) => acc + page.data.tasks?.length,
          0,
        )
        return loadedItems < totalItems ? allPages?.length + 1 : undefined
      },
    })
  
    const { ref: lastRowRef, entry } = useIntersection<HTMLDivElement>({
      root: null,
      threshold: 1,
    })
  
    useEffect(() => {
      if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }, [entry, hasNextPage, isFetchingNextPage, isFetchingNextPage])
  
    const allRequests = data?.pages.flatMap((page) => page.data.tasks) || []

    if (isLoading)
        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress size={80} />
          </Box>
        )
    
      if (isError)
        return (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Typography fontSize={24} color='error'>
              Неизвестная ошибка
            </Typography>
          </Box>
        )

    return (
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start'}}>
            {!!allRequests.length && allRequests.map((task, index) => (<TaskFeedItem key={`key__${task.id}`} {...task} ref={index === allRequests.length - 1 ? lastRowRef : null} />))}
            {isFetchingNextPage && (
        <Box sx={{ py: 2 }}>
          <CircularProgress size={40} />
        </Box>
      )}

      {!hasNextPage && (
        <Typography sx={{ py: 2, color: 'text.secondary' }}>
          Задачи закончились
        </Typography>
      )}
        </Box>
    )
})

export default TaskFeed