import { useCallback, useMemo } from 'react'

import axiosInstance, {
  axiosInstanceMultipart,
} from '~/shared/utils/axiosInstance/axiosInstance'
import { API_URLS } from '~/shared/config/constants'
import { PaginatedQueryType } from '~/shared/typings/common/common'
import { EphemerisResponseType } from '~/shared/typings/ephemeris/ephemeris'

const useEphemerisService = () => {
  const getEphemeris = useCallback(
    async (
      values: PaginatedQueryType,
      signal?: AbortSignal,
    ): Promise<EphemerisResponseType> => {
      const response: EphemerisResponseType = await axiosInstance.get(
        API_URLS.MEASUREMENTS.GET_EPHEMERIS,
        {
          signal,
          params: {
            ...values,
          },
        },
      )

      return response

      //   return {data: {
      //     total: 50,
      //     page: 1,
      //     ephemeris: [{
      //         name: `${values.page}xx`,
      //         datetime: '2020-11-12T13:19:33+03:00'
      //     },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   },{
      //       name: `${values.page}xx`,
      //       datetime: '2020-11-12T13:19:33+03:00'
      //   }]
      //   }}
    },
    [],
  )

  const uploadEphemeris = useCallback(
    async (file: File, signal?: AbortSignal): Promise<void> => {
      await axiosInstanceMultipart.post(
        API_URLS.MEASUREMENTS.UPLOAD_EPHEMERIS,
        {
          file,
        },
        { signal },
      )
    },
    [],
  )

  return useMemo(
    () => ({
      getEphemeris,
      uploadEphemeris,
    }),
    [getEphemeris, uploadEphemeris],
  )
}

export default useEphemerisService
