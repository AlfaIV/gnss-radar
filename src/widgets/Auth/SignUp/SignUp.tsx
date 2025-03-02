import { Box } from '@mui/material'
import { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import SignUpForm from '~/features/Auth/SignUpForm/SignUpForm'

const SignUp = () => {
  const navigate = useNavigate()

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
    </Suspense>
  )
}

export default SignUp
