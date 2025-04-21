import { Box } from '@mui/material'

import HeaderAndFooter from '~/widgets/Layout/HeaderAndFooter/HeaderAndFooter'
import TaskList from '~/widgets/Tasks/TaskList/TaskList'
import TasksHeader from '~/widgets/Tasks/TasksHeader/TasksHeader'

const TasksPage = () => {
  return (
    <HeaderAndFooter>
      <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
        <TasksHeader />
        <TaskList />
      </Box>
    </HeaderAndFooter>
  )
}

export default TasksPage
