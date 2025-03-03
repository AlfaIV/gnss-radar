import { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import style from './layout.module.scss'

const Layout: FC = () => {
  return (
      <div className={style.app}>
        <Outlet />
      </div>
  )
}

export default Layout
