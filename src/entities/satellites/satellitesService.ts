import { useCallback, useMemo } from 'react'

import axiosInstance from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'
import { SatellitesResponseType } from '~/shared/typings/radar/radar'

const useSatellitesService = () => {
  const getSatellites = useCallback(
    async (signal?: AbortSignal): Promise<any> => {
      const response: SatellitesResponseType = await axiosInstance.get(
        API_URLS.SATELLITES.GET_SATELLITES,
        {
          signal,
        },
      )

      return response

        // return {data: {satellites: [{
        //   name: 'Спутник 1',
        //   azimuth: 51.4,
        //   elevation: 45,
        //   range: 1000,
        //   group: 'Группа 1'
        // },
        // {
        //   name: 'Спутник 2',
        //   azimuth: 57.12,
        //   elevation: 30,
        //   range: 1200,
        //   group: 'Группа 1'
        // },
        // {
        //   name: 'Спутник 3',
        //   azimuth: 60,
        //   elevation: 67.5,
        //   range: 1500,
        //   group: 'Группа 2'
        // }]}}
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
