import React from 'react'
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
  Box,
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useState } from 'react'
import { useQuery } from 'react-query'

import CreateTask from '~/components/createTask/createTask'
import TimelineChart from '~/components/timeline/timeline'
import CardTasks from '~/components/cardTasks/cardTasks'
import { getTasks } from '~/utils/requests/requests'
import { task } from '~/utils/types/types'
import InfoTask from '~/components/infoTask/infoTask'

const Task = () => {
  const [openCreateTask, setOpenCreateTask] = useState(false)
  const [openInfoTask, setOpenInfoTask] = useState<task | null>(null)
  // const [infoTask, setInfoTask] = useState<task | null>(null);

  const tasks = useQuery('getTasks', getTasks)

  // if (tasks.isLoading) return (      <Box
  //   sx={{
  //     width: '100%',
  //     height: '100vh',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   }}
  // >
  //   <Typography variant="h2">Идёт загрузка...</Typography>
  // </Box>);
  // if (tasks.error) return "An error has occurred: ";

  return (
    <Container maxWidth='xl'>
      <Paper
        elevation={1}
        sx={{ mt: 5, md: 5, padding: '20px 10px', minHeight: '90vh' }}
      >
        <Typography variant='h3'>Планируемые задачи</Typography>
        <Stack spacing={2} direction='row' sx={{ m: 2 }}>
          <Button onClick={() => setOpenCreateTask(true)} variant='contained'>
            Создать задачу
          </Button>
          <FormControl disabled sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Период отслеживания</InputLabel>
            <Select label='Период отслеживания'>
              <MenuItem value={20}>Сегодня</MenuItem>
              <MenuItem value={21}>Все</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <TimelineChart openInfoTask={setOpenInfoTask} tasks={tasks.data} />
        <Grid
          p={10}
          container
          spacing={2}
          maxWidth='xl'
          alignSelf='center'
          alignContent='center'
        >
          {tasks.isSuccess &&
            !!tasks.data &&
            tasks.data.map((task) => (
              <Grid key={task.id}>
                <CardTasks openInfoTask={setOpenInfoTask} task={task} />
              </Grid>
            ))}
        </Grid>
        <CreateTask
          open={openCreateTask}
          onClose={() => {
            setOpenCreateTask(false)
            tasks.refetch()
          }}
        />
        {openInfoTask && (
          <InfoTask
            open={!!openInfoTask}
            onClose={() => {
              setOpenInfoTask(null)
              tasks.refetch()
            }}
            currentTask={openInfoTask}
          />
        )}
      </Paper>
    </Container>
  )
}

export default Task
