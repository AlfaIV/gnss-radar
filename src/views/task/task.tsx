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

import CreateTask from "@components/createTask/createTask";

import { useState } from "react";

import TimelineChart from "@components/timeline/timeline";

const Task = () => {
  
  const [openCreateTask, setOpenCreateTask] = useState(false);

  return (
    <Container maxWidth="xl">
      <Paper elevation={1}  sx={{ mt: 5, md: 5, padding: "20px 10px" }}>
        <Typography variant="h3">Планируемые задачи</Typography>
        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
          <Button onClick={() => setOpenCreateTask(true)} variant="contained">Создать задачу</Button>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel
            // id="demo-simple-select-autowidth-label"
            >
              Период отслеживания
            </InputLabel>
            <Select
              // labelId="demo-simple-select-autowidth-label"
              // id="demo-simple-select-autowidth"
              // value={age}
              // onChange={handleChange}
              // autoWidth
              label="Период отслеживания"
            >
              <MenuItem value={20}>Сегодня</MenuItem>
              <MenuItem value={21}>Все</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TimelineChart/>
        <CreateTask open={openCreateTask} onClose={() => setOpenCreateTask(false)}/>
      </Paper>
    </Container>
  );
};

export default Task;
