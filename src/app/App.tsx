import './App.css'

import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useUserAuth } from '~/entities/store/UserStore/useUserStore'

import router from './router'

const client = new QueryClient()

function App() {
  useUserAuth()
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
