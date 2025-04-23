import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import Plot from 'react-plotly.js'
import { 
  Container, 
  Alert, 
  LinearProgress, 
  Box, 
  Collapse,
  IconButton,
  ButtonGroup
} from '@mui/material'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RestoreIcon from '@mui/icons-material/Restore'

import useService from '~/entities/useService'
import {
  SatellitesResponseType,
  SatellitesType,
} from '~/shared/typings/radar/radar'

import {
  configurateLayoutSpherical,
  configuratePlotSpherical,
} from './plot.config'
import { useGroupContext } from '../context/GroupContext'

const RadarDisplaySphere = () => {
  const { getSatellites } = useService()
  const abortControllerRef = useRef<AbortController>()
  const { selectedGroups, setAvailableGroups } = useGroupContext()
  const [currentRange, setCurrentRange] = useState<[number, number]>([90, 0])
  const [initialRange, setInitialRange] = useState<[number, number]>([90, 0])

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
    refetchInterval: 1000 * 60 * 10,
    staleTime: 0,
    select: (data) => data.data.satellites,
  })

  useEffect(() => {
    if (satellitesData?.length) {
      const newInitialRange: [number, number] = [90, 0]
      setInitialRange(newInitialRange)
      setCurrentRange(newInitialRange)
      setAvailableGroups(satellitesData.filter(s => !!s.group).map(s => s.group))
    }
  }, [satellitesData])

  const handleZoomIn = () => {
    setCurrentRange(prev => [prev[0] * 0.9, prev[1] * 1.1])
  }

  const handleZoomOut = () => {
    setCurrentRange(prev => [prev[0] * 1.1, prev[1] * 0.9])
  }

  const handleResetZoom = () => {
    setCurrentRange(initialRange)
  }

  const filteredSatellites = (satellitesData as SatellitesType[])?.filter(
    s => selectedGroups.length === 0 || selectedGroups.includes(s.group)
  )

  return (
    <Box position="relative">
      <Collapse in={!!isError}>
        <Container sx={{ padding: '20px' }}>
          <Alert severity='error'>Ошибка загрузки данных спутников</Alert>
        </Container>
      </Collapse>
      
      <Box
        position="absolute"
        top={16}
        right={16}
        zIndex={1}
        bgcolor="background.paper"
        borderRadius={1}
        boxShadow={3}
      >
        <ButtonGroup orientation="vertical">
          <IconButton 
            onClick={handleZoomIn}
            disabled={isLoading || isRefetching}
            title="Увеличить"
          >
            <ZoomInIcon />
          </IconButton>
          <IconButton 
            onClick={handleZoomOut}
            disabled={isLoading || isRefetching}
            title="Уменьшить"
          >
            <ZoomOutIcon />
          </IconButton>
          <IconButton 
            onClick={handleResetZoom}
            disabled={isLoading || isRefetching}
            title="Сбросить масштаб"
          >
            <RestoreIcon />
          </IconButton>
        </ButtonGroup>
      </Box>

      <Plot
        data={configuratePlotSpherical(filteredSatellites)}
        layout={{
          ...configurateLayoutSpherical(filteredSatellites, currentRange),
          autosize: true,
        }}
        config={{
          displayModeBar: false,
          responsive: true,
        }}
        style={{
          width: '600px',
          height: '600px',
        }}
      />
      
      {(isLoading || isRefetching) && (
        <Box sx={{ width: '50%' }}>
          <LinearProgress color='success' />
        </Box>
      )}
    </Box>
  )
}

export default RadarDisplaySphere