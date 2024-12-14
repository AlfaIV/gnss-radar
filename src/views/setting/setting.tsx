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
import {
  getDevices,
  updateDevice,
  addDevice,
  deleteDevice,
  getCode,
} from "@utils/requests/requests";
import { Device } from "@utils/types/types";
import { BurstMode, Description } from "@mui/icons-material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";
import { copyToClipboard } from "@utils/clipboard";

//to do - сделать точку стояния
//to do - решить  вопрос с id

const Setting = () => {
  const [newDeviceCreation, setNewDeviceCreation] = useState(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const queryClient = useQueryClient();

  const closeMsgTimer = setTimeout(() => {
    setSuccessMsg("");
  }, 5000);

  const [currentDevice, setCurrentDevice] = useState<Device | null>({
    id: BigInt(0),
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

  const devices = useQuery("getDevices", getDevices, {
    onError: () => {
      setErrMsg("Ошибка получения устройств");
    },
  });

  const changeDeviceMutation = useMutation("updateDevice", updateDevice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getDevices");
      setErrMsg("");
      setSuccessMsg("Устройство обновлено");
      closeMsgTimer;
    },
    onError: () => {
      setErrMsg("Ошибка обновления устройства");
    },
  });

  const createDeviceMutation = useMutation("createDeviceMutation", addDevice, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getDevices");
      setCurrentDevice(createDeviceMutation.data || null);
      setNewDeviceCreation(false);
      setErrMsg("");
      setSuccessMsg("Устройство создано");
      closeMsgTimer;
    },
    onError: () => {
      setErrMsg("Ошибка создания устройства");
    },
  });

  const deleteDeviceMutation = useMutation("deleteDevice", deleteDevice, {
    onSuccess: () => {
      queryClient.invalidateQueries("getDevices");
      setErrMsg("");
      setSuccessMsg("Устройство удалено");
      setCurrentDevice(null);
      closeMsgTimer;
    },
  });

  const getCodeQuery = useMutation("getCodeReceiver", getCode, {
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      console.error("Failed to get code:", error);
    },
  });

  function handleChange(event: SelectChangeEvent<number>, child: ReactNode) {
    setNewDeviceCreation(false);
    const newDevice =
      devices?.data?.find(
        (device: Device) => Number(device?.id) === Number(event?.target?.value)
      ) || null;
    setCurrentDevice(newDevice);
    newDevice && getCodeQuery.mutate(newDevice);
  }

  function handleCreateDevice() {
    const newDefaultDevice: Device = {
      id: BigInt(0),
      name: "Новое устройство",
      description: "Описание нового устройства",
      token: "Токен сгенерируется автоматически",
      coordinates: {
        x: "0",
        y: "0",
        z: "0",
      },
    };
    setCurrentDevice(newDefaultDevice);
    setNewDeviceCreation(true);
  }

  if (devices?.isLoading) {
    return <div>Loading...</div>;
  }

  if (devices?.error) {
    return <div>error</div>;
  }

  // console.log("currentDevice", currentDevice);
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
        <Typography sx={{ m: 3 }}>
          Выберите созданное устройство или нажмите "Добавить устройство" если
          хотите добавить новое.
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
              handleCreateDevice();
            }}
            variant="outlined"
          >
            Добавить устройство
          </Button>
        </Stack>
        <Box sx={{ padding: "20px" }}>
          {!!currentDevice?.token && (
            <Stack spacing={4}>
              <Typography variant="body1">
                {newDeviceCreation
                  ? 'Внесите изменения в параметры устройства и нажмите "Сохранить"'
                  : "В данном разделе можно редактировать параметры уже добавленных устройств для этого нужно изменить требуемый параметр и нажать 'Сохранить'. Или создать новое устройство нажав кнопку 'Добавить устройство'."}
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
              <Select defaultValue="RTL-SDR" label="Модель SDR" value={currentDevice?.model}>
                <MenuItem>RTL-SDR</MenuItem>
              </Select>
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
                  onClick={() => {
                    copyToClipboard(currentDevice?.token || "");
                  }}
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
              <TextField
                label="URL устройства"
                variant="outlined"
                disabled={true}
              />
              {!!errMsg && <Alert severity="error">{errMsg}</Alert>}
              {!!successMsg && <Alert severity="success">{successMsg}</Alert>}
              <Stack direction={"row"} spacing={2}>
                <Button
                  disabled={currentDevice === null}
                  onClick={() => {
                    // console.log(currentDevice);
                    !newDeviceCreation &&
                      currentDevice &&
                      changeDeviceMutation.mutate(currentDevice);
                    newDeviceCreation &&
                      currentDevice &&
                      createDeviceMutation.mutate(currentDevice);
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
                <Button
                  onClick={() => {
                    if (currentDevice) {
                      deleteDeviceMutation.mutate(currentDevice);
                    }
                  }}
                  variant="outlined"
                  color="error"
                  sx={{ width: "150px" }}
                >
                  Удалить
                </Button>
              </Stack>
            </Stack>
          )}
        </Box>
        <Box sx={{ padding: "20px" }}>
          {!newDeviceCreation &&
            currentDevice?.token &&
            !!getCodeQuery.data && (
              <>
                <Typography>
                  Ниже приведен пример кода на языке Python, где формируются
                  корректные запросы к сервису.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 3, mb: 1 }}>
                  <Button
                    variant="outlined"
                    onClick={() => copyToClipboard(getCodeQuery.data)}
                  >
                    Скопировать код
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => copyToClipboard(getCodeQuery.data)}
                    disabled={true}
                  >
                    Скачать код
                  </Button>
                </Stack>
                <SyntaxHighlighter language="python" style={coy}>
                  {getCodeQuery.data}
                </SyntaxHighlighter>
              </>
            )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Setting;

// const mutation = useMutation("getGrqlData", getGrqlData);

// const [token, setToken] = useState("ВашТокен12345");
// const [openSnackbar, setOpenSnackbar] = useState(false);

// const handleCloseSnackbar = () => {
//   setOpenSnackbar(false);
// };
