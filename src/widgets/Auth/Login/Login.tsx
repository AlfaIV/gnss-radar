import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import LoginForm from '~/features/Auth/LoginForm/LoginForm'
import { ROUTES } from '~/shared/config/constants'

const Login = () => {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '30px',
      }}
    >
      <LoginForm />
    </Box>
  )
}

export default Login
