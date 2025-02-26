export const API_URLS: Record<string, string> = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  ME: '/me',
  LOGOUT: '/logout',
  RESOLVE_SIGN_UP: '/resolveSignUp',
  GIVE_PERMISSIONS: '/givePermissions',
}

export const ROUTES: Record<string, string> = {
    SIGNUP: '/signup'
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
