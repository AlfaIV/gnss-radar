import Plot from 'react-plotly.js'

import { FC } from 'react'
import {
  Button,
  Typography,
  Stack,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useQuery, useQueryClient } from 'react-query'
import { useState, ReactNode } from 'react'
import { Data } from 'plotly.js'

import {
  getDevices,
  getSatellites,
  getSatellitesFromDevice,
  getSatellitesCoordinate,
} from '~/utils/requests/requests'
import { Device, Satellite } from '~/utils/types/types'
import TableSatellite from '~/features/table/table'

import plotConfig from './plot.config'

import style from './radar.module.scss'

const Radar: FC = () => {
  const queryClient = useQueryClient()
  const [errMsg, setErrMsg] = useState<string>('')

  // const [currentDevice, setCurrentDevice] = useState<Device | null>({
  //   id: BigInt(0),
  //   backendID: "",
  //   name: "",
  //   token: "",
  //   description: "",
  //   coordinates: {
  //     x: "",
  //     y: "",
  //     z: "",
  //   },
  // });

  const [currentDevice, setCurrentDevice] = useState<Device | null>(null)

  const devices = useQuery('getDevices', getDevices, {
    onError: () => {
      setErrMsg('Ошибка получения устройств')
    },
  })

  const satellitesList = useQuery('getSatellites', getSatellites, {
    onError: () => {
      setErrMsg('Ошибка получения спутников')
    },
  })

  const satellitesFromDevice = useQuery(
    'getSatellitesFromDevice',
    () => getSatellitesFromDevice(currentDevice as Device),
    {
      enabled: currentDevice !== null,
      onError: () => {
        setErrMsg('Ошибка получения спутников')
      },
    },
  )

  const satellitesCoordinate = useQuery(
    'getSatellitesCoordinate',
    () => getSatellitesCoordinate(currentDevice as Device),
    {
      enabled: currentDevice !== null,
      onSuccess: (data) => {
        console.log('спутники: ', data)
        const plotData: {
          type: string
          r: (number | undefined)[]
          theta: (number | undefined)[]
          fill: string
          name: string
          mode: string
          marker: {
            size: number
            color: string
          }
        }[] = [
          {
            type: 'scatterpolar',
            r: [],
            theta: [],
            fill: 'none',
            name: 'GPS',
            mode: 'markers',
            marker: {
              size: 10,
              color: 'blue',
            },
          },
          {
            type: 'scatterpolar',
            r: [],
            theta: [],
            fill: 'none',
            name: 'Glonass',
            mode: 'markers',
            marker: {
              size: 10,
              color: 'red',
            },
          },
        ]
        data.forEach((satellite: Satellite) => {
          if (satellite) {
            plotData[0].r.push(
              satellite.range !== undefined ? satellite.range / 500 : 0,
            )
            plotData[0].theta.push(
              satellite.azimuth !== undefined ? satellite.azimuth : 0,
            )
            // Если нужно, добавьте данные для Glonass
            // plotData[1].r.push(satellite.range);
            // plotData[1].theta.push(satellite.elevation);
          }
        })
        console.log(plotData)
        plotConfig.data = plotData as Data[]
      },
      onError: () => {
        setErrMsg('Ошибка получения спутников')
      },
    },
  )

  function handleChange(event: SelectChangeEvent<number>, child: ReactNode) {
    setCurrentDevice(
      devices?.data?.find(
        (device: Device) => Number(device?.id) === Number(event?.target?.value),
      ) || null,
    )
    queryClient.invalidateQueries('getSatellitesFromDevice')
    queryClient.invalidateQueries('getSatellitesCoordinate')
  }

  return (
    <div className={style.radar}>
      <Box sx={{ minHeight: '100vh' }} className={style.radar__table}>
        <Stack spacing={2} direction='row' alignItems='center'>
          <Typography>Выберите устройство</Typography>
          <Select
            value={Number(currentDevice?.id)}
            onChange={handleChange}
            autoWidth
            sx={{ maxWidth: 300, minWidth: 300, backgroundColor: 'white' }}
          >
            {devices?.data?.length !== 0 &&
              devices?.data?.map((device: Device) => (
                <MenuItem
                  sx={{ minWidth: 300 }}
                  key={Number(device?.id)}
                  value={Number(device?.id)}
                >
                  {device.name}
                </MenuItem>
              ))}
          </Select>
        </Stack>
        <Typography variant='h5'>Описание устройства</Typography>
        <Typography variant='body1'>{currentDevice?.description}</Typography>
        <Stack
          spacing={2}
          direction='row'
          alignItems='center'
          alignContent='center'
        >
          <Typography component='p' variant='body1'>
            Статус калибровки:
          </Typography>
          {/* <Alert
            icon={<CheckIcon fontSize="inherit" />}
            sx={{ maxWidth: "200px" }}
            severity="success"
          >
            Калиброван
          </Alert> */}
          <Alert
            icon={<CheckIcon fontSize='inherit' />}
            sx={{ maxWidth: '200px' }}
            severity='warning'
          >
            Нет данных
          </Alert>
          {/* <Alert icon={<CheckIcon fontSize="inherit" />} sx={{ maxWidth: "200px"}} severity="error">Калибровка отсутствует</Alert>  */}
          <Button disabled variant='contained'>
            Провести калибровку
          </Button>
        </Stack>
        <TableContainer>
          <Table sx={{ border: '2px solid white', borderRadius: '15px' }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TableRow sx={{ mb: 2 }}>
                    Выполняется задание: {'Нет данных'}{' '}
                  </TableRow>
                  <TableRow sx={{ mb: 2 }}>
                    <Button variant='contained'>Прервать задание</Button>
                  </TableRow>
                </TableCell>
                <TableCell>
                  <TableRow sx={{ mb: 10 }}>Спутник: Нет данных </TableRow>
                  <TableRow sx={{ mb: 10 }}>
                    Начало записи: {'Нет данных'}{' '}
                  </TableRow>
                  <TableRow sx={{ mb: 10 }}>
                    Окончание записи: Нет данных
                  </TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {!!currentDevice && (
          <TableSatellite satellites={satellitesCoordinate.data || []} />
        )}
      </Box>

      <Box sx={{ m: 0, p: 0 }} className={style.radar__plot}>
        {!!currentDevice && (
          <Plot data={plotConfig.data} layout={plotConfig.layout} />
        )}
      </Box>
    </div>
  )
}
export default Radar
