import { Box, CircularProgress, Typography } from '@mui/material'
import { memo, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { AxiosError } from 'axios'

import { SignUpRequestionType } from '~/shared/typings/user/userTypings'
import useService from '~/entities/useService'
import {
  ErrorResponse,
  PaginatedQueryType,
} from '~/shared/typings/common/common'

import SignUpRequest from './SignUpRequest'

const SignUpRequestList = memo(() => {
  const { getSignUpRequestList } = useService()
  const PAGE_SIZE = 10

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<SignUpRequestionType, AxiosError<ErrorResponse>>({
    queryKey: ['requestions'],
    queryFn: async ({ pageParam = 1, signal }) => {
      const params: PaginatedQueryType = {
        page: pageParam as number,
        size: PAGE_SIZE,
      }

      const response = await getSignUpRequestList(params, signal)
      return response
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage.data.users?.length
      const loadedItems = allPages.reduce(
        (acc, page) => acc + page.data.users?.length,
        0,
      )
      return loadedItems < totalItems ? allPages?.length + 1 : undefined
    },
  })

  const { ref: lastRowRef, entry } = useIntersection<HTMLTableRowElement>({
    root: null,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [entry, hasNextPage, isFetchingNextPage, isFetchingNextPage])

  const allRequests = data?.pages.flatMap((page) => page.data.users) || []

  if (isLoading)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          p: 5,
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
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          p: 5,
        }}
      >
        <Typography fontSize={24} color='error'>
          Неизвестная ошибка
        </Typography>
      </Box>
    )

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        gap: 4,
        overflowY: 'auto',
        padding: 4,
      }}
    >
      {!!allRequests.length &&
        allRequests.map(
          (request, index) =>
            !!request && (
              <SignUpRequest
                key={request.login}
                {...request}
                ref={index === allRequests.length - 1 ? lastRowRef : null}
              />
            ),
        )}

      {isFetchingNextPage && (
        <Box sx={{ py: 2 }}>
          <CircularProgress size={40} />
        </Box>
      )}

      {!hasNextPage && (
        <Typography sx={{ py: 2, color: 'text.secondary' }}>
          Запросы на регистрацию закончились
        </Typography>
      )}
    </Box>
  )
})

export default SignUpRequestList
