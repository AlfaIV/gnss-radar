import style from "./radar.module.scss";
import Plot from "react-plotly.js";
// import Button from "@components/button/button";
import plotConfig from "./plot.config";
import TableSatellite from "@components/table/table";
import { FC } from "react";
import {
  Grid2,
  Button,
  Typography,
  Stack,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import { useQuery, useMutation, useQueryClient } from "react-query";
import { ChangeEvent, useState, ReactNode, useEffect } from "react";
import { getDevices, getSatellites } from "@utils/requests/requests";
import { Device, Satellite } from "@utils/types/types";

const Radar: FC = () => {
  const [errMsg, setErrMsg] = useState<string>("");

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

  const satellitesList = useQuery("getSatellites", getSatellites, {
    onError: () => {
      setErrMsg("Ошибка получения спутников");
    },
  });

  function handleChange(event: SelectChangeEvent<number>, child: ReactNode) {
    setCurrentDevice(
      devices?.data?.find(
        (device: Device) => Number(device?.id) === Number(event?.target?.value)
      ) || null
    );
  }

  return (
    <div className={style.radar}>
      <div className={style.radar__plot}>
        <Plot data={plotConfig.data} layout={plotConfig.layout} />
      </div>
      <div className={style.radar__table}>
        <Stack spacing={2} direction="row" alignItems={"center"}>
          <Typography>Выберите устройство</Typography>
          <Select
            value={Number(currentDevice?.id)}
            onChange={handleChange}
            autoWidth={true}
            sx={{ maxWidth: 300, minWidth: 300, backgroundColor: "white" }}
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
        </Stack>
        <Typography variant="h5">Описание устройства</Typography>
        <Typography variant="body1">{currentDevice?.description}</Typography>
        <Stack
          spacing={2}
          direction="row"
          alignItems={"center"}
          alignContent={"center"}
        >
          <Typography component={"p"} variant="body1">
            Статус калибровки:
          </Typography>
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            sx={{ maxWidth: "200px" }}
            severity="success"
          >
            Калиброван
          </Alert>
          {/* <Alert icon={<CheckIcon fontSize="inherit" />} sx={{ maxWidth: "200px"}} severity="warning">Нет данных</Alert>
          <Alert icon={<CheckIcon fontSize="inherit" />} sx={{ maxWidth: "200px"}} severity="error">Калибровка отсутствует</Alert> */}
          <Button variant="contained">Провести калибровку</Button>
        </Stack>
        <TableContainer>
          <Table sx={{ border: "2px solid white", borderRadius: "15px" }}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TableRow sx={{ mb: 2 }}>
                    Выполняется задание: {"Нет данных"}{" "}
                  </TableRow>
                  <TableRow sx={{ mb: 2 }}>
                    <Button variant="contained">Прервать задание</Button>
                  </TableRow>
                </TableCell>
                <TableCell>
                  <TableRow sx={{ mb: 10 }}>Спутник: {"Нет данных"} </TableRow>
                  <TableRow sx={{ mb: 10 }}>
                    Начало записи: {"Нет данных"}{" "}
                  </TableRow>
                  <TableRow sx={{ mb: 10 }}>
                    Окончание записи: {"Нет данных"}
                  </TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableSatellite satellites={satellitesList.data || [] } />
      </div>
    </div>
  );
};
export default Radar;
