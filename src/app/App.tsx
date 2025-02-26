import './App.css'

import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import router from './router'
import { useUserAuth } from '~/entities/store/UserStore/useUserStore'

const client = new QueryClient()

function App() {
  useUserAuth();
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
