import {
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Paper,
} from "@mui/material";

import Grid from "@mui/material/Grid2";
import CreateTask from "@components/createTask/createTask";

import { useState } from "react";

import TimelineChart from "@components/timeline/timeline";
import CardTasks from "@components/cardTasks/cardTasks";

import { getTasks } from "@utils/requests/requests";
import { useQuery } from "react-query";

import { task } from "@utils/types/types";

const Task = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const tasks = useQuery("getTasks", getTasks);

  if (tasks.isLoading) return "Loading...";
  if (tasks.error) return "An error has occurred: ";

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={1}
        sx={{ mt: 5, md: 5, padding: "20px 10px", minHeight: "90vh" }}
      >
        <Typography variant="h3">Планируемые задачи</Typography>
        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
          <Button onClick={() => setOpenCreateTask(true)} variant="contained">
            Создать задачу
          </Button>
          <FormControl disabled={true} sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Период отслеживания</InputLabel>
            <Select label="Период отслеживания">
              <MenuItem value={20}>Сегодня</MenuItem>
              <MenuItem value={21}>Все</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TimelineChart tasks={tasks.data} />
        <Grid
          p={10}
          container
          spacing={2}
          maxWidth={"xl"}
          alignSelf={"center"}
          alignContent={"center"}
        >
          {tasks.isSuccess &&
            !!tasks.data &&
            tasks.data.map((task) => (
              <Grid key={task.id}>
                <CardTasks task={task} />
              </Grid>
            ))}
        </Grid>
        <CreateTask
          open={openCreateTask}
          onClose={() => {
            setOpenCreateTask(false);
            tasks.refetch();
          }}
        />
      </Paper>
    </Container>
  );
};

export default Task;
