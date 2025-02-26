import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import Header from '~/features/header/header'
import Footer from '~/features/footer/footer'

import style from './layout.module.scss'

const Layout: FC = () => {

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
