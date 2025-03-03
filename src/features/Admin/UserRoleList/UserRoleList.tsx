import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, CircularProgress } from '@mui/material'
import { memo, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { AxiosError } from 'axios'
import UserRoleRow from './UserRoleRow'
import useService from '~/entities/useService'
import { UserRoleResponseEntityType, UserRoleResponseType } from '~/shared/typings/user/userTypings'
import { ErrorResponse, PaginatedQueryType } from '~/shared/typings/common/common'

const UserRoleList = memo(() => {
  const { getUserList } = useService()
  const PAGE_SIZE = 10

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<UserRoleResponseType, AxiosError<ErrorResponse>>({
    queryKey: ['users'],
    queryFn: async ({ pageParam = 1, signal }) => {
      const params: PaginatedQueryType = { 
        page: pageParam as number,
        size: PAGE_SIZE
      }
      
      const response = await getUserList(params, signal)
      return response
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage.users.length
      const loadedItems = allPages.reduce((acc, page) => acc + page.users.length, 0)
      return loadedItems < totalItems ? allPages.length + 1 : undefined
    }
  })

  const { ref: lastRowRef, entry } = useIntersection<HTMLTableRowElement>({
    root: null,
    threshold: 1,
  })

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [entry, hasNextPage, isFetchingNextPage])

  const allUsers = data?.pages.flatMap(page => page.users) || []

  if (isLoading) return <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', p: 5}}><CircularProgress size={80} /></Box>
  if (isError) return <Box sx={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center', p: 5}}>
    <Typography fontSize={24} color='error'>{'Неизвестная ошибка'}</Typography>
    </Box>

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: 24 }}>Имя</TableCell>
            <TableCell sx={{ fontSize: 24 }}>Фамилия</TableCell>
            <TableCell sx={{ fontSize: 24 }}>Логин</TableCell>
            <TableCell sx={{ fontSize: 24 }}>Организация</TableCell>
            <TableCell sx={{ fontSize: 24 }}>Права</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          component="div"
          sx={{
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '100%',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#888',
              borderRadius: '4px',
            },
          }}>
          {allUsers.map((item: UserRoleResponseEntityType) => (
            <UserRoleRow 
              key={item.login} 
              {...item}
            />
          ))}
          <TableRow ref={lastRowRef}>
            <TableCell colSpan={4} sx={{ textAlign: 'center', height: 60 }}>
              {isFetchingNextPage && <CircularProgress size={40} />}
              {!hasNextPage && <Typography>Записей больше нет</Typography>}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
})

export default UserRoleList