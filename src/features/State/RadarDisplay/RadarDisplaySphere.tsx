import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import Plot from 'react-plotly.js'
import { Container, Alert, LinearProgress, Box, Collapse } from '@mui/material'

import useService from '~/entities/useService'
import {
  SatellitesResponseType,
  SatellitesType,
} from '~/shared/typings/radar/radar'

import { configurateLayoutSpherical, configuratePlotSpherical } from './plot.config'

const RadarDisplaySphere = () => {
  const { getSatellites } = useService()
  const abortControllerRef = useRef<AbortController>()

  const {
    data: satellitesData,
    isLoading,
    isError,
    isRefetching,
  } = useQuery<SatellitesResponseType, Error, SatellitesType[]>({
    queryKey: ['satellites'],
    queryFn: async () => {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()

      return getSatellites(abortControllerRef.current.signal)
    },
    refetchInterval: 1000*60*10,
    staleTime: 0,
    select: (data) => data.data.satellites,
  })

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return (
    <>
      <Collapse in={!!isError}>
        <Container sx={{ padding: '20px' }}>
          <Alert severity='error'>Ошибка загрузки данных спутников</Alert>
        </Container>
      </Collapse>
      <Plot
        data={configuratePlotSpherical(satellitesData as SatellitesType[])}
        layout={{
          ...configurateLayoutSpherical(satellitesData as SatellitesType[]),
          autosize: true,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: '600px',
          height: '600px'
        }}
      />
      {(isLoading || isRefetching) && (
        <Box sx={{ width: '50%' }}>
          <LinearProgress color='success' />
        </Box>
      )}
      </>
  )
}

export default RadarDisplaySphere