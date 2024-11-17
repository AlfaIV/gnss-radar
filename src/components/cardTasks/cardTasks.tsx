import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  CardHeader,
} from "@mui/material";
import { task } from "@utils/types/types";
import { FC } from "react";
interface CardTasksProps {
  task: task;
}

const CardTasks: FC<CardTasksProps> = ({ task }) => {
  return (
    <Card sx={{ maxWidth: 345, minWidth: "250px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {task.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Описание задачи
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Начало выполнения
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.startDataTime.format("DD.MM.YYYY HH:mm")}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Конец выполнения
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.endDataTime.format("DD.MM.YYYY HH:mm")}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          Цель:
        </Typography> */}
      </CardContent>
      <CardActions>
        <Button color="primary">Подробнее</Button>
        <Button color="primary">Удалить</Button>
      </CardActions>
    </Card>
  );
};

export default CardTasks;
