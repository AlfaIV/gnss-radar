import { Box } from "@mui/material";
import TaskCreateButton from "~/features/Task/TaskCreate/TaskCreateButton"


const TasksHeader = () => {


    return (
        <Box sx={{width: '100%'}}>
    <TaskCreateButton />
    </Box>
)
}

export default TasksHeader;