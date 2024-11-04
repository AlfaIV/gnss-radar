import { useState, FormEvent } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import grqlFetch from "../../utils/grql";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const FILMS_QUERY = `
    mutation Authorization {
      authorization {
          signin(input: { login: "${username}", password:"${password}" }) {
              userInfo
          }
      }
    }
`;

  const postData = async () => {
    return grqlFetch(FILMS_QUERY);
  };

  const mutation = useMutation(postData, {
    onSuccess: (data) => {
      console.log("Данные успешно отправлены:", data);
      setErrorMsg("");
      // navigate("/state/");
    },
    onError: (error) => {
      console.error("Ошибка при отправке данных:", error);
      setErrorMsg(`Ошибка при отправке данных: ${error}`);
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("FILMS_QUERY:", FILMS_QUERY);
    mutation.mutate();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h2">
          Авторизация
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Имя пользователя"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Войти
          </Button>
          <Typography component="p" variant="body1" color="error">
            {errorMsg}
          </Typography>
        </Box>
        <Typography
          component="p"
          variant="body1"
          sx={{ borderTop: 3, pt: 3, mt: 3 }}
        >
          У Вас нет доступа к системе? Пройдите регистрацию и дождитесь
          подтверждения администрацией комплекса.
        </Typography>
        {/* <Link to={`/signin/`}> */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/signup/")}
        >
          Регистрация
        </Button>
        {/* </Link> */}
      </Box>
    </Container>
  );
};

export default Login;
