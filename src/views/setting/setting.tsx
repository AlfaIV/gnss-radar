import {
  Paper,
  Typography,
  Stack,
  Container,
  Select,
  MenuItem,
  Button,
  TextField,
  Snackbar,
  Alert,
  SelectChangeEvent,
  Box,
} from '@mui/material'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { ChangeEvent, useState } from 'react'

import {
  getDevices,
  updateDevice,
  addDevice,
  deleteDevice,
} from '~/utils/requests/requests'
import { Device } from '~/utils/types/types'

//to do - сделать точку стояния
//to do - решить  вопрос с id

const Setting = () => {
  const [newDeviceCreation, setNewDeviceCreation] = useState(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const [successMsg, setSuccessMsg] = useState<string>('')

  const queryClient = useQueryClient()

  const closeMsgTimer = setTimeout(() => {
    setSuccessMsg('')
  }, 5000)

  const [currentDevice, setCurrentDevice] = useState<Device | null>({
    id: BigInt(0),
    backendID: '',
    name: '',
    token: '',
    description: '',
    coordinates: {
      x: '',
      y: '',
      z: '',
    },
  })

  const devices = useQuery('getDevices', getDevices, {
    onError: () => {
      setErrMsg('Ошибка получения устройств')
    },
  })

  const changeDeviceMutation = useMutation('updateDevice', updateDevice, {
    onSuccess: () => {
      queryClient.invalidateQueries('getDevices')
      setErrMsg('')
      setSuccessMsg('Устройство обновлено')
      closeMsgTimer
    },
    onError: () => {
      setErrMsg('Ошибка обновления устройства')
    },
  })

  const createDeviceMutation = useMutation('createDeviceMutation', addDevice, {
    onSuccess: () => {
      queryClient.invalidateQueries('getDevices')
      createDeviceMutation.isSuccess &&
        setCurrentDevice(createDeviceMutation.data || null)
      setNewDeviceCreation(false)
      setErrMsg('')
      setSuccessMsg('Устройство создано')
      closeMsgTimer
    },
    onError: () => {
      setErrMsg('Ошибка создания устройства')
    },
  })

  const deleteDeviceMutation = useMutation('deleteDevice', deleteDevice, {
    onSuccess: () => {
      queryClient.invalidateQueries('getDevices')
      setErrMsg('')
      setSuccessMsg('Устройство удалено')
      closeMsgTimer
    },
  })

  function handleChange(event: SelectChangeEvent<number>) {
    setNewDeviceCreation(false)
    setCurrentDevice(
      devices?.data?.find(
        (device: Device) => Number(device?.id) === Number(event?.target?.value),
      ) || null,
    )
  }

  function handleCreateDevice() {
    const newDefaultDevice: Device = {
      id: BigInt(0),
      name: 'Новое устройство',
      description: 'Описание нового устройства',
      token: 'Токен сгенерируется автоматически',
      coordinates: {
        x: '0',
        y: '0',
        z: '0',
      },
    }
    setCurrentDevice(newDefaultDevice)
    setNewDeviceCreation(true)
  }

  if (devices?.isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant='h2'>Идёт загрузка...</Typography>
      </Box>
    )
  }

  if (devices?.error) {
    return <div>error</div>
  }

  // console.log("currentDevice", currentDevice);
  // console.log("devices.data", devices.data);

  return (
    <Container maxWidth='lg'>
      <Paper
        elevation={0}
        sx={{ mt: 5, md: 5, padding: '20px 10px', minHeight: '90vh' }}
      >
        <Typography variant='h3' color='initial'>
          Настройки аппаратных комплексов
        </Typography>
        <Stack direction='row' spacing={2} m={3}>
          <Select
            value={Number(currentDevice?.id)}
            onChange={handleChange}
            autoWidth
            sx={{ minWidth: 300 }}
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
          <Button
            onClick={() => {
              handleCreateDevice()
            }}
            variant='outlined'
          >
            Добавить устройство
          </Button>
        </Stack>
        <Box sx={{ padding: '20px' }}>
          <Stack spacing={4}>
            <Typography variant='body1'>
              {newDeviceCreation
                ? 'Внесите изменения в параметры устройства и нажмите "Сохранить"'
                : 'В данном разделе можно редактировать параметры уже ранее добавленных устройств или добавлять новые для хранения данных с них.'}
            </Typography>
            <TextField
              label='Название устройства'
              value={currentDevice?.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCurrentDevice({
                  ...currentDevice,
                  name: event.currentTarget.value,
                } as Device)
              }
              variant='outlined'
              autoComplete='off'
            />
            <TextField
              // value={`${currentDevice?.Coords.x}.${currentDevice?.Coords.y}.${currentDevice?.Coords.z}`}
              // value={currentDevice?.Coords.x}
              label='Точка стояния'
              variant='outlined'
            />
            <Stack direction='row' spacing={2}>
              <TextField
                label='Токен'
                variant='outlined'
                sx={{ width: '500px' }}
                value={currentDevice?.token}
                autoComplete='off'
              />
              <Button
                variant='contained'
                //  onClick={handleCopy}
                disabled
              >
                Скопировать
              </Button>
              <Snackbar
                // open={openSnackbar}
                autoHideDuration={3000}
                // onClose={handleCloseSnackbar}
              >
                <Alert
                  // onClose={handleCloseSnackbar}
                  severity='success'
                >
                  Токен скопирован в буфер обмена!
                </Alert>
              </Snackbar>
            </Stack>
            <TextField
              variant='outlined'
              label='Описание устройства'
              multiline
              rows={4}
              value={currentDevice?.description}
              autoFocus
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCurrentDevice({
                  ...currentDevice,
                  description: event.currentTarget.value,
                } as Device)
              }}
            />
            <TextField label='URL устройства' variant='outlined' disabled />
            {!!errMsg && <Alert severity='error'>{errMsg}</Alert>}
            {!!successMsg && <Alert severity='success'>{successMsg}</Alert>}
            <Stack direction='row' spacing={2}>
              <Button
                disabled={currentDevice === null}
                onClick={() => {
                  // console.log(currentDevice);
                  !newDeviceCreation &&
                    currentDevice &&
                    changeDeviceMutation.mutate(currentDevice)
                  newDeviceCreation &&
                    currentDevice &&
                    createDeviceMutation.mutate(currentDevice)
                  // console.log(mutation);
                }}
                variant='contained'
                sx={{ width: '150px' }}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  setCurrentDevice(
                    devices?.data?.find(
                      (device: Device) => device.id === currentDevice?.id,
                    ) || null,
                  )
                }}
                variant='outlined'
                sx={{ width: '150px' }}
              >
                Отменить
              </Button>
              <Button
                onClick={() => {
                  if (currentDevice) {
                    deleteDeviceMutation.mutate(currentDevice)
                  }
                }}
                variant='outlined'
                color='error'
                sx={{ width: '150px' }}
              >
                Удалить
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  )
}

export default Setting

// const mutation = useMutation("getGrqlData", getGrqlData);

// const [token, setToken] = useState("ВашТокен12345");
// const [openSnackbar, setOpenSnackbar] = useState(false);

// const handleCopy = () => {
//   navigator.clipboard
//     .writeText(token)
//     .then(() => {
//       setOpenSnackbar(true);
//     })
//     .catch((err) => {
//       console.error("Ошибка копирования: ", err);
//     });
// };

// const handleCloseSnackbar = () => {
//   setOpenSnackbar(false);
// };
