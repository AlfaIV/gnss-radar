import {
  Paper,
  Typography,
  Stack,
  Container,
  Select,
  MenuItem,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";

// import { useState } from "react";

const Setting = () => {
  // const [token, setToken] = useState("ВашТокен12345");
  // const [openSnackbar, setOpenSnackbar] = useState(false);

  // const handleCopy = () => {
  //   navigator.clipboard
  //     .writeText(token)
  //     .then(() => {
  //       setOpenSnackbar(true);
  //     })
  //     .catch((err) => {
  //       console.error("Ошибка копирования: ", err);
  //     });
  // };

  // const handleCloseSnackbar = () => {
  //   setOpenSnackbar(false);
  // };

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ mt: 5, md: 5, padding: "20px 10px" }}>
        <Typography variant="h3" color="initial">
          Настройки аппаратных комплексов
        </Typography>
        <Stack direction="row" spacing={2} margin={4}>
          <Select
            // value={age}
            // label="Age"
            // onChange={handleChange}
            autoWidth={true}
            sx={{ minWidth: 300 }}
          >
            <MenuItem value={10}>Устройство 1</MenuItem>
            <MenuItem value={20}>Устройство 2</MenuItem>
          </Select>
          <Button variant="outlined">Добавить устройство</Button>
        </Stack>
        <Box sx={{ padding: "20px" }}>
          <Stack spacing={4}>
            <Typography variant="body1">
              В данном разделе можно редактировать параметры уже ранее
              добавленных устройств или добавлять новые для хранения данных с
              них.
            </Typography>
            <TextField label="Название устройства" variant="outlined" />
            <TextField variant="outlined" label="Точка стояния" />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Токен"
                variant="outlined"
                // value={token}
                sx={{ width: "500px" }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                variant="contained"
                //  onClick={handleCopy}
              >
                Скопировать
              </Button>
              <Snackbar
                // open={openSnackbar}
                autoHideDuration={3000}
                // onClose={handleCloseSnackbar}
              >
                <Alert
                  // onClose={handleCloseSnackbar}
                  severity="success"
                >
                  Токен скопирован в буфер обмена!
                </Alert>
              </Snackbar>
            </Stack>
            <TextField
              label="Описание устройства"
              variant="outlined"
              multiline
              rows={4}
            />
            <Stack direction={"row"} spacing={2}>
              <Button variant="contained" sx={{ width: "150px" }}>
                Сохраинить
              </Button>
              <Button variant="outlined" sx={{ width: "150px" }}>
                Отменить
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Setting;
