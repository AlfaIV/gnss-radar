import { Outlet } from 'react-router'
import Sidebar from '~/features/Layout/Sidebar/Sidebar'

import { HOCProps } from '~/shared/typings/common/common'
import HeaderAndFooter from '~/widgets/Layout/HeaderAndFooter/HeaderAndFooter'
import sidebarList from './SidebarItems'

const AdminPage = () => {
  return (
    <HeaderAndFooter>
    <Sidebar items={sidebarList}>

      <Outlet />
      </Sidebar>
    </HeaderAndFooter>
  )
}

export default AdminPage
