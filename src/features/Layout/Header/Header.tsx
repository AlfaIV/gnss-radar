import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Button, Container, Stack, AppBar, Typography } from '@mui/material'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import useService from '~/entities/useService'
import MenuBar from './MenuBar'
import useUserStore from '~/entities/store/UserStore/useUserStore'
import { UserType } from '~/shared/typings/user/userTypings'

const Header: FC = () => {
  const { logout } = useService()

  const navigate = useNavigate()
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      navigate('/login')
    },
  })

  const [name, surname] = useUserStore((state: UserType) => [state.name, state.surname])

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
        <Button
          color='inherit'
          onClick={() => logoutMutation.mutate()} sx={{gap: '10px'}}
        >
          <Typography 
          sx={{ textTransform: 'capitalize', fontSize: 24 }}
          >{`${name} ${surname}`}</Typography>
          
          <LogoutOutlinedIcon sx={{fontSize: 32}} />
        </Button>
      </Container>
    </AppBar>
  )
}

export default Header
