import style from "./measure.module.scss";
import "./measure.module.scss";
import CardMeasure from "@components/cardMeasure/cardMeasure";
import MeasureFilter from "@components/measureFilter/measureFilter";
import filters from "@components/measureFilter/measureFilter.types";
import moment from "moment";
import { useState, useEffect } from "react";
import { measure } from "@views/measure/data";
import { debounce } from "lodash";
import TuneIcon from "@mui/icons-material/Tune";
import TimelineIcon from "@mui/icons-material/Timeline";
import {
  Stack,
  IconButton,
  Typography,
  Grid,
  Box,
  MenuItem,
  Select,
} from "@mui/material";

import LinearChart from "@components/linearChart/linearChart";
import { linearChartInterface } from "@components/linearChart/linearChart.interface";
import RinexTable from "@components/rinexTable/rinexTable";

const Measure = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  
  enum visualizationType {
    power,
    spectrum,
    rinex,
  }

  const [currentVisualizationType, setCurrentVisualizationType] = useState<visualizationType>(visualizationType.power);

  const queryData:linearChartInterface = {
    title: 'Спектр сигнала',
    xData: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    xLabel: 'Спектр сигнала',
    yData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    yLabel: 'Амплитуда',
  }

  const queryData2:linearChartInterface = {
    title: 'Мощность сигнала',
    xData: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    xLabel: 'Время',
    yData: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    yLabel: 'Мощность',
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

  useEffect(() => {
    const debouncedHandleChange = debounce((queryParams: filters) => {
      console.log(queryParams);
    }, 1000);
    debouncedHandleChange(filters);
  }, [filters]);

  // const { data, isLoading, error } = useQuery(
  //   ['search', searchTerm],
  //   async () => {
  //     if (!searchTerm) return []; // Не выполнять запрос, если нет термина поиска
  //     const response = await client.query({
  //       query: SEARCH_QUERY,
  //       variables: { query: searchTerm },
  //     });
  //     return response.data.search;
  //   },
  //   {
  //     enabled: !!searchTerm, // Запрос выполняется только если searchTerm не пустой
  //     keepPreviousData: true, // Сохраняем предыдущие данные во время загрузки
  //   }
  // );
  return (
    <div className={style.measure}>
      <div className={style.left_menu}>
        <Stack>
          <IconButton
            onClick={() => {
              setOpenFilter(!openFilter);
              setOpenGraph(false);
            }}
            sx={{ backgroundColor: openFilter ? "#A48ECC" : "white" }}
          >
            <TuneIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setOpenGraph(!openGraph);
              setOpenFilter(false);
            }}
            sx={{ backgroundColor: openGraph ? "#A48ECC" : "white" }}
          >
            <TimelineIcon />
          </IconButton>
        </Stack>
      </div>
      <Grid container spacing={2}>
        {openFilter && (
          <Grid item xs={3}>
            <div className={style.filters}>
              <MeasureFilter filters={filters} setFilters={setFilters} />
            </div>
          </Grid>
        )}
        {openGraph && (
          <Grid item xs={6}>
            <div className={style.plots}>
              <Typography variant="h3" sx={{width: "100%", textAlign: "center"}}>Графики</Typography>
              {/* <Select
                value={currentVisualizationType}
                label="Тип информации"
                onChange={(event) => setCurrentVisualizationType(event.target.value as visualizationType)}
                autoWidth
                // defaultValue={visualizationType.power}
                sx={{minWidth: 120, m: 2 }}

              >
                <MenuItem value={visualizationType.spectrum}>Спектр</MenuItem>
                <MenuItem value={visualizationType.power}>Мощность</MenuItem>
                <MenuItem value={visualizationType.rinex}>RINEX</MenuItem>
              </Select> */}


              
              <RinexTable/>
              <LinearChart {...queryData}/>
              <LinearChart {...queryData2}/>
            </div>
          </Grid>
        )}
        <Grid item xs={openFilter ? 9 : openGraph ? 6 : 12}>
          <div className={style.log}>
            <Typography
              variant="h3"
              sx={{ width: "100%", textAlign: "center" }}
            >
              Записи
            </Typography>
            {measure.map((item) => (
              <CardMeasure
                key={item.id}
                id={item.id}
                name={item.name}
                comment={item.comment}
                startData={item.startData}
                startTime={item.startTime}
                endTime={item.endTime}
                endData={item.endData}
                dataLink={item.dataLink}
              ></CardMeasure>
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Measure;
