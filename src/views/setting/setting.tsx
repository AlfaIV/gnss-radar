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
import { ChangeEvent, useState, ReactNode, useEffect } from "react";
import { getDevices, updateDevice, addDevice } from "@utils/requests/requests";
import { Device } from "@utils/types/types";

//to do - сделать точку стояния
//to do - решить  вопрос с id

const Setting = () => {
  const queryClient = useQueryClient();

  // interface Device {
  //   id: number;
  //   name: string;
  //   token: string;
  //   description: string;
  //   Coords: {
  //     x: string;
  //     y: string;
  //     z: string;
  //   };
  // }

  interface MutationError {
    message: string;
  }

  // async function updateGrqlDevice(updateDevices: Device) {
  //   const updateDeviceRequest = `mutation updateDevice {
  //     gnss {
  //       updateDevice(
  //         input: {Id: "${updateDevices.id}", Name: "${updateDevices.name}", Description: "${updateDevices.description}", Coords: {x: "${updateDevices.Coords.x}", y: "${updateDevices.Coords.y}", z: "${updateDevices?.Coords.z}"}}
  //       ){
  //         device {
  //           id
  //           name
  //           token
  //           description
  //           Coords{
  //             x
  //             y
  //             z
  //           }
  //         }
  //       }
  //     }
  //   }`;
  //   const responce: any = await grqlFetch(updateDeviceRequest);
  //   return responce?.data?.gnss?.updateDevice;
  // }

  // async function getGrqlDevices() {
  //   const getDevicesRequest = `query listDevice{
  //     listDevice(filter:{}){
  //       items{
  //         id
  //         name
  //         token
  //         description
  //         Coords{
  //           x
  //           y
  //           z
  //         }
  //       }
  //     }
  //   }`;
  //   const responce: any = await grqlFetch(getDevicesRequest);
  //   // !dataMutated ? setCurrentDevice(responce?.data?.listDevice?.items[0]) : setDataMutated(false);
  //   setCurrentDevice(responce?.data?.listDevice?.items[0]);
  //   // console.log(responce?.data?.listDevice?.items[0].id);
  //   // console.log(BigInt(responce?.data?.listDevice?.items[0].id.replace(/\D/g, '')));
  //   return responce?.data?.listDevice?.items;
  // }

  // async function addDevice() {
  //   const addDeviceRequest = `mutation addDevice {
  //     gnss {
  //       createDevice(
  //         input: {Name: "test", Token: "test", Description: "test", Coords: {x: "test", y: "test", z: "test"}}
  //       ){
  //         device {
  //           id
  //           name
  //           token
  //           description
  //           Coords{
  //             x
  //             y
  //             z
  //           }
  //         }
  //       }
  //     }
  //   }`;
  //   data?.push({
  //     id: "test",
  //     name: "test",
  //     token: "test",
  //     description: "test",
  //     coordinates: { x: "test", y: "test", z: "test" },
  //   });
  //   // setCurrentDevice(data?.[data?.length - 1]);
  //   const responce: any = await grqlFetch(addDeviceRequest);
  //   return responce?.data?.listDevice?.items;
  // }

  // const { data, error, isLoading, refetch } = useQuery(
  //   "getGrqlData",
  //   getGrqlDevices
  // );

  const devices = useQuery("getDevices", getDevices);

  const changeDeviceMutation = useMutation("updateDevice", updateDevice, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDevices");
    },
  });

  const createDeviceMutation = useMutation(
    "createDeviceMutation",
    addDevice,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getDevices");
        createDeviceMutation.isSuccess && setCurrentDevice(createDeviceMutation.data || null);
      },
    }
  );

  // const changeDeviceMutation = useMutation<string, MutationError, Device>(
  //   "updateGrqlDevice",
  //   updateGrqlDevice,
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries("getGrqlData");
  //     },
  //   }
  // );

  // const createDeviceMutation = useMutation<string, MutationError, void>(
  //   "createGrqlDevice",
  //   addDevice,
  //   {}
  // );

  const [currentDevice, setCurrentDevice] = useState<Device | null>({
    id:  BigInt(0),
    backendID: "",
    name: "",
    token: "",
    description: "",
    coordinates: {
      x: "",
      y: "",
      z: "",
    },
  });

  function handleChange(event: SelectChangeEvent<number>, child: ReactNode) {
    setCurrentDevice(
      devices?.data?.find(
        (device: Device) => Number(device?.id) === Number(event?.target?.value)
      ) || null
    );
  }

  if (devices?.isLoading) {
    return <div>Loading...</div>;
  }

  if (devices?.error) {
    return <div>error</div>;
  }

  // if (!data && !currentDevice) {
  //   return <div>no data</div>;
  // }

  console.log("currentDevice", currentDevice);
  // console.log("devices.data", devices.data);

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
            value={Number(currentDevice?.id)}
            onChange={handleChange}
            autoWidth={true}
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
              createDeviceMutation.mutate();
            }}
            variant="outlined"
          >
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
                } as Device)
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
                } as Device);
              }}
            />
            {changeDeviceMutation.isSuccess && !changeDeviceMutation.isIdle && (
              <Alert severity="success">Изменения сохранены</Alert>
            )}
            {(changeDeviceMutation.isError ||
              changeDeviceMutation?.data?.length === 0) ? (
              <Alert severity="error">
                Ошибка изменения параметров устройства
              </Alert>
            ) : null}
            {createDeviceMutation.isError ? (
              <Alert severity="error">Ошибка создания нового устройства</Alert>
            ) : null}
            {createDeviceMutation.isSuccess && (
              <Alert severity="success">
                Новое устройство добавлено. Измените параметры в соответствующих
                полях и нажмите кнопку сохранить
              </Alert>
            )}
            <Stack direction={"row"} spacing={2}>
              <Button
                disabled={currentDevice === null}
                onClick={() => {
                  // console.log(currentDevice);
                  currentDevice && changeDeviceMutation.mutate(currentDevice);
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
                    devices?.data?.find(
                      (device: Device) => device.id === currentDevice?.id
                    ) || null
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
