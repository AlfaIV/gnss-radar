import { useState, FC } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  CircularProgress,
} from '@mui/material'
import { Form, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { AxiosError } from 'axios'

import {
  SignUpFormType,
  SignUpRequestType,
} from '~/shared/typings/auth/authTypings'
import {
  ROLE_ADMIN,
  ROLE_SUPERVISOR,
  ROLE_USER,
  ROUTES,
} from '~/shared/config/constants'
import useService from '~/entities/useService'
import { UserRoleType } from '~/shared/typings/user/userTypings'

const SignUpForm: FC = () => {
  const navigate = useNavigate()

  const { signUp } = useService()

  const [formError, setFormError] = useState('')

  const { mutateAsync: register, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (values: SignUpRequestType) => signUp(values),
    onSuccess: () => {
      navigate(ROUTES.LOGIN)
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            setFormError('Неверные учетные данные.')
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
    role: ROLE_USER.value as UserRoleType,
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        'Пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы латинского алфавита, цифру и опционально специальные символы @$!%*#?&',
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
    onSubmit: async (values) => {
      const signUpRequestValue: SignUpRequestType = {
        login: values.login ?? '',
        email: values.email ?? '',
        name: values.name ?? '',
        surname: values.surname ?? '',
        organizationName: values.company ?? '',
        password: values.password ?? '',
        role: values.role ?? '',
      }
      await register(signUpRequestValue)
    },
    enableReinitialize: true,
  })

  return (
    <Container
      component='main'
      maxWidth='md'
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
      <Typography
        variant='body1'
        component='p'
        color='initial'
        textAlign='center'
      >
        Регистрация в информационной системе комплекса мониторинга ГНСС сигналов
      </Typography>
      <Form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
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
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
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
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
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
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin='normal'
                label='Пароль'
                id='password'
                name='password'
                type='password'
                value={formik.values.password || ''}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>

          <Grid item container spacing={3}>
            <Grid item xs={6}>
              <InputLabel id='select-role-label'>Выберите роль</InputLabel>
              <Select
                fullWidth
                labelId='select-role-label'
                id='role'
                name='role'
                value={formik.values.role}
                label='Выберите роль'
                onChange={formik.handleChange}
              >
                <MenuItem value={ROLE_USER.value}>{ROLE_USER.label}</MenuItem>
                <MenuItem value={ROLE_SUPERVISOR.value}>
                  {ROLE_SUPERVISOR.label}
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                margin='normal'
                label='Повторите пароль'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                value={formik.values.confirmPassword || ''}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>
          </Grid>
        </Grid>

        {!!formError && (
          <Typography color='error' variant='body2' sx={{ mt: 2 }}>
            {formError}
          </Typography>
        )}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              sx={{ py: 2 }}
              disabled={isPending}
            >
              {isPending ? <CircularProgress /> : 'Зарегистрироваться'}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant='outlined'
              color='primary'
              onClick={() => navigate(ROUTES.LOGIN)}
              sx={{ py: 2 }}
            >
              Войти
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Container>
  )
}

export default SignUpForm
