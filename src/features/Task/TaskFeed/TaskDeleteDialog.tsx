import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Typography } from "@mui/material";
import { memo } from "react";
import { TaskDeleteDialogProps } from "~/shared/typings/tasks/tasks";
import useService from "~/entities/useService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TaskDeleteDialog = memo((props: TaskDeleteDialogProps) => {
    const { open, onClose, id, name } = props;
    
    const { deleteTask } = useService();
    const queryClient = useQueryClient();
  
    const { mutateAsync: removeTask, isPending } = useMutation({
        mutationKey: ['delete-task'],
        mutationFn: () => deleteTask(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
            onClose();
        },
    });

    const handleDelete = async () => {
        try {
            await removeTask();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('Error deleting task:', error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
            <DialogTitle align="center">
                {`Удалить задачу ${name}?`}
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%', gap: '10px'}}>
            <Button 
                onClick={handleDelete}
                disabled={isPending}
                color="error"
                variant="contained"
            >
                {isPending ? "Удаление..." : "Да"}
            </Button>
            <Button 
                onClick={onClose}
                disabled={isPending}
                variant="contained"
            >
                Нет
            </Button>
            </Box>
            </DialogContent>
        </Dialog>
    );
});

export default TaskDeleteDialog;