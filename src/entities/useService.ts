import { useMemo } from 'react'

import useAuthService from './auth/authService'
import useUserService from './user/userService'
import useEphemerisService from './ephemeris/ephemerisService'
import useSatellitesService from './satellites/satellitesService'

const useService = () => {
  const authService = useAuthService()
  const userService = useUserService()
  const ephemerisService = useEphemerisService()
  const satellitesService = useSatellitesService()

  return useMemo(
    () => ({
      ...authService,
      ...userService,
      ...ephemerisService,
      ...satellitesService,
    }),
    [authService, userService, ephemerisService, satellitesService],
  )
}

export default useService
