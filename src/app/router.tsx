import { Radar, Task, Login } from '@mui/icons-material'
import { createBrowserRouter } from 'react-router-dom'

import Measure from '~/pages/measure/measure'
import Setting from '~/pages/setting/setting'
import SignUp from '~/pages/signup/signup'

import Layout from './layout/layout'

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
    path: '/login/',
    element: <Login />,
  },
  {
    path: '/signup/',
    element: <SignUp />,
  },
])

export default router
