import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  TextField,
  Typography,
  MenuItem,
  Select,
  Alert,
  Box,
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Moment } from "moment";
import { FC, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getSatellites, getDevices } from "@utils/requests/requests";

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
}

interface task {
  deviceID?: number | null;
  deviceName: string | null;
  name: string;
  description?: string | null;
  startDataTime: Moment;
  endDataTime: Moment;
  target?: string | null;
  signal?: string | null;
}

//TO DO - сделать запрос спутников по имени устройства

const CreateTask: FC<CreateTaskProps> = ({ open, onClose }) => {
  moment.locale("ru");

  const [task, setTask] = useState<task>({
    deviceName: null,
    name: "",
    description: "",
    startDataTime: moment(),
    endDataTime: moment().add(1, "hours"),
    target: null,
    signal: null,
  });

  const {
    data: listSatellitesData,
    isLoading: listSatellitesLoading,
    isError: listSatellitesError,
  } = useQuery("getSatellites", getSatellites);

  const {
    data: listDevicesData,
    isLoading: listDevicesLoading,
    isError: listDevicesError,
  } = useQuery("getDevices", getDevices);

  if (
    listSatellitesError ||
    !listSatellitesData ||
    listDevicesError ||
    !listDevicesData
  ) {
    return (
      <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
        <DialogContent>
          <Alert variant="filled" severity="error">
            Ошибка получения данных с сервера
          </Alert>
        </DialogContent>
      </Dialog>
    );
  }

  return true ? (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle variant="h4">
        Создание нового задания для устройства
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Укажите парамеры задания для устройства
        </DialogContentText>
        <FormControl component="fieldset" fullWidth={true} sx={{ mt: 2 }}>
          <FormLabel component="legend">Выберите устройство</FormLabel>
          <Select>
            {listDevicesData?.map((item) => (
              <MenuItem key={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Описание задания
          </Typography>
          <FormLabel component="legend">Укажите название задания</FormLabel>
          <TextField
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            fullWidth={true}
          />
          <FormLabel sx={{ mt: "10px" }} component="legend">
            Укажите описание задания
          </FormLabel>
          <TextField
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            fullWidth={true}
            multiline={true}
            rows={4}
          />
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Время выполнения задания
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormLabel component="legend">Время начала выполнения</FormLabel>
            <DateTimePicker
              value={task.startDataTime}
              format="HH часов DD.MM.YYYY"
              onChange={(newDataTime) =>
                setTask({ ...task, startDataTime: newDataTime as Moment })
              }
            />
            <FormLabel sx={{ mt: "10px" }} component="legend">
              Время окончания выполнения
            </FormLabel>
            <DateTimePicker
              value={task.endDataTime}
              defaultValue={moment().add(1, "hours")}
              format="HH часов DD.MM.YYYY"
              onChange={(newDataTime) =>
                setTask({ ...task, endDataTime: newDataTime as Moment })
              }
            />
          </LocalizationProvider>
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Цель наблюдения
          </Typography>
          <FormLabel component="legend">Номер спутника</FormLabel>
          <Select>
            {listSatellitesData?.map((item) => (
              <MenuItem key={item.Id}>{item.Name}</MenuItem>
            ))}
          </Select>
          <FormLabel sx={{ mt: "10px" }} component="legend">
            Тип сигнала
          </FormLabel>
          <Select>
            <MenuItem>L1</MenuItem>
            <MenuItem>L2</MenuItem>
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">Создать</Button>
        <Button onClick={onClose} variant="outlined">
          Отменить
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
};

export default CreateTask;
