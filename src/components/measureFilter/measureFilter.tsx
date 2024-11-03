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
import { useState, ChangeEvent, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment, { Moment } from "moment";
import { debounce } from "lodash";

// todo
// сделать чтобы параметры поиска были сохранны и при перезагрузке страницы они были восстановлены
// а также отображались в URL для передачи параметров поиска

const MeasureFilter = () => {
  const timeChange = (event: Event, newValue: number | number[]) => {
    setFilters({
      ...filters,
      timeRange: newValue as number[],
    });
  };

  interface filters {
    satelliteType: {
      GPS: boolean;
      Glonass: boolean;
      Galileo: boolean;
      Baidou: boolean;
    };
    signalType: {
      L1: boolean;
      L2: boolean;
      L3: boolean;
    };
    startData: Moment | null;
    endData: Moment | null;
    timeRange: number[];
  }

  const [filters, setFilters] = useState<filters>({
    satelliteType: {
      GPS: true,
      Glonass: true,
      Galileo: false,
      Baidou: false,
    },
    signalType: {
      L1: true,
      L2: true,
      L3: false,
    },
    startData: moment().subtract(1, "days"),
    endData: moment(),
    timeRange: [0, 24],
  });

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

  useEffect(() => {
    const debouncedHandleChange = debounce((queryParams: filters) => {
      console.log(queryParams);
    }, 1000);
    debouncedHandleChange(filters);
  }, [filters]);


  return (
    <>
      <Typography align="center" variant="h3">
        Фильтры
      </Typography>
      <FormControl component="fieldset">
        <FormLabel component="legend">Тип спутниковой группировки:</FormLabel>
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
        </FormGroup>
        <FormHelperText></FormHelperText>
        <FormLabel component="legend">Диапазон сигнала:</FormLabel>
        <FormGroup>
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
        <FormLabel component="legend">Время и дата записи:</FormLabel>
        <FormGroup>
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
      </FormControl>
    </>
  );
};

export default MeasureFilter;
