import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Button, Container, Stack, AppBar, Typography } from '@mui/material'
import { FC } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import useService from '~/entities/useService'
import useUserStore from '~/entities/store/UserStore/useUserStore'
import { UserType } from '~/shared/typings/user/userTypings'
import { ROUTES } from '~/shared/config/constants'

import MenuBar from './MenuBar'

const Header: FC = () => {
  const { logout } = useService()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  const [name, surname, clear] = useUserStore((state: UserType) => [
    state.name,
    state.surname,
    state.clearUser,
  ])

  const { mutateAsync: exit } = useMutation({
    mutationKey: ['update-role'],
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['logout'] })
    },
  })

  const handleLogout = async () => {
    try {
      await exit()
      clear()
    } catch (e) {
      console.error('Role change failed:', e)
    } finally {
      navigate(ROUTES.LOGIN)
    }
  }

  return (
    <AppBar position='static'>
      <Container
        maxWidth='xl'
        sx={{
          display: 'flex',
          height: '60px',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Stack
          direction='row'
          spacing={2}
          sx={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <MenuBar />
        </Stack>
        <Button color='inherit' onClick={handleLogout} sx={{ gap: '10px' }}>
          <Typography
            sx={{ textTransform: 'capitalize', fontSize: 24 }}
          >{`${name} ${surname}`}</Typography>

          <LogoutOutlinedIcon sx={{ fontSize: 32 }} />
        </Button>
      </Container>
    </AppBar>
  )
}

export default Header
