import { Box } from '@mui/material'
import SignUpForm from '~/features/Auth/SignUpForm/SignUpForm'

const SignUp = () => {

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
        <SignUpForm />
      </Box>
  )
}

export default SignUp
