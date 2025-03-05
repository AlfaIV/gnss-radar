import useService from '~/entities/useService'

export type UserStatusType = 'APPROVED' | 'DECLINED' | 'PENDING'
export type UserRoleType = 'USER' | 'SUPERVISOR' | 'ADMIN'

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
  role: UserRoleType
  email: string | null
  name: string
  surname: string
  organizationName: string
  api: string[]
  setUser: (values: UserType) => void
  clearUser: () => void
  verifyAuth: (service: ReturnType<typeof useService>) => void
}

export type SignUpRequestProps = {
  login: string
  email: string
  name: string
  surname: string
  organizationName: string
  role: string
}

export type UserRoleProps = {
    login: string
    name: string
    surname: string
    organizationName: string
    role: UserRoleType
}

export type UserRoleResponseEntityType = {
    login: string
    name: string
    surname: string
    organizationName: string
    role: UserRoleType
}

export type UserRoleResponseType = {
    data: {
      users: UserRoleResponseEntityType[]
    }
}

export type SignUpRequestionEntityType = {
    login: string
    name: string
    surname: string
    email: string
    organizationName: string
    role: string
}

export type SignUpRequestionType = {
    data: {users: SignUpRequestionEntityType[]}
}