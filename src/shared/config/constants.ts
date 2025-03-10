import { UserRoleType } from '../typings/user/userTypings'

export const API_URLS: Record<string, Record<string, string>> = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
  },
  USER: {
    RESOLVE_SIGN_UP: '/user/resolveSignUp',
    GIVE_PERMISSIONS: '/user/givePermissions',
    GET_USER_LIST: '/user/getListUsers',
    GET_SIGNUP_REQUESTS: '/user/getSignUpRequestions',
  },
  MEASUREMENTS: {
    GET_EPHEMERIS: '/measurements/getEphemeris',
    UPLOAD_EPHEMERIS: '/measurements/uploadEphemeris',
  },
  SATELLITES: {
    GET_SATELLITES: '/satellites/getSatellites',
  },
}

export const ROUTES: Record<string, string> = {
  SIGNUP: '/signup',
  LOGIN: '/login',
}

export const USER_DEFAULT_STATE = {
  id: '',
  login: '',
  email: '',
  name: '',
  surname: '',
  role: 'USER' as UserRoleType,
  organizationName: '',
  api: [],
}

export const ROLE_USER = {
  label: 'Инженер',
  value: 'USER',
}

export const ROLE_SUPERVISOR = {
  label: 'Руководитель',
  value: 'SUPERVISOR',
}

export const ROLE_ADMIN = {
  label: 'Администратор',
  value: 'ADMIN',
}

export const ROLES = [ROLE_USER, ROLE_SUPERVISOR, ROLE_ADMIN]

export const STATUS_PENDING = {
  label: 'Ожидается решение',
  value: 'PENDING',
}

export const STATUS_APPROVED = {
  label: 'Согласовано',
  value: 'APPROVED',
}

export const STATUS_DECLINED = {
  label: 'Отклонено',
  value: 'DECLINED',
}

export const USER_STATUS_ARRAY = [
  STATUS_PENDING,
  STATUS_APPROVED,
  STATUS_DECLINED,
]

export const ALLOWED_FILE_TYPES = ['.sp3', '.eph', '.txt', '.bin']

export const MAX_FILE_SIZE = 100
