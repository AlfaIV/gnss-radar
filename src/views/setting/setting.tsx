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
} from "@mui/material";

import { useQuery, useMutation } from "react-query";
import grqlFetch from "@utils/grql";
import { ChangeEvent, useState, ReactNode } from "react";

//to do - сделать точку стояния

const Setting = () => {
  interface Device {
    id: number;
    name: string;
    token: string;
    description: string;
    coordinates: {
      x: string;
      y: string;
      z: string;
    };
  }

  const getDevices = `query listDevice{
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

  async function updateGrqlDevice(updateDevices: Device) {
    const updateDevice = `mutation updateDevice {
      gnss {
        updateDevice(
          input: {Id: "${updateDevices.id}", Name: "${updateDevices.name}", Token: "${updateDevices.token}", Description: "${updateDevices.description}", Coords: {x: "${updateDevices.Coords.x}", y: "${updateDevices.Coords.y}", z: "${updateDevices.Coords.z}"}}
        ){
          device {
            id
          }
        }
      }
    }`;
    // console.log(updateDevice);
    const responce: any = await grqlFetch(updateDevice);
    return responce?.data?.gnss?.updateDevice;
  }

  async function getGrqlDevices() {
    const responce: any = await grqlFetch(getDevices);
    if (!currentDevice) {
      setCurrentDevice(responce?.data?.listDevice?.items[0]);
    }
    return responce?.data?.listDevice?.items;
  }

  const { data, error, isLoading, refetch } = useQuery(
    "getGrqlData",
    getGrqlDevices
  );
  const mutation = useMutation("updateGrqlDevice", updateGrqlDevice);
  const [currentDevice, setCurrentDevice] = useState<Device>(data?.[0]);

  function handleChange(event: ChangeEvent<number>, child: ReactNode) {
    setCurrentDevice(
      data?.find((device: Device) => device.id === event?.target?.value)
    );
  }

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
            value={currentDevice?.id}
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
          <Button variant="outlined">Добавить устройство</Button>
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
            {mutation.isSuccess && mutation.data && (
              <Alert severity="success">Изменения сохранены</Alert>
            )}
            {mutation.isError || mutation.error ? (
              <Alert severity="error">{mutation.error.message}</Alert>
            ) : null}
            <Stack direction={"row"} spacing={2}>
              <Button
                onClick={() => {
                  // console.log(currentDevice);
                  mutation.mutate(currentDevice);
                  refetch();
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
