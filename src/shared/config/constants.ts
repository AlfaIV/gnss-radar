export const API_URLS: Record<string, string> = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  ME: '/me',
  LOGOUT: '/logout',
  RESOLVE_SIGN_UP: '/resolveSignUp',
  GIVE_PERMISSIONS: '/givePermissions',
  GET_USER_LIST: '/getUserList',
  GET_SIGNUP_REQUESTS: '/getSignUpRequests'
}

export const ROUTES: Record<string, string> = {
  SIGNUP: '/signup',
}

export const USER_DEFAULT_STATE = {
  id: '',
  login: '',
  email: '',
  name: '',
  surname: '',
  role: '',
  organizationName: '',
  api: [],
}

export const ROLE_USER = {
    label: 'Инженер',
    value:'USER'
}

export const ROLE_SUPERVISOR = {
    label: 'Руководитель',
    value:'SUPERVISOR'
}

export const ROLE_ADMIN = {
    label: 'Администратор',
    value: 'ADMIN'
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
