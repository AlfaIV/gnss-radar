import { FC, Suspense } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Box, Typography } from '@mui/material'

import Header from '~/features/header/header'
import Footer from '~/features/footer/footer'
import { authCheck } from '~/utils/requests/requests'

import style from './layout.module.scss'

const Layout: FC = () => {
  const isLocalhost =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'

  const auth = useQuery('authCheck', authCheck, {
    // cacheTime: 0,
    // staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    onSuccess: (data) => {
      if (isLocalhost) {
        return
      }
      if (!data) {
        navigate('/login')
      } else {
        navigate('/state')
      }
    },
  })
  const navigate = useNavigate()

  if (auth.isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h2'>Идёт загрузка...</Typography>
      </Box>
    )
  }

  if (auth.error) {
    return <div>Ошибка при проверке аутентификации</div>
  }

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant='h2'>Идёт загрузка...</Typography>
        </Box>
      }
    >
      <div className={style.app}>
        <Header />
        <div className={style.body}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </Suspense>
  )
}

export default Layout
