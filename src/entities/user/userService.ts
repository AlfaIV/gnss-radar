import { useCallback, useMemo } from 'react'

import {
  GivePermissionsRequest,
  ResolveSignUpRequest,
} from '~/shared/typings/user/userTypings'
import axiosInstance from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'

const useUserService = () => {
  const resolveSignUp = useCallback(
    async (values: ResolveSignUpRequest): Promise<void> => {
      await axiosInstance.patch(API_URLS.RESOLVE_SIGN_UP, values)
    },
    [],
  )

  const givePermissions = useCallback(
    async (values: GivePermissionsRequest): Promise<void> => {
      await axiosInstance.patch(API_URLS.GIVE_PERMISSIONS, values)
    },
    [],
  )

  return useMemo(
    () => ({
      resolveSignUp,
      givePermissions,
    }),
    [resolveSignUp, givePermissions],
  )
}

export default useUserService
