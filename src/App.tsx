import "./App.css";

import Layout from "~/components/layout/layout";
import Radar from "~/components/radar/radar";
import Measure from "~/views/measure/measure";
import Login from "~/views/login/login";
import SignUp from "~/views/signup/signup";
import Task from "~/views/task/task";
import Setting from "~/views/setting/setting";


import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/state/",
        element: <Radar />,
      },
      {
        path: "/measure/",
        element: <Measure />,
      },
      {
        path: "/task/",
        element: <Task />,
      },
      {
        path: "/setting/",
        element: <Setting/>
      },
    ],
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/signup/",
    element: <SignUp />,
  },
]);


function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
