import { USER_DEFAULT_STATE } from '~/shared/config/constants'
import { UserType } from '~/shared/typings/user/userTypings'
import createStore from '~/shared/utils/createStore/createStore'
import useService from '~/entities/useService'
import { User } from '~/utils/types/types'
import { useEffect } from 'react'

const useUserStore = createStore<UserType>(
  (set, get) => ({
    id: '',
    login: '',
    email: '',
    name: '',
    surname: '',
    role: '',
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
    verifyAuth: async (service: ReturnType<typeof useService>) => {
          try {
            const userData = await service.me()
            get().setUser(userData as UserType)
          } catch (error) {
            get().clearUser()
          }        
    }
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

export const useUserAuth = () => {
  const service = useService()
  const verifyAuth = useUserStore(state => state.verifyAuth)

  useEffect(() => {
    verifyAuth(service)
  }, [verifyAuth, service])
}

export default useUserStore;
