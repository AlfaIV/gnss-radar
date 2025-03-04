import { useCallback, useMemo } from 'react'

import {
  GivePermissionsRequest,
  ResolveSignUpRequest,
  SignUpRequestionType,
  UserRoleResponseType,
} from '~/shared/typings/user/userTypings'
import axiosInstance from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'
import { PaginatedQueryType } from '~/shared/typings/common/common'

const useUserService = () => {
  const resolveSignUp = useCallback(
    async (values: ResolveSignUpRequest): Promise<void> => {
      await axiosInstance.patch(API_URLS.USER.RESOLVE_SIGN_UP, values)
    },
    [],
  )

  const givePermissions = useCallback(
    async (values: GivePermissionsRequest): Promise<void> => {
      await axiosInstance.patch(API_URLS.USER.GIVE_PERMISSIONS, values)
    },
    [],
  )

  const getUserList = useCallback(
    async (values: PaginatedQueryType, signal?: AbortSignal): Promise<UserRoleResponseType> => {
      const response: UserRoleResponseType = await axiosInstance.get(API_URLS.USER.GET_USER_LIST, {
        signal,
        params: {
          ...values
        }
      })

      return response;
    },
    [],
  )

  const getSignUpRequestList = useCallback(
    async (values: PaginatedQueryType, signal?: AbortSignal): Promise<SignUpRequestionType> => {
      const response: SignUpRequestionType = await axiosInstance.get(API_URLS.USER.GET_SIGNUP_REQUESTS, {
        signal,
        params: {
          ...values
        }
      })

      return response;
    },
    [],
  )

  return useMemo(
    () => ({
      getUserList,
      getSignUpRequestList,
      resolveSignUp,
      givePermissions,
    }),
    [resolveSignUp, givePermissions, getUserList,getSignUpRequestList],
  )
}

export default useUserService
