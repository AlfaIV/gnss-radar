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

//toDo подумать как сделать загрузку данных



const CardMeasure: FC<CardMeasureProps> = ({
  id,
  name,
  comment,
  startData,
  startTime,
  endTime,
  endData,
  dataLink, 
}) => {
  return (
    <Card sx={{ width: 350, padding: "10px" }}>
      <CardHeader title={name} subheader={`Запись наблюдения № ${id}`} />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Начало записи: {startData} {startTime}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Окончание записи: {endData} {endTime}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={dataLink}>
          <Button size="small" variant="contained">
            Скачать
          </Button>
        </a>
      </CardActions>
    </Card>
  );
};

export default CardMeasure;
