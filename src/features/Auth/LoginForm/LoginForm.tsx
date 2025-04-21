import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import useService from '~/entities/useService'
import {
  LoginFormType,
  LoginRequestType,
} from '~/shared/typings/auth/authTypings'
import useUserStore from '~/entities/store/UserStore/useUserStore'
import { UserType } from '~/shared/typings/user/userTypings'
import { ROUTES } from '~/shared/config/constants'

const LoginForm = () => {
  const { login } = useService()

  const navigate = useNavigate()

  const [formError, setFormError] = useState<string>('')

  const initialValues: LoginFormType = { login: null, password: null }

  const [setUser] = useUserStore((state: UserType) => [state.setUser])

  const validationSchema = Yup.object({
    login: Yup.string()
      .required('Обязательное поле')
      .min(6, 'Минимальная длина логина 6 символов')
      .nullable(),
    password: Yup.string()
      .min(8, 'Пароль должен содержать минимум 8 символов')
      .required('Обязательное поле')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
        'Пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы латинского алфавита, цифру и опционально специальный символ @$!%*#?&',
      )
      .nullable(),
  })

  const { mutateAsync: signin, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: (values: LoginFormType) => login(values as LoginRequestType),
    onSuccess: (response) => {
      setUser(response.data as UserType)
      navigate(ROUTES.STATE)
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setFormError('Некорректный запрос')
            break
          case 401:
            setFormError('Неверные учетные данные')
            break
          case 403:
            setFormError('Дождитесь подтверждения администрацией комплекса')
            break
          case 404:
            setFormError('Ресурс не найден')
            break
          case 500:
            setFormError('Внутренняя ошибка сервера')
            break
          default:
            setFormError(
              error.response.data?.message || 'Произошла неизвестная ошибка',
            )
        }
      } else if (error.request) {
        setFormError('Ошибка сети или сервер не отвечает')
      } else {
        setFormError('Произошла ошибка при настройке запроса')
      }
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await signin(values)
    },
    enableReinitialize: true,
  })

  return (
    <Container maxWidth='sm'>
      <Box
        component='form'
        onSubmit={formik.handleSubmit}
        sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Typography variant='h4' component='h1' align='center'>
          Вход в систему
        </Typography>
        <TextField
          fullWidth
          id='login'
          name='login'
          label='Логин'
          value={formik.values.login || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
          variant='outlined'
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='Пароль'
          type='password'
          value={formik.values.password || ''}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant='outlined'
        />
        <Button
          color='primary'
          variant='contained'
          type='submit'
          fullWidth
          sx={{ py: 2 }}
          disabled={isPending}
        >
          {isPending ? <CircularProgress /> : 'Войти'}
        </Button>
        {!!formError && (
          <Typography color='error' variant='body2'>
            {formError}
          </Typography>
        )}
        <Button
          color='primary'
          variant='outlined'
          type='submit'
          fullWidth
          sx={{ py: 2 }}
          onClick={() => navigate(ROUTES.SIGNUP)}
        >
          Регистрация
        </Button>
      </Box>
    </Container>
  )
}

export default LoginForm
