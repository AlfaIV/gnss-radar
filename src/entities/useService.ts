import { useMemo } from 'react'

import useAuthService from './auth/authService'
import useUserService from './user/userService'
import useEphemerisService from './ephemeris/ephemerisService'
import useSatellitesService from './satellites/satellitesService'
import useTasksService from './tasks/useTasksService'

const useService = () => {
  const authService = useAuthService()
  const userService = useUserService()
  const ephemerisService = useEphemerisService()
  const satellitesService = useSatellitesService()
  const tasksService = useTasksService();

  return useMemo(
    () => ({
      ...authService,
      ...userService,
      ...ephemerisService,
      ...satellitesService,
      ...tasksService
    }),
    [authService, userService, ephemerisService, satellitesService, tasksService],
  )
}

export default useService
