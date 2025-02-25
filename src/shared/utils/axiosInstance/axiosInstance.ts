import axios, { AxiosError, AxiosInstance } from 'axios'

type ErrorHandler = (status: number) => Promise<void>

let globalErrorHandler: ErrorHandler | null = null

export const setGlobalErrorHandler = (handler: ErrorHandler) => {
  globalErrorHandler = handler
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v1/`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    credentials: 'include',
    'Content-Type': 'application/json',
  },
})

export const axiosInstanceMultipart: AxiosInstance = axios.create({
  baseURL: `${window.location.origin}/api/v1/`,
  withCredentials: true,
  timeout: 10000,
  headers: {
    credentials: 'include',
    'Content-Type': 'multipart/form-data',
  },
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status

    if (status && globalErrorHandler) {
      await globalErrorHandler(status)
    }

    return Promise.reject(error)
  },
)

export default axiosInstance

// Пример навешивания обработчика в компоненте
/*
setGlobalErrorHandler(async (status) => {
  if ([401, 500].includes(status)) {
    await authService.logout();
    window.location.href = "/login";
  }
}*/
