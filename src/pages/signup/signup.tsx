import { useState, FC } from 'react'
import {
  TextField,
  Button,
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from 'react-query'

import { UserForm } from '~/utils/types/types'
import { signup, login } from '~/utils/requests/requests'

const SignUp: FC = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [errorMsg, setErrorMsg] = useState('')

  const loginMutation = useMutation(login, {
    onSuccess: () => {
      queryClient.invalidateQueries('authCheck')
      navigate('/measure/')
    },
  })
  const signupMutation = useMutation(signup, {
    onSuccess: (data) => {
      // console.log("signupMutation",data);
      if (data === null) {
        setErrorMsg('Ошибка регистрации')
      } else {
        loginMutation.mutate(data)
      }
    },
    onError: () => {
      setErrorMsg('Ошибка регистрации')
    },
  })

  const [user, setUser] = useState<UserForm>({
    surname: '',
    name: '',
    company: '',
    login: '',
    email: '',
    password: '',
    confirmPassword: '',
    services: {
      download: false,
      taskCreation: false,
      deviseControl: false,
    },
  })

  const handleSubmit = () => {
    // todo добавить проверки на пустые поля
    signupMutation.mutate({
      name: user.name,
      surname: user.surname,
      company: user.company,
      email: user.email,
      password: user.password,
      role: 'user',
    })
  }

  return (
    <Container
      component='main'
      maxWidth='sm'
      sx={{
        mt: 8,
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
      <FormGroup sx={{ mt: 1 }}>
        <TextField
          margin='normal'
          required
          label='Фамилия пользователя'
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Имя пользователя'
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Название организации или отдела'
          value={user.company}
          onChange={(e) => setUser({ ...user, company: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Логин'
          value={user.login}
          onChange={(e) => setUser({ ...user, login: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Почта'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Пароль'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <TextField
          margin='normal'
          required
          label='Повторите пароль'
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
        <Typography
          variant='body1'
          component='p'
          color='initial'
          align='center'
          sx={{ m: 2 }}
        >
          Предоставляемые услуги
        </Typography>
        <FormControlLabel
          control={<Switch value={user.services.download} />}
          label='Скачивание данных'
          disabled
        />
        <FormControlLabel
          control={<Switch value={user.services.taskCreation} />}
          label='Формирование задач'
          disabled
        />
        <FormControlLabel
          control={<Switch value={user.services.deviseControl} />}
          label='Конфигурирование устройства'
          disabled
        />
        <Typography component='p' variant='body1' color='error'>
          {errorMsg}
        </Typography>
        <Stack spacing={2} direction='row'>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Зарегистрироваться
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            sx={{ mt: 3, mb: 2 }}
            onClick={() => navigate('/login/')}
          >
            Назад
          </Button>
        </Stack>
      </FormGroup>
    </Container>
  )
}

export default SignUp
