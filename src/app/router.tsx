import { Radar, Task} from '@mui/icons-material'
import { createBrowserRouter } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'
import SignUp from '~/pages/signup/signup'

import Layout from './layout/layout'
import lazyLoad from '~/shared/lazyLoad'

const LoginPage = lazyLoad(() => import('~/pages/LoginPage/LoginPage'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/state/',
        element: <Radar />,
      },
      {
        path: '/measure/',
        element: <Measure />,
      },
      {
        path: '/task/',
        element: <Task />,
      },
      {
        path: '/setting/',
        element: <Setting />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
])

export default router
