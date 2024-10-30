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
import { ChangeEvent, FC } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import filters from "./measureFilter.types";

// todo
// сделать чтобы параметры поиска были сохранны и при перезагрузке страницы они были восстановлены
// а также отображались в URL для передачи параметров поиска

interface MeasureFilterProps{
  filters: filters;
  setFilters: (filters: filters) => void;
}

const MeasureFilter: FC<MeasureFilterProps> = ({filters, setFilters}) => {
  const timeChange = (event: Event, newValue: number | number[]) => {
    setFilters({
      ...filters,
      timeRange: newValue as number[],
    });
  };

  const filterChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "GPS":
        setFilters({
          ...filters,
          satelliteType: {
            ...filters.satelliteType,
            GPS: event.target.checked,
          },
        });
        break;
      case "Glonass":
        setFilters({
          ...filters,
          satelliteType: {
            ...filters.satelliteType,
            Glonass: event.target.checked,
          },
        });
        break;
      case "Galileo":
        setFilters({
          ...filters,
          satelliteType: {
            ...filters.satelliteType,
            Galileo: event.target.checked,
          },
        });
        break;
      case "Baidou":
        setFilters({
          ...filters,
          satelliteType: {
            ...filters.satelliteType,
            Baidou: event.target.checked,
          },
        });
        break;
      case "L1":
        setFilters({
          ...filters,
          signalType: {
            ...filters.signalType,
            L1: event.target.checked,
          },
        });
        break;
      case "L2":
        setFilters({
          ...filters,
          signalType: {
            ...filters.signalType,
            L2: event.target.checked,
          },
        });
        break;
      case "L3":
        setFilters({
          ...filters,
          signalType: {
            ...filters.signalType,
            L3: event.target.checked,
          },
        });
        break;
      default:
        console.log("error");
    }
  };

  return (
    <>
      <Typography align="center" variant="h3">
        Фильтры
      </Typography>
      <FormControl component="fieldset" sx={{padding: "20px" , display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <FormLabel sx={{ margin: "20px 0" }} component="legend">Тип спутниковой группировки:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                name="GPS"
                onChange={filterChange}
                checked={filters.satelliteType.GPS}
              />
            }
            label="GPS"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Glonass"
                onChange={filterChange}
                checked={filters.satelliteType.Glonass}
              />
            }
            label="Glonass"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Galileo"
                onChange={filterChange}
                checked={filters.satelliteType.Galileo}
              />
            }
            label="Galileo"
            disabled
          />
          <FormControlLabel
            control={
              <Checkbox
                name="Beidou"
                onChange={filterChange}
                checked={filters.satelliteType.Baidou}
              />
            }
            label="Beidou"
            disabled
          />
        </FormGroup >
        <FormHelperText></FormHelperText>
        <FormLabel sx={{ margin: "20px 0" }} component="legend">Диапазон сигнала:</FormLabel>
        <FormGroup sx={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="L1"
                onChange={filterChange}
                checked={filters.signalType.L1}
              />
            }
            label="L1"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="L2"
                onChange={filterChange}
                checked={filters.signalType.L2}
              />
            }
            label="L2"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="L3"
                onChange={filterChange}
                checked={filters.signalType.L3}
              />
            }
            label="L3"
            disabled
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
        <FormLabel sx={{ margin: "20px 0" }}  component="legend">Время и дата записи:</FormLabel>
        <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 3}}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              name="startData"
              label="Дата начала поиска записи"
              value={filters.startData}
              onChange={(newData) => {
                setFilters({
                  ...filters,
                  startData: newData,
                });
              }}
            />
            <DatePicker
              name="endData"
              label="Дата окончания поиска записи"
              value={filters.endData}
              onChange={(newData) => {
                setFilters({
                  ...filters,
                  endData: newData,
                });
              }}
            />
          </LocalizationProvider>
          <Slider
            name="time"
            getAriaLabel={() => "Интервал времени записи"}
            value={filters.timeRange}
            onChange={timeChange}
            valueLabelDisplay="auto"
            min={0}
            max={24}
            step={1}
          />
        </FormGroup>
        <FormHelperText></FormHelperText>
        <Typography variant="body1" color="initial">Время поиска записи с {filters.timeRange[0]} часов по {filters.timeRange[1]} часов</Typography>
      </FormControl>
    </>
  );
};

export default MeasureFilter;
