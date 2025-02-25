import { useMemo } from 'react'

import useAuthService from './auth/authService'

const useService = () => {

  const authService = useAuthService()

  return useMemo(
    () => ({
      ...authService
    }),
    [authService]
  )
}

export default useService
