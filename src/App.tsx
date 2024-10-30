import './App.css'
import Layout from '@components/layout/layout'
import Radar from '@components/radar/radar'
import Measure from '@views/measure/measure'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: '/state/',
        element: <Radar/>,
      },
      {
        path: '/measure/',
        element: <Measure/>,
      },
      {
        path: '/task/',
        element: <p>task</p>,
      },
      {
        path: '/setting/',
        element: <p>setting</p>,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App