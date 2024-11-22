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
import { FC, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getSatellites,
  getDevices,
  createTask,
} from "@utils/requests/requests";
import {
  Device,
  Satellite,
  signalType,
  signals,
  task,
} from "@utils/types/types";

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
  currentTask: task;
}

//TO DO - сделать запрос спутников по имени устройства
//To DO - сделать проверку по типу устройства, доступен ли установленный спутник, есть ли у спутника сигнал
//To DO - сделать валидацию полей

const InfoTask: FC<CreateTaskProps> = ({ open, onClose, currentTask}) => {
  moment.locale("ru");
  const queryClient = useQueryClient();

  const [task, setTask] = useState<task>(currentTask);

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

  const handleSubmit = () => {
    try {
      // validateData(task);
    } catch (error) {
      console.error("Ошибка валидации данных:", error);
    }
  };

  if (
    listSatellitesError ||
    listDevicesError
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

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <DialogTitle variant="h4">
        {currentTask?.id ? `Информация о задании №${currentTask.id}` : "Информация о задании не доступна"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Парамеры задания для устройства
        </DialogContentText>
        <FormControl component="fieldset" fullWidth={true} sx={{ mt: 2 }}>
          <FormLabel component="legend">Выберите устройство</FormLabel>
          <Typography>
            {"Название устройства: " + task.device?.name || "Название устройство не определено"}
          </Typography>
          <Typography variant="h6" color="initial" sx={{ m: "20px 0px" }}>
            Описание задания
          </Typography>
          <FormLabel component="legend">Название задания</FormLabel>
          <TextField
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            fullWidth={true}
          />
          <FormLabel sx={{ mt: "10px" }} component="legend">
            Описание задания
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
          <Select
            value={task.target?.Id || null}
            onChange={(e) =>
              setTask({
                ...task,
                target:
                  listSatellitesData?.find(
                    (item) => item.Id === e.target.value
                  ) || null,
              })
            }
          >
            {listSatellitesData?.map((item) => (
              <MenuItem key={item.Id} value={item.Id}>
                {item.Name}
              </MenuItem>
            ))}
          </Select>
          <FormLabel sx={{ mt: "10px" }} component="legend">
            Тип сигнала
          </FormLabel>
          <Select
            value={task?.signal || null}
            onChange={(e) =>
              setTask({ ...task, signal: e.target.value as signalType })
            }
          >
            <MenuItem key="L1" value="L1">
              L1
            </MenuItem>
            <MenuItem key="L2" value="L2">
              L2
            </MenuItem>
          </Select>
          <FormHelperText></FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={true} onClick={handleSubmit} variant="contained">
          Создать изменения
        </Button>
        <Button onClick={onClose} variant="outlined">
          Отменить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoTask;
