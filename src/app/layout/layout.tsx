import { FC } from 'react'
import { Outlet } from 'react-router-dom'

import style from './layout.module.scss'

const Layout: FC = () => {
  return (
    <div className={style.app}>
      <Outlet />
    </div>
  )
}

export default Layout
