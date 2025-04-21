import {
  CircularProgress,
  IconButton,
  Typography,
  Skeleton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { memo } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { UserProps } from '~/shared/typings/user/userTypings'
import useService from '~/entities/useService'
import {
  StyledTableRow,
  StyledTableCell,
} from '~/shared/components/styled/table/StyledTable'

const UserRow = memo((props: UserProps) => {
  const {
    name,
    surname,
    login,
    organizationName,
    id,
    email,
    isDeletedUsers = false,
    isLoading = false,
  } = props

  const { deleteUser, restoreUser } = useService()
  const queryClient = useQueryClient()

  const { mutateAsync: removeUser, isPending } = useMutation({
    mutationKey: ['operate-user'],
    mutationFn: (id: string) => {
      const requestFunc = isDeletedUsers ? restoreUser : deleteUser
      return requestFunc(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${isDeletedUsers ? 'deleted-user-table' : 'user-table'}`],
      })
    },
  })

  if (isLoading) {
    return (
      <StyledTableRow>
        <StyledTableCell sx={{ width: '5%' }}>
          <Skeleton variant='circular' width={40} height={40} />
        </StyledTableCell>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <StyledTableCell
              key={index}
              sx={{
                wordBreak: 'break-word',
                whiteSpace: 'normal',
              }}
            >
              <Skeleton
                variant='text'
                width='60%'
                height={32}
                sx={{ fontSize: '24px' }}
              />
            </StyledTableCell>
          ))}
      </StyledTableRow>
    )
  }

  return (
    <StyledTableRow>
      <StyledTableCell sx={{ width: '5%' }}>
        <IconButton
          disabled={isPending}
          onClick={() => removeUser(id)}
          color={isDeletedUsers ? 'warning' : 'error'}
        >
          {isPending ? (
            <CircularProgress size={24} />
          ) : isDeletedUsers ? (
            <SettingsBackupRestoreIcon />
          ) : (
            <DeleteIcon />
          )}
        </IconButton>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{name}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{surname}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{login}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{email}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{organizationName}</Typography>
      </StyledTableCell>
    </StyledTableRow>
  )
})

export default UserRow
