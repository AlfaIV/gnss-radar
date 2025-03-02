import useService from '~/entities/useService'

export type ResolveSignUpRequest = {
  login: string
  resolution: string
}

export type GivePermissionsRequest = {
  login: string
  newRole: string
}

export interface UserType {
  id: string
  login: string
  role: string
  email: string | null
  name: string
  surname: string
  organizationName: string
  api: string[]
  setUser: (values: UserType) => void
  clearUser: () => void
  verifyAuth: (service: ReturnType<typeof useService>) => void
}
