import { useMemo } from 'react'

import useAuthService from './auth/authService'
import useUserService from './user/userService';

const useService = () => {

  const authService = useAuthService();
  const userService = useUserService();

  return useMemo(
    () => ({
      ...authService,
      ...userService
    }),
    [authService, userService]
  )
}

export default useService
