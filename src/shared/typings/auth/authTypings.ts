export type UserInfoResponseType = {
  id: string
  login: string
  role: string
  email: string
  name: string
  surname: string
  organizationName: string
  api: string[]
}

export type LoginRequestType = {
  login: string
  password: string
}

export type SignUpRequestType = {
  login: string
  email: string
  name: string
  surname: string
  organizationName: string
}

export type LoginFormType = {
  login: string | null
  password: string | null
}
