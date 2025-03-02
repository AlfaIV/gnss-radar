import { Radar, Task } from '@mui/icons-material'
import { createBrowserRouter } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'

import lazyLoad from '~/shared/lazyLoad'

import Layout from './layout/layout'
import { withSuspended } from '~/shared/components/Suspended/Suspended'

const LoginPage = withSuspended(lazyLoad(() => import('~/pages/LoginPage/LoginPage')))
const AdminPage = withSuspended(lazyLoad(() => import('~/pages/AdminPage/AdminPage')))
const RequestsWidget = withSuspended(lazyLoad(
  () => import('~/widgets/Admin/SignUpRequest/SignUpRequest')),
)
const AdminWelcomeWidget = withSuspended(lazyLoad(
  () => import('~/widgets/Admin/Welcome/Welcome')),
)
const AdminUserRole = withSuspended(lazyLoad(
  () => import('~/widgets/Admin/UserRole/UserRole')),
)
const SignUpPage = withSuspended(lazyLoad(() => import('~/pages/SignUp/SignUpPage')))

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
    element: <SignUpPage />,
  },
])

export default router
