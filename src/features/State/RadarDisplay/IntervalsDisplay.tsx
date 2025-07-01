import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState, useMemo } from 'react'
import Plot from 'react-plotly.js'
import {
  Container,
  Alert,
  LinearProgress,
  Box,
  Collapse,
  Stack,
} from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Data, Layout } from 'plotly.js'
import { ruRU } from '@mui/x-date-pickers/locales'

import useService from '~/entities/useService'
import {
  SatellitesIntervalsResponseType,
  SatellitesIntervalsType,
} from '~/shared/typings/radar/radar'

import { useGroupContext } from '../context/GroupContext'

type RangeType = [number, number] | null

const IntervalsDisplay = () => {
  const { getSatellitesIntervals } = useService()
  const abortControllerRef = useRef<AbortController>()
  const { selectedGroups, setAvailableGroups } = useGroupContext()
  const [currentRange, setCurrentRange] = useState<RangeType>(null)
  const [initialRange, setInitialRange] = useState<RangeType>(null)

  // NEW: State for date filtering
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const {
    data: intervalsData,
    isLoading,
    isError,
    isRefetching,
  } = useQuery<
    SatellitesIntervalsResponseType,
    Error,
    SatellitesIntervalsType[]
  >({
    queryKey: [
      'satellites-intervals',
      startDate?.toISOString(),
      endDate?.toISOString(),
    ],
    queryFn: async () => {
      abortControllerRef.current?.abort()
      abortControllerRef.current = new AbortController()
      return getSatellitesIntervals(
        startDate ? dayjs(startDate).format('YYYY-MM-DDTHH:mm:ss') : '',
        endDate ? dayjs(endDate).format('YYYY-MM-DDTHH:mm:ss') : '',
        [],
        abortControllerRef.current.signal,
      )
    },
    refetchInterval: 1000 * 60 * 10,
    staleTime: Infinity,
    select: (data) => data.data.satellites,
    enabled: !!startDate && !!endDate,
  })

  useEffect(() => {
    if (intervalsData?.length) {
      let minTime = Infinity,
        maxTime = -Infinity
      intervalsData.forEach((s) => {
        s.intervals.forEach((i) => {
          const start = new Date(i.startDatetime).getTime()
          const end = new Date(i.endDatetime).getTime()
          if (start < minTime) minTime = start
          if (end > maxTime) maxTime = end
        })
      })
      const diff = maxTime - minTime
      const buffer = diff * 0.1
      const newRange: [number, number] = [minTime - buffer, maxTime + buffer]
      setInitialRange((prev) => {
        if (!prev || prev[0] !== newRange[0] || prev[1] !== newRange[1]) {
          setCurrentRange(newRange)
          return newRange
        }
        return prev
      })
      setAvailableGroups([...new Set(intervalsData.map((s) => s.group))])
    }
  }, [intervalsData, setAvailableGroups])

  const filteredSatellites = useMemo(() => {
    return (
      intervalsData?.filter(
        (s) => selectedGroups.length === 0 || selectedGroups.includes(s.group),
      ) || []
    )
  }, [intervalsData, selectedGroups])

  const handleZoomIn = () => {
    setCurrentRange((prev) => {
      if (!prev) return null
      const diff = prev[1] - prev[0],
        newDiff = diff * 0.8,
        center = prev[0] + diff / 2
      return [center - newDiff / 2, center + newDiff / 2]
    })
  }

  const handleZoomOut = () => {
    setCurrentRange((prev) => {
      if (!prev) return null
      const diff = prev[1] - prev[0],
        newDiff = diff * 1.2,
        center = prev[0] + diff / 2
      return [center - newDiff / 2, center + newDiff / 2]
    })
  }

  const handleResetZoom = () => {
    if (initialRange) setCurrentRange(initialRange)
  }

  const plotData = useMemo<Data[]>(() => {
    if (!filteredSatellites.length) return []
    const x: Date[] = [],
      y: (string | null)[] = [],
      text: string[] = [],
      colors: string[] = []
    const groupsMap: Record<string, string> = {}
    const allGroups = [...new Set(filteredSatellites.map((s) => s.group))]
    const groupColors = [
      '#FF0000',
      '#00FF00',
      '#0000FF',
      '#FFFF00',
      '#FF00FF',
      '#00FFFF',
      '#FFA500',
      '#800080',
      '#008080',
    ]
    allGroups.forEach((g, i) => {
      groupsMap[g] = groupColors[i % groupColors.length]
    })
    filteredSatellites.forEach((s) => {
      s.intervals.forEach((i) => {
        const start = new Date(i.startDatetime),
          end = new Date(i.endDatetime)
        x.push(start)
        y.push(s.name)
        text.push(`Начало: ${start.toLocaleString()}`)
        colors.push(groupsMap[s.group])
        x.push(end)
        y.push(s.name)
        text.push(`Конец: ${end.toLocaleString()}`)
        colors.push(groupsMap[s.group])
        x.push(new Date(end.getTime() + 1))
        y.push(null)
        text.push('')
        colors.push('rgba(0,0,0,0)')
      })
    })
    return [
      {
        type: 'scatter',
        mode: 'lines',
        x,
        y,
        line: { color: colors, width: 15, shape: 'linear' },
        hoverinfo: 'text',
        text,
        hovertemplate: `%{text}<br><extra></extra>`,
        showlegend: false,
        connectgaps: false,
      },
    ]
  }, [filteredSatellites])

  const layout = useMemo<Partial<Layout>>(() => {
    const uniqueSatellites = [...new Set(filteredSatellites.map((s) => s.name))]
    return {
      title: 'Временные интервалы активности спутников',
      xaxis: {
        title: 'Время',
        type: 'date',
        range: currentRange
          ? (currentRange.map((t) => new Date(t)) as [Date, Date])
          : undefined,
        tickformat: '%d.%m.%Y %H:%M',
        automargin: true,
      },
      yaxis: {
        title: 'Спутник',
        type: 'category',
        automargin: true,
        categoryorder: 'array',
        categoryarray: uniqueSatellites,
      },
      transition: { duration: 0, easing: 'cubic-in-out' },
      showlegend: false,
      margin: { t: 60, b: 80, l: 120, r: 40 },
      hovermode: 'closest',
      hoverlabel: {
        bgcolor: '#FFF',
        bordercolor: '#DDD',
        font: { family: 'Arial', size: 14 },
      },
    }
  }, [
    filteredSatellites.map((s) => s.name).join(','),
    currentRange?.[0],
    currentRange?.[1],
  ])

  return (
    <Box position='relative'>
      <Collapse in={!!isError} unmountOnExit>
        <Container sx={{ padding: '20px' }}>
          <Alert severity='error'>Ошибка загрузки данных о спутниках</Alert>
        </Container>
      </Collapse>

      <Container sx={{ mt: 2 }}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale='ru'
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Stack direction='row' spacing={2}>
            <DateTimePicker
              label='Дата начала'
              value={startDate}
              onChange={setStartDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DateTimePicker
              label='Дата окончания'
              value={endDate}
              onChange={setEndDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </Stack>
        </LocalizationProvider>
      </Container>

      <Plot
        data={plotData}
        layout={layout}
        config={{ displayModeBar: false, responsive: true, staticPlot: false }}
        style={{ height: '600px', width: '600px' }}
        useResizeHandler
      />
      {(isLoading || isRefetching) && (
        <Box sx={{ width: '100%', position: 'absolute', top: 0 }}>
          <LinearProgress color='success' />
        </Box>
      )}
    </Box>
  )
}

export default IntervalsDisplay
