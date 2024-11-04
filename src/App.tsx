import "./App.css";
import Layout from "@components/layout/layout";
import Radar from "@components/radar/radar";
import Measure from "@views/measure/measure";
import Login from "@views/login/login";
import SignIn from "@views/signin/signin";
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
        element: <p>task</p>,
      },
      {
        path: "/setting/",
        element: <p>setting</p>,
      },
    ],
  },
  {
    path: "/login/",
    element: <Login />,
  },
  {
    path: "/signin/",
    element: <SignIn />,
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
