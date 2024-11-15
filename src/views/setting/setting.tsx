import {
  Paper,
  Typography,
  Stack,
  Container,
  Select,
  MenuItem,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
  SelectChangeEvent,
} from "@mui/material";

import { useQuery, useMutation, useQueryClient } from "react-query";
import grqlFetch from "@utils/grql";
import { ChangeEvent, useState, ReactNode, useEffect } from "react";

//to do - сделать точку стояния
//to do - решить  вопрос с id

const Setting = () => {
  const queryClient = useQueryClient();

  interface Device {
    id: string;
    name: string;
    token: string;
    description: string;
    coordinates: {
      x: string;
      y: string;
      z: string;
    };
  }

  interface MutationError {
    message: string;
    // Вы можете добавить другие поля, если они есть
  }

  async function updateGrqlDevice(updateDevices: Device) {
    const updateDeviceRequest = `mutation updateDevice {
      gnss {
        updateDevice(
          input: {Id: "${updateDevices.id}", Name: "${updateDevices.name}", Token: "${updateDevices.token}", Description: "${updateDevices.description}", Coords: {x: "${updateDevices.coordinates.x}", y: "${updateDevices.coordinates.y}", z: "${updateDevices?.coordinates.z}"}}
        ){
          device {
            id
            name
            token
            description
            Coords{
              x
              y
              z
            }
          }
        }
      }
    }`;
    // console.log(updateDevice);
    const responce: any = await grqlFetch(updateDeviceRequest);
    return responce?.data?.gnss?.updateDevice;
  }

  async function getGrqlDevices() {
    const getDevicesRequest = `query listDevice{
      listDevice(filter:{}){
        items{
          id
          name
          token
          description
          Coords{
            x
            y
            z
          }
        }
      }
    }`;
    const responce: any = await grqlFetch(getDevicesRequest);
    // !dataMutated ? setCurrentDevice(responce?.data?.listDevice?.items[0]) : setDataMutated(false);
    setCurrentDevice(responce?.data?.listDevice?.items[0]);
    return responce?.data?.listDevice?.items;
  }

  async function addDevice() {
    const addDeviceRequest = `mutation addDevice {
      gnss {
        createDevice(
          input: {Name: "test", Token: "test", Description: "test", Coords: {x: "test", y: "test", z: "test"}}
        ){
          device {
            id
            name
            token
            description
            Coords{
              x
              y
              z
            }
          }
        }
      }
    }`;
    data?.push({
      id: "test",
      name: "test",
      token: "test",
      description: "test",
      coordinates: { x: "test", y: "test", z: "test" },
    });
    setCurrentDevice(data?.[data?.length - 1]);
    const responce: any = await grqlFetch(addDeviceRequest);
    return responce?.data?.listDevice?.items;
  }

  const { data, error, isLoading, refetch } = useQuery(
    "getGrqlData",
    getGrqlDevices
  );
  const changeDeviceMutation = useMutation<string, MutationError, Device>(
    "updateGrqlDevice",
    updateGrqlDevice,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getGrqlData");
        // setDataMutated(true)
      },
    }
  );

  const createDeviceMutation = useMutation<string, any, Device>(
    "createGrqlDevice",
    addDevice,
    {}
  );

  const [currentDevice, setCurrentDevice] = useState<Device>(data?.[0]);

  function handleChange(event: SelectChangeEvent<number>, child: ReactNode) {
    setCurrentDevice(
      data?.find((device: Device) => device.id === event?.target?.value)
    );
  }

  // useEffect(() => {
  //   setCurrentDevice(responce?.data?.listDevice?.items[0]);
  // }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (!data && !currentDevice) {
    return <div>no data</div>;
  }

  // console.log(mutation)
  // console.log(createDeviceMutation.isError, createDeviceMutation?.data?.data);

  return (
    <Container maxWidth="lg">
      <Paper
        elevation={0}
        sx={{ mt: 5, md: 5, padding: "20px 10px", minHeight: "90vh" }}
      >
        <Typography variant="h3" color="initial">
          Настройки аппаратных комплексов
        </Typography>
        <Stack direction="row" spacing={2} m={3}>
          <Select
            value={currentDevice.id}
            onChange={handleChange}
            autoWidth={true}
            sx={{ minWidth: 300 }}
          >
            {data?.map((device: Device) => (
              <MenuItem
                sx={{ minWidth: 300 }}
                key={device.id}
                value={device.id}
              >
                {device.name}
              </MenuItem>
            ))}
          </Select>
          <Button onClick={() => {createDeviceMutation.mutate()}} variant="outlined">
            Добавить устройство
          </Button>
        </Stack>
        <Box sx={{ padding: "20px" }}>
          <Stack spacing={4}>
            <Typography variant="body1">
              В данном разделе можно редактировать параметры уже ранее
              добавленных устройств или добавлять новые для хранения данных с
              них.
            </Typography>
            <TextField
              label="Название устройства"
              value={currentDevice?.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCurrentDevice({
                  ...currentDevice,
                  name: event.currentTarget.value,
                })
              }
              variant="outlined"
              autoComplete="off"
            />
            <TextField
              // value={`${currentDevice?.Coords.x}.${currentDevice?.Coords.y}.${currentDevice?.Coords.z}`}
              // value={currentDevice?.Coords.x}
              label="Точка стояния"
              variant="outlined"
            />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Токен"
                variant="outlined"
                sx={{ width: "500px" }}
                value={currentDevice?.token}
                autoComplete="off"
              />
              <Button
                variant="contained"
                //  onClick={handleCopy}
                disabled={true}
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
                  severity="success"
                >
                  Токен скопирован в буфер обмена!
                </Alert>
              </Snackbar>
            </Stack>
            <TextField
              variant="outlined"
              label="Описание устройства"
              multiline
              rows={4}
              value={currentDevice?.description}
              autoFocus={true}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setCurrentDevice({
                  ...currentDevice,
                  description: event.currentTarget.value,
                });
              }}
            />
            {changeDeviceMutation.isSuccess && changeDeviceMutation.data && (
              <Alert severity="success">Изменения сохранены</Alert>
            )}
            {!changeDeviceMutation.isIdle && (changeDeviceMutation.isError || changeDeviceMutation?.data === undefined) ? (
              <Alert severity="error">
                {changeDeviceMutation.error?.message || "Ошибка"}
              </Alert>
            ) : null}
            {!createDeviceMutation.isIdle && (createDeviceMutation.isError || createDeviceMutation?.data === undefined) ? (
              <Alert severity="error">
                {createDeviceMutation.error?.message  || "Ошибка создания нового устройства"}
              </Alert>
            ) : null}
            {createDeviceMutation.isSuccess && createDeviceMutation.data && (
              <Alert severity="success">Новое устройство добавлено. Измените параметры в соответствующих полях и нажмите кнопку сохранить</Alert>
            )}
            <Stack direction={"row"} spacing={2}>
              <Button
                onClick={() => {
                  // console.log(currentDevice);
                  changeDeviceMutation.mutate(currentDevice);
                  // console.log(mutation);
                }}
                variant="contained"
                sx={{ width: "150px" }}
              >
                Сохранить
              </Button>
              <Button
                onClick={() => {
                  setCurrentDevice(
                    data?.find(
                      (device: Device) => device.id === currentDevice?.id
                    )
                  );
                }}
                variant="outlined"
                sx={{ width: "150px" }}
              >
                Отменить
              </Button>
              <Button variant="outlined" color="error" sx={{ width: "150px" }}>
                Удалить
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Setting;

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
