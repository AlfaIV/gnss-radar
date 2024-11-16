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
} from "@mui/material";

import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { Moment } from "moment";
import { FC, useState } from "react";
import { useMutation } from "react-query";
import grqlFetch from "../../utils/grql";

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

  const listSatellitesRequest = `query listSatellites{
    listSatellites(filter:{}){
      items{
        Id
        SatelliteName
      }
    }
  }`

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle variant="h4">
        Создание нового задания для устройства
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Укажите парамеры задания для устройства
        </DialogContentText>
        <FormControl component="fieldset" fullWidth={true} sx={{ mt: 2}}>
          <FormLabel component="legend">Выберите устройство</FormLabel>
          <Select>
            <MenuItem>Устройство 1</MenuItem>
            <MenuItem>Устройство 2</MenuItem>
          </Select>
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Описание задания
          </Typography>
          <FormLabel component="legend">Укажите название задания</FormLabel>
          <TextField value={task.name} onChange={(e) => setTask({...task, name: e.target.value})} fullWidth={true} />
          <FormLabel sx={{ mt: "10px" }} component="legend">Укажите описание задания</FormLabel>
          <TextField
            value={task.description}
            onChange={(e) => setTask({...task, description: e.target.value})}
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
              onChange={(newDataTime) => setTask({...task, startDataTime: newDataTime})}
            />
            <FormLabel sx={{ mt: "10px" }} component="legend">Время окончания выполнения</FormLabel>
            <DateTimePicker
              value={task.endDataTime}
              defaultValue={moment().add(1, "hours")}
              format="HH часов DD.MM.YYYY"
            />
          </LocalizationProvider>
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Цель наблюдения
          </Typography>
          <FormLabel component="legend">Номер спутника</FormLabel>
          <Select>
            <MenuItem>G1</MenuItem>
            <MenuItem>G2</MenuItem>
          </Select>
          <FormLabel sx={{ mt: "10px" }} component="legend">Тип сигнала</FormLabel>
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
  );
};

export default CreateTask;
