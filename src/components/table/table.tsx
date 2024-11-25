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

const TableSatellite: FC = () => {
  return (
    <TableContainer>
      <Table>
        <TableHead className={style.table__header}>
          <TableRow>
            <TableCell className={style.table__header__item}>Спутник</TableCell>
            <TableCell className={style.table__header__item}>Азимут</TableCell>
            <TableCell className={style.table__header__item}>Угол места</TableCell>
            <TableCell className={style.table__header__item}>Дальность</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(gnssTable).map((key) =>
            gnssTable[key].map((item) => (
              <TableRow className={style.table__row} key={item.name}>
                <TableCell className={style.table__row__item}> {item.name}     </TableCell>
                <TableCell className={style.table__row__item}> {item.azimuth}  </TableCell>
                <TableCell className={style.table__row__item}> {item.elevation}</TableCell>
                <TableCell className={style.table__row__item}> {item.range}    </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableSatellite;
