import './App.css'

import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  QueryClient as LegacyQueryClient,
  QueryClientProvider as LegacyQueryClientProvider,
} from 'react-query'

import { useUserAuth } from '~/entities/store/UserStore/useUserStore'

import router from './router'

const client = new QueryClient()
const legacyClient = new LegacyQueryClient()

function App() {
  useUserAuth()
  return (
    <LegacyQueryClientProvider client={legacyClient}>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </LegacyQueryClientProvider>
  )
}

export default App
