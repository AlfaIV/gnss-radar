import style from "./measure.module.scss";
import CardMeasure from "@components/cardMeasure/cardMeasure";
import {
  Typography,
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@mui/material";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const Measure = () => {
  function valuetext(value: number) {
    return `${value} часов`;
  }
  const [value, setValue] = useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <div className={style.measure}>
      <div className={style.filters}>
        <Typography align="center" variant="h3" className={style.filters__title}>
          Фильтры
        </Typography>
        <FormControl component="fieldset" className={style.filters__group}>
          <FormLabel component="legend" className={style.filters__group__header}>Тип спутниковой группировки:</FormLabel>
          <FormGroup>
            <FormControlLabel className={style.filters__group__item} control={<Checkbox />} label="GPS" />
            <FormControlLabel className={style.filters__group__item} control={<Checkbox />} label="Glonass" />
            <FormControlLabel className={style.filters__group__item} disabled control={<Checkbox />} label="Galileo" />
            <FormControlLabel className={style.filters__group__item} disabled control={<Checkbox />} label="Beidou" />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Диапазон сигнала:</FormLabel>
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="L1" />
            <FormControlLabel control={<Checkbox />} label="L2" />
            <FormControlLabel disabled control={<Checkbox />} label="L3" />
          </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Время и дата записи:</FormLabel>
          <FormGroup>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                label="Дата записи"
                // value={value}
                // onChange={(newValue) => setValue(newValue)}
              />
            </LocalizationProvider>
            <Slider
              getAriaLabel={() => "Время записи"}
              value={value}
              onChange={handleChange}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              min={0}
              max={24}
              step={1}
            />
            </FormGroup>
          <FormHelperText></FormHelperText>
        </FormControl>
      </div>
      <div className={style.log}>
        <h1 className={style.log__heasder}>Записи</h1>
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
      </div>
      <div className={style.plots}>
        <h1>Графики</h1>
      </div>
    </div>
  );
};

export default Measure;
