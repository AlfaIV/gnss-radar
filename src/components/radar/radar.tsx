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
} from "@mui/material";

const Radar: FC = () => {
  return (
    <div className={style.radar}>
      <div className={style.radar__plot}>
        <Plot data={plotConfig.data} layout={plotConfig.layout} />
      </div>
      <div className={style.radar__table}>
        <Stack
          spacing={2}
          direction="row"
          alignItems={"center"}
          alignContent={"center"}
        >
          <Typography component={"p"} variant="body1">
            Статус калибровки:
          </Typography>
          <Alert sx={{ maxWidth: "200px" }} severity="success">
            Калиброван
          </Alert>
          {/* <Alert sx={{ maxWidth: "200px"}} severity="warning">Нет данных</Alert> */}
          {/* <Alert sx={{ maxWidth: "200px"}} severity="error">Калибровка отсутствует</Alert> */}
          <Button variant="contained">Провести калибровку</Button>
        </Stack>
        <TableContainer >
          <Table sx={{border: "2px solid white", borderRadius: "15px"}}>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TableRow sx={{ mb: 2 }}>Выполняется задание: {"Нет данных"} </TableRow>
                  <TableRow sx={{ mb: 2 }}>
                    <Button variant="contained">Прервать задание</Button>
                  </TableRow>
                </TableCell>
                <TableCell >
                  <TableRow sx={{ mb: 10 }}>Спутник: {"Нет данных"} </TableRow>
                  <TableRow sx={{ mb: 10 }}>Начало записи: {"Нет данных"} </TableRow>
                  <TableRow sx={{ mb: 10 }}>Окончание записи: {"Нет данных"}</TableRow>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TableSatellite />
      </div>
    </div>
  );
};
export default Radar;
