import {
  Autocomplete,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Stack,
  TextField,
} from '@mui/material'
import { memo, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { ruRU } from '@mui/x-date-pickers/locales'

import useService from '~/entities/useService'
import {
  CreateTaskRequest,
  TaskUpdateDialogProps,
  UpdateTaskRequest,
} from '~/shared/typings/tasks/tasks'

export const dateFormatter = (rawDate: string): string =>
  dayjs(rawDate).format('YYYY-MM-DDTHH:mm:ss')

const TaskUpdateDialog = memo((props: TaskUpdateDialogProps) => {
  const {
    open,
    onClose,
    name,
    description,
    datetimeEnd,
    datetimeStart,
    satellites,
    isAll,
    id,
  } = props
  const [formError, setFormError] = useState<string>('')

  const { updateTask } = useService()
  const queryClient = useQueryClient()

  const { mutateAsync: updTask, isPending } = useMutation({
    mutationKey: ['update-task'],
    mutationFn: (values: UpdateTaskRequest) => updateTask(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const initialValues: UpdateTaskRequest = {
    id: id as string,
    name: name,
    description: description,
    datetimeStart: datetimeStart,
    datetimeEnd: datetimeEnd,
    isAll: isAll,
    satellites: satellites ?? [],
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Обязательное поле для заполнения').trim(),

    description: Yup.string()
      .required('Обязательное поле для заполнения')
      .trim(),

    datetimeStart: Yup.string()
      .required('Обязательное поле для заполнения')
      .test('valid-start', 'Неверный формат даты', (value) =>
        value ? dayjs(value).isValid() : false,
      )
      .test('future-date', 'Дата начала не может быть в прошлом', (value) =>
        value ? dayjs(value).isAfter(dayjs()) : false,
      ),

    datetimeEnd: Yup.string()
      .required('Обязательное поле для заполнения')
      .test('valid-end', 'Неверный формат даты', (value) =>
        value ? dayjs(value).isValid() : false,
      )
      .test(
        'after-start',
        'Дата окончания должна быть после начала',
        function (value) {
          const startDate = this.parent.datetimeStart
          return dayjs(value).isAfter(startDate)
        },
      ),

    isAll: Yup.boolean(),
    satellites: Yup.array().when('isAll', (isAll, schema) =>
      isAll
        ? schema.notRequired()
        : schema
            .min(1, 'Выберите хотя бы один спутник')
            .required('Обязательное поле'),
    ),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        values.datetimeStart = dateFormatter(values.datetimeStart)
        values.datetimeEnd = dateFormatter(values.datetimeEnd)
        await updTask(values)
      } catch (error: any) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setFormError('Неверные данные')
              break
            case 401:
              setFormError('Пользователь не авторизован')
              break
            case 500:
              setFormError('Внутренняя ошибка сервера.')
              break
            default:
              setFormError('Произошла неизвестная ошибка.')
          }
        } else {
          setFormError('Ошибка сети или сервер не отвечает.')
        }
      }
    },
    enableReinitialize: true,
  })

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Создание новой задачи</DialogTitle>

        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            {/* Общая ошибка формы */}
            {formError && (
              <FormHelperText error sx={{ textAlign: 'center', fontSize: 16 }}>
                {formError}
              </FormHelperText>
            )}

            {/* Название задачи */}
            <TextField
              fullWidth
              label='Название задачи'
              name='name'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            {/* Описание задачи */}
            <TextField
              fullWidth
              multiline
              rows={3}
              label='Описание задачи'
              name='description'
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale='ru'
              localeText={
                ruRU.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DateTimePicker
                label='Дата начала'
                value={dayjs(formik.values.datetimeStart)}
                onChange={(newValue) =>
                  formik.setFieldValue('datetimeStart', newValue?.toISOString())
                }
                format='DD.MM.YYYY HH:mm'
                ampm={false}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.datetimeStart &&
                      Boolean(formik.errors.datetimeStart),
                    helperText:
                      formik.touched.datetimeStart &&
                      formik.errors.datetimeStart,
                    fullWidth: true,
                  },
                  inputAdornment: {
                    position: 'end',
                  },
                }}
              />

              <DateTimePicker
                label='Дата окончания'
                value={dayjs(formik.values.datetimeEnd)}
                onChange={(newValue) =>
                  formik.setFieldValue('datetimeEnd', newValue?.toISOString())
                }
                format='DD.MM.YYYY HH:mm'
                ampm={false}
                slotProps={{
                  textField: {
                    error:
                      formik.touched.datetimeEnd &&
                      Boolean(formik.errors.datetimeEnd),
                    helperText:
                      formik.touched.datetimeEnd && formik.errors.datetimeEnd,
                    fullWidth: true,
                  },
                  inputAdornment: {
                    position: 'end',
                  },
                }}
              />
            </LocalizationProvider>

            {/* Чекбокс "Все спутники" */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isAll}
                  onChange={(e) => {
                    formik.setFieldValue('isAll', e.target.checked)
                    if (e.target.checked) formik.setFieldValue('satellites', [])
                  }}
                  name='isAll'
                />
              }
              label='Выбрать все спутники'
            />

            {!formik.values.isAll && (
              <Autocomplete
                multiple
                options={[
                  'Спутник 1',
                  'Спутник 2',
                  'Спутник бесконечность',
                  'Во мрачной тьме далекого будущего нет ничего кроме спутников',
                ]} // Здесь должны быть доступные спутники
                value={formik.values.satellites}
                onChange={(_, newValue) =>
                  formik.setFieldValue('satellites', newValue)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label='Выберите спутники'
                    error={
                      formik.touched.satellites &&
                      Boolean(formik.errors.satellites)
                    }
                    helperText={
                      formik.touched.satellites && formik.errors.satellites
                    }
                  />
                )}
              />
            )}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              onClose()
              formik.resetForm()
            }}
            color='error'
          >
            Отмена
          </Button>

          <Button
            type='submit'
            variant='contained'
            disabled={isPending}
            startIcon={isPending && <CircularProgress size={20} />}
          >
            {isPending ? 'Создание...' : 'Создать задачу'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
})

export default TaskUpdateDialog
