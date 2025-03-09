import { Box } from '@mui/material'

import LoginForm from '~/features/Auth/LoginForm/LoginForm'

const Login = () => {
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
