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
import { FC } from "react";

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
}

const CreateTask: FC<CreateTaskProps> = ({ open, onClose }) => {
  moment.locale("ru");
  return (
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
            <MenuItem>Устройство 1</MenuItem>
            <MenuItem>Устройство 2</MenuItem>
          </Select>
          <Typography variant="h6" color="initial">
            Описание задания
          </Typography>
          <FormLabel component="legend">Укажите название задания</FormLabel>
          <TextField fullWidth={true} />
          <FormLabel component="legend">Укажите описание задания</FormLabel>
          <TextField fullWidth={true} multiline={true} rows={4} />
          <Typography variant="h6" color="initial">
            Время выполнения задания
          </Typography>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <FormLabel component="legend">Время начала выполнения</FormLabel>
            <DateTimePicker
              defaultValue={moment()}
              format="HH часов DD.MM.YYYY"
            />
            <FormLabel component="legend">Время окончания выполнения</FormLabel>
            <DateTimePicker
              defaultValue={moment().add(1, "hours")}
              format="HH часов DD.MM.YYYY"
            />
          </LocalizationProvider>
          <Typography variant="h6" color="initial">
            Цель наблюдения
          </Typography>
          <FormLabel component="legend">Номер спутника</FormLabel>
          <Select>
            <MenuItem>G1</MenuItem>
            <MenuItem>G2</MenuItem>
          </Select>
          <FormLabel component="legend">Тип сигнала</FormLabel>
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
