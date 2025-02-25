import { useCallback, useMemo } from "react"
import { LoginRequestType, UserInfoResponseType, SignUpRequestType } from "~/shared/typings/auth/authTypings"
import axiosInstance from "~/shared/utils/axiosInstance/axiosInstance"

const useAuthService = () => {
    const login = useCallback(async (values: LoginRequestType) : Promise<UserInfoResponseType> => {
      const response: UserInfoResponseType = await axiosInstance.post(API_URLS.LOGIN, values)
  
      return response
    }, [])

    const signUp = useCallback(async (values: SignUpRequestType) : Promise<void> => {
        await axiosInstance.post(API_URLS.SIGNUP, values)
      }, [])

    const logout = useCallback(async () : Promise<void> => {
    await axiosInstance.delete(API_URLS.LOGOUT)
    }, [])
  
    const me = useCallback(async () : Promise<UserInfoResponseType> => {
        const response: UserInfoResponseType = await axiosInstance.get(API_URLS.ME)
  
        return response
    }, [])

    return useMemo(
      () => ({
        login,
        signUp,
        logout,
        me
      }),
      [
        login,
        signUp,
        logout,
        me
      ]
    )
  }
  
  export default useAuthService
  