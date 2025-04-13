import React, { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Container, Box, TextField, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import useService from '~/entities/useService'
import {
  LoginFormType,
  LoginRequestType,
} from '~/shared/typings/auth/authTypings'
import useUserStore from '~/entities/store/UserStore/useUserStore'
import { UserType } from '~/shared/typings/user/userTypings'
import { ROUTES } from '~/shared/config/constants'

const LoginForm = () => {
  const queryClient = useQueryClient()
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Пароль должен быть не менее 8 символов, содержать заглавные и строчные буквы, цифру и специальный символ @$!%*#?&',
      )
      .nullable(),
  })

  const logInMutation = useMutation('updateDevice', login, {
    onSuccess: () => {
      queryClient.invalidateQueries('authCheck')
    },
  })

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setFieldError }) => {
      try {
        const response = await logInMutation.mutateAsync(
          values as LoginRequestType,
        )
        setUser(response.data as UserType)
        navigate(ROUTES.STATE)
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
        >
          Войти
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
