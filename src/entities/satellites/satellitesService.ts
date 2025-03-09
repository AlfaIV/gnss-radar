import { useCallback, useMemo } from 'react'

import axiosInstance from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'
import { SatellitesResponseType } from '~/shared/typings/radar/radar'

const useSatellitesService = () => {
  const getSatellites = useCallback(
    async (signal?: AbortSignal): Promise<SatellitesResponseType> => {
      const response: SatellitesResponseType = await axiosInstance.get(
        API_URLS.SATELLITES.GET_SATELLITES,
        {
          signal,
        },
      )

      return response
    },
    [],
  )

  return useMemo(
    () => ({
      getSatellites,
    }),
    [getSatellites],
  )
}

export default useSatellitesService
