import { Box, Typography } from '@mui/material'
import { memo } from 'react'

const AdminWelcome = memo(() => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 5,
      }}
    >
      <Typography fontSize={24}>Добро пожаловать!</Typography>
    </Box>
  )
})

export default AdminWelcome
