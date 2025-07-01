import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
} from '@mui/material'
import { memo, useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useIntersection } from '@mantine/hooks'
import { AxiosError } from 'axios'

import useService from '~/entities/useService'
import {
  GetUserResponseEntityType,
  GetUserResponseType,
  UserListProps,
} from '~/shared/typings/user/userTypings'
import {
  ErrorResponse,
  PaginatedQueryType,
} from '~/shared/typings/common/common'
import { StyledTableCell } from '~/shared/components/styled/table/StyledTable'

import UserRow from './UserRow'

const UserList = memo((props: UserListProps) => {
  const { isDeletedUsers = false } = props
  const { getUserList, getDeletedUserList } = useService()
  const PAGE_SIZE = 10

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<GetUserResponseType, AxiosError<ErrorResponse>>({
    queryKey: [`${isDeletedUsers ? 'deleted-user-table' : 'user-table'}`],
    queryFn: async ({ pageParam = 1, signal }) => {
      const params: PaginatedQueryType = {
        page: pageParam as number,
        size: PAGE_SIZE,
      }

      const requestFunc = isDeletedUsers ? getDeletedUserList : getUserList

      const response = await requestFunc(params, signal)
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

  const allUsers =
    data?.pages.flatMap((page) => page.data.users).filter((u) => !!u) || []

  return (
    <Box
      sx={{
        width: '100%',
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
            <StyledTableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            />
            <TableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            >
              Имя
            </TableCell>
            <TableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            >
              Фамилия
            </TableCell>
            <TableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            >
              Логин
            </TableCell>
            <TableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                fontSize: 24,
                fontWeight: 'bold',
                verticalAlign: 'middle',
                py: 2,
              }}
            >
              Организация
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          component='div'
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
          }}
        >
          {(isLoading || isError) && (
            <>
              <UserRow
                id='0'
                login=''
                name=''
                surname=''
                email=''
                organizationName=''
                isLoading
                isDeletedUsers={isDeletedUsers}
              />
              <UserRow
                id='0'
                login=''
                name=''
                surname=''
                email=''
                organizationName=''
                isLoading
                isDeletedUsers={isDeletedUsers}
              />
              <UserRow
                id='0'
                login=''
                name=''
                surname=''
                email=''
                organizationName=''
                isLoading
                isDeletedUsers={isDeletedUsers}
              />
              <UserRow
                id='0'
                login=''
                name=''
                surname=''
                email=''
                organizationName=''
                isLoading
                isDeletedUsers={isDeletedUsers}
              />
              <UserRow
                id='0'
                login=''
                name=''
                surname=''
                email=''
                organizationName=''
                isLoading
                isDeletedUsers={isDeletedUsers}
              />
            </>
          )}
          {!!allUsers?.length &&
            allUsers.map((item: GetUserResponseEntityType) => (
              <UserRow
                key={item.login}
                {...item}
                isDeletedUsers={isDeletedUsers}
              />
            ))}
          <TableRow ref={lastRowRef}>
            <StyledTableCell
              colSpan={4}
              sx={{ textAlign: 'center', height: 60 }}
            >
              {isFetchingNextPage && <CircularProgress size={40} />}
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
})

export default UserList
