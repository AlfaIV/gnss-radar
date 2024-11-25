import gnssTable from "./table.config";
import style from "./table.module.scss";
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
import { Satellite } from "@utils/types/types";

const TableSatellite: FC<{ satellites: Satellite[] }> = ({ satellites }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead className={style.table__header}>
          <TableRow>
            <TableCell className={style.table__header__item}>Спутник</TableCell>
            <TableCell className={style.table__header__item}>Азимут</TableCell>
            <TableCell className={style.table__header__item}>
              Угол места
            </TableCell>
            <TableCell className={style.table__header__item}>
              Дальность
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!satellites && satellites.length > 0 ? (
            satellites.map((satellite) => (
              <TableRow className={style.table__row} key={satellite?.Id}>
                <TableCell className={style.table__row__item}>
                  {" "}
                  {satellite.Name}{" "}
                </TableCell>
                <TableCell className={style.table__row__item}>
                  {" "}
                  {satellite?.azimuth}{" "}
                </TableCell>
                <TableCell className={style.table__row__item}>
                  {" "}
                  {satellite?.elevation}
                </TableCell>
                <TableCell className={style.table__row__item}>
                  {" "}
                  {satellite?.range}{" "}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>Список доступных спутников не загрузился</TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSatellite;
