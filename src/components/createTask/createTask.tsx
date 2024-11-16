import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'

import { FC } from 'react'
interface CreateTaskProps {
  open: boolean;
  onClose: () => void
}

const CreateTask: FC<CreateTaskProps> = ({open, onClose}) => {
  return (
    <>
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Создание нового задания для устройства
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Укажите парамеры задания для устройства
        </DialogContentText>
        <></>
      </DialogContent>
      <DialogActions>
      <Button variant='contained'>
          Создать
        </Button>
        <Button variant='outlined'>
          Отменить
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
};

export default CreateTask;