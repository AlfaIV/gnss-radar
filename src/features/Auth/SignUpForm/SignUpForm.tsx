import { useState, FC } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  FormGroup,
  Stack,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'
import * as Yup from 'yup'

import { signup } from '~/utils/requests/requests'
import { Role, SignUpFormType } from '~/shared/typings/auth/authTypings'
import { useFormik } from 'formik'
import { ROUTES } from '~/shared/config/constants'

const SignUpForm: FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [formError, setFormError] = useState('')

  const signUpMutation = useMutation('signUpMutation', signup, {
    onSuccess: () => {
      queryClient.invalidateQueries('signUpCheck')
    },
  })

  const initialValues: SignUpFormType = {
    surname: '',
    name: '',
    company: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: Role.engineer,
  }

  const validationSchema = Yup.object({
    surname: Yup.string().required('Обязательное поле').nullable(),
    name: Yup.string().nullable(),
    company: Yup.string().nullable(),
    login: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Минимальная длина логина 6 символов')
      .nullable(),
    email: Yup.string()
      .required('Обязательное поле')
      .min(3, 'Пароль должен содержать минимум 3 символов')
      .matches(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        'Почта должна содержать символ @',
      )
      .nullable(),
    password: Yup.string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Обязательное поле')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, цифру и специальный символ @$!%*#?&',
      )
      .nullable(),
    confirmPassword: Yup.string()
      .required('Подтверждение пароля обязательно')
      .test(
        'passwords-match',
        'Пароли не совпадают',
        (value, context) => value === context.parent.password,
      ),
    role: Yup.string(),
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        console.log('onSubmit')
        console.log(values)
        // const response = await logInMutation.mutateAsync(values as LoginRequestType);
        // setUser(response as UserType);
      } catch (error: any) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              setFieldError('password', 'Неверные учетные данные.')
              break
            case 403:
              setFieldError(
                'password',
                'Дождитесь подтверждения администрацией комплекса.',
              )
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
    <Container
      component='main'
      maxWidth='sm'
      sx={{
        m: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <Typography
        variant='h3'
        component='h1'
        color='initial'
        sx={{ mb: 2, alignSelf: 'center' }}
      >
        Регистрация
      </Typography>
      <Typography variant='body1' component='p' color='initial'>
        Регистрация в информационной системе комплекса мониторинга ГНСС сигналов
      </Typography>
      <Form onSubmit={formik.handleSubmit}>
        <FormGroup sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            label='Фамилия пользователя'
            id='surname'
            name='surname'
            value={formik.values.surname || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.surname && Boolean(formik.errors.surname)}
            helperText={formik.touched.surname && formik.errors.surname}
          />
          <TextField
            margin='normal'
            label='Имя пользователя'
            id='name'
            name='name'
            value={formik.values.name || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            margin='normal'
            label='Название организации или отдела'
            id='company'
            name='company'
            value={formik.values.company || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.company && Boolean(formik.errors.company)}
            helperText={formik.touched.company && formik.errors.company}
          />
          <TextField
            margin='normal'
            label='Логин'
            id='login'
            name='login'
            value={formik.values.login || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            margin='normal'
            label='Почта'
            id='email'
            name='email'
            value={formik.values.email || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin='normal'
            label='Пароль'
            id='password'
            name='password'
            value={formik.values.password || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            margin='normal'
            label='Повторите пароль'
            id='confirmPassword'
            name='confirmPassword'
            value={formik.values.confirmPassword || ''}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            required
          />
          <InputLabel id='select-role-label'>Выберите роль</InputLabel>
          <Select
            labelId='select-role-label'
            id='role'
            name='role'
            value={formik.values.role}
            label='Выберите роль'
            onChange={formik.handleChange}
            sx={{mb:5}}
          >
            <MenuItem value={Role.customer}>Заказчик</MenuItem>
            <MenuItem value={Role.engineer}>Инженер</MenuItem>
            <MenuItem value={Role.administrator}>Администратор</MenuItem>
          </Select>
          {!!formError && (
            <Typography color='error' variant='body2'>
              {formError}
            </Typography>
          )}
          <Stack spacing={2} direction='row'>
            <Button
              type='submit'
              variant='contained'
              color='primary'
              onClick={() => formik.handleSubmit()}
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Назад
            </Button>
          </Stack>
        </FormGroup>
      </Form>
    </Container>
  )
}

export default SignUpForm
