import { Task } from '@mui/icons-material'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'
import lazyLoad from '~/shared/lazyLoad'
import { withSuspended } from '~/shared/components/Suspended/Suspended'

import Layout from './layout/layout'

const LoginPage = withSuspended(
  lazyLoad(() => import('~/pages/LoginPage/LoginPage')),
)
const AdminPage = withSuspended(
  lazyLoad(() => import('~/pages/AdminPage/AdminPage')),
)
const RequestsWidget = withSuspended(
  lazyLoad(() => import('~/widgets/Admin/SignUpRequest/SignUpRequest')),
)
const AdminWelcomeWidget = withSuspended(
  lazyLoad(() => import('~/widgets/Admin/Welcome/Welcome')),
)
const AdminUserRole = withSuspended(
  lazyLoad(() => import('~/widgets/Admin/UserRole/UserRole')),
)
const SignUpPage = withSuspended(
  lazyLoad(() => import('~/pages/SignUp/SignUpPage')),
)

const StatePage = withSuspended(
  lazyLoad(() => import('~/pages/StatePage/StatePage')),
)

const router = createBrowserRouter([
  {
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate to='/state' />,
      },
      {
        path: '/state',
        element: <StatePage />,
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
            element: <AdminUserRole />,
          },
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
