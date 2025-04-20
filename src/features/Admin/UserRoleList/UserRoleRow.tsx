import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from '@mui/material'
import { memo, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowDropDownIcon } from '@mui/x-date-pickers'

import {
  GivePermissionsRequest,
  UserRoleProps,
  UserRoleType,
} from '~/shared/typings/user/userTypings'
import { ROLES } from '~/shared/config/constants'
import useService from '~/entities/useService'
import {
  StyledTableRow,
  StyledTableCell,
} from '~/shared/components/styled/table/StyledTable'

const UserRoleRow = memo((props: UserRoleProps) => {
  const { name, surname, login, organizationName, role } = props
  const [currentUserRole, setCurrentUserRole] = useState<UserRoleType | null>(
    null,
  )
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const { givePermissions } = useService()
  const queryClient = useQueryClient()

  const { mutateAsync: changeRole, isPending } = useMutation({
    mutationKey: ['update-role'],
    mutationFn: (values: GivePermissionsRequest) => givePermissions(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  const handleRoleChange = async (newRole: UserRoleType) => {
    try {
      await changeRole({ login, newRole })
      setCurrentUserRole(newRole)
    } catch (e) {
      //eslint-disable-next-line no-console
      console.error('Role change failed:', e)
    } finally {
      handleClose()
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <StyledTableRow>
      <StyledTableCell
        sx={{
          width: '20%',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{name}</Typography>
      </StyledTableCell>
      <StyledTableCell
        sx={{
          width: '20%',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{surname}</Typography>
      </StyledTableCell>
      <StyledTableCell
        sx={{
          width: '20%',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{login}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          width: '20%',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <Typography fontSize={24}>{organizationName}</Typography>
      </StyledTableCell>

      <StyledTableCell
        sx={{
          width: '20%',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
        }}
      >
        <IconButton
          onClick={handleClick}
          sx={{
            padding: 0,
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          <Typography
            fontSize={24}
            sx={{ display: 'flex', alignItems: 'center', color: 'black' }}
          >
            {ROLES.find((item) => item.value === currentUserRole)?.label ||
              ROLES.find((item) => item.value === role)?.label ||
              role}
            <ArrowDropDownIcon fontSize='large' />
          </Typography>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'role-menu',
          }}
        >
          {!isPending &&
            ROLES.map((roleOption) => (
              <MenuItem
                key={roleOption.value}
                onClick={() =>
                  handleRoleChange(roleOption.value as UserRoleType)
                }
                sx={{
                  color: 'black',
                  minWidth: '200px',
                }}
                selected={roleOption.value === role}
              >
                {roleOption.label}
              </MenuItem>
            ))}
          {isPending && (
            <MenuItem
              sx={{
                minWidth: '200px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CircularProgress size={24} />
            </MenuItem>
          )}
        </Menu>
      </StyledTableCell>
    </StyledTableRow>
  )
})

export default UserRoleRow
