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
  FormControl,
  NativeSelect,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Paper,
} from "@mui/material";

const Task = () => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={0}  sx={{ mt: 10, md: 5, padding: "20px 10px" }}>
        <Typography variant="h3">Планируемые задачи</Typography>
        <Stack spacing={2} direction="row" sx={{ m: 2 }}>
          <Button variant="contained">Создать задачу</Button>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel
            // id="demo-simple-select-autowidth-label"
            >
              Период отслеживани
            </InputLabel>
            <Select
              // labelId="demo-simple-select-autowidth-label"
              // id="demo-simple-select-autowidth"
              // value={age}
              // onChange={handleChange}
              // autoWidth
              label="Период отслеживания"
            >
              <MenuItem value={20}>Сегодня</MenuItem>
              <MenuItem value={21}>Все</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Task;
