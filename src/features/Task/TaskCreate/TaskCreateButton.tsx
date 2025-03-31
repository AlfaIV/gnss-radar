import { Box, Button } from "@mui/material";
import { memo, useState } from "react";
import TaskCreateDialog from "./TaskCreateDialog";


const TaskCreateButton = memo(() => {

    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (<><Box sx={{padding: '10px'}}>
        <Button onClick={() => setIsOpen(true)} variant="contained">
Создать задачу
</Button>
    </Box>
    <TaskCreateDialog open={isOpen} onClose={() => setIsOpen(false)}/>
    </>)
})

export default TaskCreateButton;