import { memo } from 'react'

import TaskFeed from '~/features/Task/TaskFeed/TaskFeed'

const TaskList = memo(() => {
  return (
    <>
      <TaskFeed />
    </>
  )
})

export default TaskList
