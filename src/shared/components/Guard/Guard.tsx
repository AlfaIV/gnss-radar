import { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import useUserStore from '~/entities/store/UserStore/useUserStore'
import useService from '~/entities/useService'
import { HOCProps } from '~/shared/typings/common/common'
import { RoleGuardProps } from '~/shared/typings/Layout/layout'
import { UserType } from '~/shared/typings/user/userTypings'

const AuthGuard = memo((props: HOCProps & RoleGuardProps) => {
  const { children, role = ['USER'] } = props
  const { me } = useService()

  const navigate = useNavigate()

  const [clear, setUser] = useUserStore((state: UserType) => [
    state.clearUser,
    state.setUser,
    state.id,
  ])

  useEffect(() => {
    ;(async () => {
      try {
        const response = await me()

        setUser(response.data as UserType)

        console.log(role.find((r) => r === response.data.role))

        if (!role.find((r) => r === response.data.role)) {
          navigate('/login')
        }
      } catch {
        clear()
        navigate('/login')
      }
    })()
  }, [clear, setUser])

  return <>{children}</>
})

export default AuthGuard
