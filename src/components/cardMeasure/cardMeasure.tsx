import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import CardMeasureProps from "./cardMeasure.type";
import { Measure } from "@utils/types/types"
import 'moment/locale/ru';

//toDo подумать как сделать загрузку данных

const CardMeasure: FC<{measure:Measure}> = ({ measure }) => {
  return (
    <Card sx={{ width: 350, padding: "10px" }}>
      <CardHeader title={measure?.token} subheader={`Запись наблюдения № ${measure?.token}`} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Начало записи: {measure?.startTime?.format("HH:mm DD.MM.YYYY")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Окончание записи: {measure?.endTime?.format("HH:mm DD.MM.YYYY")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Цель: {measure?.target}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <a href={dataLink}> */}
        <Button  disabled={true} size="small" variant="contained">
          Скачать
        </Button>
        {/* </a> */}
        <Button  disabled={true} size="small" variant="contained">
          Исследовать
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardMeasure;
