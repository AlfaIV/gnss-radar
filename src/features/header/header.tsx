import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import RouterOutlinedIcon from '@mui/icons-material/RouterOutlined'
import { Button, Container, Stack, AppBar } from '@mui/material'
import { FC } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import { logout } from '~/utils/requests/requests'

const Header: FC = () => {
  const navigate = useNavigate()
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      navigate('/login')
    },
  })

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
          <Stack
            direction='row'
            spacing={0}
            sx={{ display: 'inline-flex', alignItems: 'center' }}
          >
            <RouterOutlinedIcon
              sx={{ fontSize: 40 }}
              onClick={() => navigate('state/')}
            />
            <Button
              color='inherit'
              onClick={() => navigate('state/')}
              sx={{ textTransform: 'capitalize', fontSize: 16 }}
            >
              {' '}
              Мониторинг{' '}
            </Button>
          </Stack>
          <Stack
            direction='row'
            spacing={0}
            sx={{ display: { xs: 'none', md: 'flex' } }}
          >
            <Button
              color='inherit'
              onClick={() => navigate('measure/')}
              sx={{ textTransform: 'capitalize', fontSize: 16 }}
            >
              {' '}
              Измерения{' '}
            </Button>
            <Button
              color='inherit'
              onClick={() => navigate('task/')}
              sx={{ textTransform: 'capitalize', fontSize: 16 }}
            >
              {' '}
              Задания{' '}
            </Button>
            <Button
              color='inherit'
              onClick={() => navigate('setting/')}
              sx={{ textTransform: 'capitalize', fontSize: 16 }}
            >
              {' '}
              Настройки{' '}
            </Button>
          </Stack>
        </Stack>
        <Button
          color='inherit'
          endIcon={<LogoutOutlinedIcon />}
          onClick={() => logoutMutation.mutate()}
          sx={{ textTransform: 'capitalize', fontSize: 16 }}
        >
          {' '}
          user{' '}
        </Button>
      </Container>
    </AppBar>
  )
}

export default Header
