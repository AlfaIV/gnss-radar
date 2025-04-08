import { createBrowserRouter, Navigate } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'
import lazyLoad from '~/shared/lazyLoad'
import { withSuspended } from '~/shared/components/Suspended/Suspended'

import Layout from './layout/layout'
import Guard from '~/shared/components/Guard/Guard'

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

const TasksPage = withSuspended(
  lazyLoad(() => import('~/pages/TasksPage/TasksPage')),
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
        element: <Guard role={['USER', 'ADMIN', 'SUPERVISOR']}><StatePage /></Guard>,
      },
      {
        path: '/measure',
        element: <Guard role={['USER', 'ADMIN', 'SUPERVISOR']}><Measure /></Guard>,
      },
      {
        path: '/task',
        element: <Guard role={['USER', 'ADMIN', 'SUPERVISOR']}><TasksPage /></Guard>,
      },
      {
        path: '/settings',
        element: <Guard role={['USER', 'ADMIN', 'SUPERVISOR']}><Setting /></Guard>,
      },
      {
        path: '/admin',
        element: <Guard role={['ADMIN']}><AdminPage /></Guard>,
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
