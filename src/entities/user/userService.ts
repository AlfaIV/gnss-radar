import { useCallback, useMemo } from 'react'

import {
  GivePermissionsRequest,
  ResolveSignUpRequest,
  SignUpRequestionType,
  GetUserResponseType,
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

  const deleteUser = useCallback(
    async (id: string): Promise<void> => {
      await axiosInstance.patch(API_URLS.USER.DELETE_USER, {id})
    },
    [],
  )

  const restoreUser = useCallback(
    async (id: string): Promise<void> => {
      await axiosInstance.patch(API_URLS.USER.RESTORE_USER, {id})
    },
    [],
  )

  const getUserList = useCallback(
    async (
      values: PaginatedQueryType,
      signal?: AbortSignal,
    ): Promise<GetUserResponseType> => {
      const response: GetUserResponseType = await axiosInstance.get(
        API_URLS.USER.GET_USER_LIST,
        {
          signal,
          params: {
            ...values,
          },
        },
      )

      return response

      // return {data: {
      //   users: [
      //     {name: 'Кабан',
      //       surname: 'Кабанов',
      //       email: 'hog@mail.ru',
      //       organizationName: 'OOO Kabanych',
      //       id: '1',
      //       login: 'UltraHog',
      //       role: 'SUPERVISOR'
      //     },
          
      //   ]
      // }}
    },
    [],
  )

  const getDeletedUserList = useCallback(
    async (
      values: PaginatedQueryType,
      signal?: AbortSignal,
    ): Promise<GetUserResponseType> => {
      const response: GetUserResponseType = await axiosInstance.get(
        API_URLS.USER.GET_DELETED_USER_LIST,
        {
          signal,
          params: {
            ...values,
          },
        },
      )

      return response

      // return {data: {
      //   users: [
      //     {name: 'Кабан',
      //       surname: 'Кабанов',
      //       email: 'hog@mail.ru',
      //       organizationName: 'OOO Kabanych',
      //       id: '1',
      //       login: 'UltraHog',
      //       role: 'SUPERVISOR'
      //     },
          
      //   ]
      // }}
    },
    [],
  )

  const getSignUpRequestList = useCallback(
    async (
      values: PaginatedQueryType,
      signal?: AbortSignal,
    ): Promise<SignUpRequestionType> => {
      const response: SignUpRequestionType = await axiosInstance.get(
        API_URLS.USER.GET_SIGNUP_REQUESTS,
        {
          signal,
          params: {
            ...values,
          },
        },
      )

      return response

      // return {data: {
      //   users: [{
      //     login: 'hog',
      //     email: 'hog@mail.ru',
      //     name: 'Кабан',
      //     surname: 'Кабанов',
      //     organizationName: 'OOO Hogs',
      //     role: 'USER'
      //   }]
      // }}
    },
    [],
  )

  return useMemo(
    () => ({
      getUserList,
      getSignUpRequestList,
      resolveSignUp,
      givePermissions,
      deleteUser,
      getDeletedUserList,
      restoreUser
    }),
    [resolveSignUp, givePermissions, getUserList, getSignUpRequestList, deleteUser, getDeletedUserList, restoreUser],
  )
}

export default useUserService
