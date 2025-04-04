import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import Plot from 'react-plotly.js'
import { Container, Alert, LinearProgress, Box, Collapse } from '@mui/material'

import useService from '~/entities/useService'
import {
  SatellitesResponseType,
  SatellitesType,
} from '~/shared/typings/radar/radar'

import { configurateLayout, configuratePlot } from './plot.config'

const RadarDisplay = () => {
  const containerRef = useRef<HTMLDivElement>(null)
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
    refetchInterval: 5000,
    staleTime: 0,
    select: (data) => data.data.satettiles,
  })

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  return (
    <Container
      ref={containerRef}
      sx={{
        width: '100%',
        padding: '20px',
        position: 'relative',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Collapse in={!!isError}>
        <Container sx={{ padding: '20px' }}>
          <Alert severity='error'>Ошибка загрузки данных спутников</Alert>
        </Container>
      </Collapse>
      <Plot
        data={configuratePlot(satellitesData as SatellitesType[])}
        layout={{
          ...configurateLayout(satellitesData as SatellitesType[]),
          autosize: true,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '600px',
        }}
        useResizeHandler
      />
      {(isLoading || isRefetching) && (
        <Box sx={{ width: '50%' }}>
          <LinearProgress color='success' />
        </Box>
      )}
    </Container>
  )
}

export default RadarDisplay
