import { Radar, Task } from '@mui/icons-material'
import { createBrowserRouter } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'
import SignUp from '~/pages/signup/signup'
import lazyLoad from '~/shared/lazyLoad'

import Layout from './layout/layout'

const LoginPage = lazyLoad(() => import('~/pages/LoginPage/LoginPage'))
const AdminPage = lazyLoad(() => import('~/pages/AdminPage/AdminPage'))
const RequestsWidget = lazyLoad(
  () => import('~/widgets/Admin/SignUpRequest/SignUpRequest'),
)
const AdminWelcomeWidget = lazyLoad(
  () => import('~/widgets/Admin/Welcome/Welcome'),
)
const AdminUserRole = lazyLoad(
  () => import('~/widgets/Admin/UserRole/UserRole'),
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/state',
        element: <Radar />,
      },
      {
        path: '/measure',
        element: <Measure />,
      },
      {
        path: '/task',
        element: <Task />,
      },
      {
        path: '/settings',
        element: <Setting />,
      },
      {
        path: '/admin',
        element: <AdminPage />,
        children: [
          {
            path: 'welcome',
            element: <AdminWelcomeWidget />,
          },
          {
            path: 'requests',
            element: <RequestsWidget />,
          },
          {
            path: 'permissions',
            element: <AdminUserRole />
          }
        ],
      },
    ],
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'signup',
    element: <SignUp />,
  },
])

export default router
