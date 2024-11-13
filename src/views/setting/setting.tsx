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

import { useQuery } from "react-query";
import grqlFetch from "@utils/grql";
import { ChangeEvent, useState } from "react";

const Setting = () => {
  interface Device {
    id: number;
    name: string;
    token: string;
    description: string;
  }

  const query = `query listDevice{
    listDevice(filter:{}){
      items{
        id
        name
        token
        description
        
        }
        }
        }`;

  async function getGrqlData() {
    const responce = await grqlFetch(query);
    setCurrentDevice(responce?.data?.listDevice?.items[0]);
    return responce?.data?.listDevice?.items;
  }

  const { data, error, isLoading } = useQuery("getGrqlData", getGrqlData);
  const [currentDevice, setCurrentDevice] = useState<Device | null>(data?.[0]);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    setCurrentDevice(
      data?.find((device: Device) => device.id === event.target.value)
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

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ mt: 5, md: 5, padding: "20px 10px" }}>
        <Typography variant="h3" color="initial">
          Настройки аппаратных комплексов
        </Typography>
        <Stack direction="row" spacing={2} margin={4}>
          <Select
            defaultValue={currentDevice?.id}
            value={currentDevice?.id}
            onChange={handleChange}
            autoWidth={true}
            sx={{ minWidth: 300 }}
          >
            {data?.map((device: Device) => (
              <MenuItem key={device.id} value={device.id}>
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
            <TextField label="Точка стояния" variant="outlined" />
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
            <Stack direction={"row"} spacing={2}>
              <Button
                onClick={() => {
                  console.log(currentDevice);
                }}
                variant="contained"
                sx={{ width: "150px" }}
              >
                Сохраинить
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
