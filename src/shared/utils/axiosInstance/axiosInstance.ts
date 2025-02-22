import axios, { AxiosInstance } from 'axios'

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

export default axiosInstance
