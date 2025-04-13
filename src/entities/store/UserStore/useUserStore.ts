import { useLayoutEffect } from 'react'

import { USER_DEFAULT_STATE } from '~/shared/config/constants'
import { UserType } from '~/shared/typings/user/userTypings'
import createStore from '~/shared/utils/createStore/createStore'
import useService from '~/entities/useService'

const useUserStore = createStore<UserType>(
  (set) => ({
    id: '',
    login: '',
    email: '',
    name: '',
    surname: '',
    role: 'USER',
    organizationName: '',
    api: [],
    setUser: (values: UserType) =>
      set({
        ...values,
      }),
    clearUser: () =>
      set({
        ...USER_DEFAULT_STATE,
      }),
  }),
  {
    name: 'userStore',
    partialize: (state) => ({
      id: state.id,
      login: state.login,
      email: state.email,
      name: state.name,
      surname: state.surname,
      organizationName: state.organizationName,
    }),
  },
)

export default useUserStore
