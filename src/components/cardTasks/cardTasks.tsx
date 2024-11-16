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
import { deleteTask, sendTaskToDevice } from "@utils/requests/requests";
import { useQueryClient, useMutation} from "react-query";

interface CardTasksProps {
  task: task;
}

const CardTasks: FC<CardTasksProps> = ({ task }) => {
  
  const queryClient = useQueryClient();
  const deleteTaskMutation = useMutation("deleteTask", deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("getTasks");
    }
  });

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
        <Button onClick={() => deleteTaskMutation.mutate(task)} color="primary">Удалить</Button>
        <Button onClick={() => sendTaskToDevice(task)} color="primary">Отправить</Button>
      </CardActions>
    </Card>
  );
};

export default CardTasks;
