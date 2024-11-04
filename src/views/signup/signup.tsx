import { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from "@mui/material";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import grqlFetch from "../../utils/grql";

const SignUp = () => {
  interface User {
    surname: string;
    name: string;
    company: string;
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
    services: {
      download: boolean;
      taskCreation: boolean;
      deviseControl: boolean;
    };
  }

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState("");
  const [user, setUser] = useState<User>({
    surname: "",
    name: "",
    company: "",
    login: "",
    email: "",
    password: "",
    confirmPassword: "",
    services: {
      download: false,
      taskCreation: false,
      deviseControl: false,
    },
  });

  const handleSubmit = () => {
    // todo добавить проверки на пустые поля
    console.log("signin");
    mutation.mutate();
  };

  const signUp_query = `
  mutation Authorization {
      authorization {
          signup(input: { login: "${user.login}", password:"${user.password}" }) {
          userInfo
          }
      }
}
`;

  const getGrqlData = async () => {
    return grqlFetch(signUp_query);
  };

  const mutation = useMutation(getGrqlData, {
    onSuccess: (data) => {
      console.log("Данные успешно отправлены:", data);
      setErrorMsg("");
      // navigate("/measure/");
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных:", error);
      setErrorMsg(`Ошибка при отправке данных: ${error}`);
    },
  });

  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        mt: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Typography variant="h3" component="h1" color="initial" sx={{ mb: 2 }}>
        Регистрация
      </Typography>
      <Typography variant="body1" component="p" color="initial">
        Регистрация в информационной системе комплекса мониторинга ГНСС сигналов
      </Typography>
      <FormGroup sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          label="Фамилия пользователя"
          value={user.surname}
          onChange={(e) => setUser({ ...user, surname: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Имя пользователя"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Название организации или отдела"
          value={user.company}
          onChange={(e) => setUser({ ...user, company: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Логин"
          value={user.login}
          onChange={(e) => setUser({ ...user, login: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Почта"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Пароль"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <TextField
          margin="normal"
          required
          label="Повторите пароль"
          value={user.confirmPassword}
          onChange={(e) =>
            setUser({ ...user, confirmPassword: e.target.value })
          }
        />
        <Typography
          variant="body1"
          component="p"
          color="initial"
          align="center"
          sx={{ m: 2 }}
        >
          Предоставляемые услуги
        </Typography>
        <FormControlLabel
          control={<Switch value={user.services.download} />}
          label="Скачивание данных"
        />
        <FormControlLabel
          control={<Switch value={user.services.taskCreation} />}
          label="Формирование задач"
        />
        <FormControlLabel
          control={<Switch value={user.services.deviseControl} />}
          label="Конфигурирование устройства"
          disabled
        />
        <Typography component="p" variant="body1" color="error">
          {errorMsg}
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSubmit}
        >
          Зарегистрироваться
        </Button>
      </FormGroup>
    </Container>
  );
};

export default SignUp;
