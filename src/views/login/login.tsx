import { useState, FormEvent } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

import { login } from "@utils/requests/requests";
import { User } from "@utils/types/types";
import { set } from "lodash";

const Login = () => {
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const logInMutation = useMutation("updateDevice", login, {
    onSuccess: () => {
      queryClient.invalidateQueries("authCheck");
      navigate("/measure/");
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    logInMutation.mutate(user);
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
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Пароль"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
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
          <Typography component="p" variant="body1" color="error"></Typography>
        </Box>
        <Typography
          component="p"
          variant="body1"
          sx={{ borderTop: 3, pt: 3, mt: 3 }}
        >
          У Вас нет доступа к системе? Пройдите регистрацию и дождитесь
          подтверждения администрацией комплекса.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/signup/")}
        >
          Регистрация
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
