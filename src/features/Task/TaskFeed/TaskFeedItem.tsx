import { 
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    Stack,
    Divider,
    Box,
    useTheme,
    Tooltip,
    Button
  } from "@mui/material";
  import { memo, forwardRef, useState } from "react";
  import dayjs from "dayjs";
  import { TaskFeedItemProps } from "~/shared/typings/tasks/tasks";
import TaskDeleteDialog from "./TaskDeleteDialog";
import TaskUpdateDialog from "./TaskUpdateDialog";
  
  const TaskFeedItem = memo(forwardRef<HTMLDivElement, TaskFeedItemProps>((props, ref) => {
    const {
      id,
      name,
      description,
      datetimeStart,
      datetimeEnd,
      userName,
      surname,
      email,
      orgnizationName,
      satellites,
      isAll
    } = props;

    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)
  
    const theme = useTheme();
    const statusColor = dayjs().isAfter(dayjs(datetimeEnd)) 
      ? theme.palette.error.main 
      : theme.palette.success.main;
  
  
    return (
        <>
      <Box 
        ref={ref}
        sx={{ 
          mb: 2,
          boxShadow: 2,
          borderRadius: 2,
          transition: '0.3s',
          height: 'fit-content',
          width: 800,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4
          }
        }}
      >
        <Box sx={{padding: 5}}>
          <Stack spacing={2}>
            {/* Заголовок и статус */}
            <Box display="flex" justifyContent="space-between" alignItems="center" width={'100%'}>
                <Tooltip title={name}>
              <Typography variant="h6" fontWeight="bold" sx={{overflowX: 'hidden', textOverflow: 'ellipsis'}}>
                {name}
              </Typography>
              </Tooltip>
              <Chip 
                label={dayjs().isAfter(datetimeEnd) ? "Завершено" : "В процессе"}
                sx={{ 
                  backgroundColor: statusColor + '20', 
                  color: statusColor,
                  width: '150px'
                }}
                size="small"
              />
            </Box>
  
            {/* Описание */}
            <Typography variant="body2" color="text.secondary" textOverflow={'ellipsis'} sx={{ overflowWrap: 'break-word'}}>
              {description}
            </Typography>
  
            {/* Временные метки */}
            <Stack direction="row" spacing={4}>
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Начало
                </Typography>
                <Typography variant="body2">
                  {dayjs(datetimeStart).format('DD.MM.YYYY, HH:mm')}
                </Typography>
              </Stack>
  
              <Stack>
                <Typography variant="caption" color="text.secondary">
                  Окончание
                </Typography>
                <Typography variant="body2">
                  {dayjs(datetimeEnd).format('DD.MM.YYYY, HH:mm')}
                </Typography>
              </Stack>
            </Stack>
  
            <Divider />
  
            {/* Информация об авторе */}
              <Stack>
                <Typography variant="body2">
                  {[userName, surname, email].filter(Boolean).join(' ')}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {orgnizationName || 'Не указана организация'}
                </Typography>
              </Stack>
            </Stack>
            <Divider />
            <Stack 
  direction="row" 
  paddingTop={2} 
  paddingBottom={2}
  sx={{
    flexWrap: 'wrap',
    gap: 1,
    maxWidth: '100%',
    overflow: 'hidden'
  }}
>
  {satellites?.map((sat: string) => (
    <Chip 
      label={sat} 
      key={`key__${sat}`}
      sx={{ 
        maxWidth: 200,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    />
  ))}
  {isAll && <Chip label={'Все спутники в заданном временном диапазоне'}></Chip>}
</Stack>
<Divider />
<Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'center', gap: '10px', padding: 2}}>
    <Button variant="contained" onClick={() => setIsOpenUpdate(true)}>Обновить</Button>
    <Button color="error" variant="contained" onClick={() => setIsOpenDelete(true)}>Удалить</Button>
</Box>
        </Box>
      </Box>
<TaskDeleteDialog onClose={() => setIsOpenDelete(false)} open={isOpenDelete} id={id as string} name={name}/>
<TaskUpdateDialog {...props} onClose={() => setIsOpenUpdate(false)} open={isOpenUpdate} />
      </>
    )
  }));
  
  export default TaskFeedItem;