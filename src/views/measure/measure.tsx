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

import { getMeasures } from "@utils/requests/requests";
import { useQuery } from "react-query";
import { Measure as MeasureType } from "@utils/types/types";
import { freqRange, timeRange } from "@utils/graphUtils";

const Measure = () => {
  enum visualizationType {
    power,
    spectrum,
    rinex,
  }

  const [openFilter, setOpenFilter] = useState(false);
  const [openGraph, setOpenGraph] = useState(false);
  const [graphData, setGraphData] = useState<MeasureType | null>(null);

  const measures = useQuery("getMeasures", getMeasures);

  const [spectrumGraphData, setSpectrumGraphData] =
    useState<linearChartInterface>({
      title: "Спектр сигнала",
      xData: [],
      xLabel: "Спектр сигнала",
      yData: [],
      yLabel: "Амплитуда",
    });
  const [powerGraphData, setPowerGraphData] = useState<linearChartInterface>({
    title: "Мощность сигнала",
    xData: [],
    xLabel: "Время",
    yData: [],
    yLabel: "Мощность",
  });

  useEffect(() => {
    // console.log("use effect", graphData);
    if (!!graphData) {
      setSpectrumGraphData({
        title: "Спектр сигнала",
        // xData: [],
        xData: freqRange(graphData?.spectrum?.StartFreq, graphData?.spectrum?.FreqStep, graphData?.spectrum?.spectrum?.length) || [],
        xLabel: "Частота [Гц]",
        yData: graphData?.spectrum?.spectrum || [],
        yLabel: "Амплитуда",
      });

      setPowerGraphData({
        title: "Мощность сигнала",
        // xData: [],
        xData:  timeRange(graphData?.power?.startTime, graphData?.power?.timeStep, graphData?.power?.power?.length) || [],
        xLabel: "Время",
        yData: graphData?.power?.power || [],
        yLabel: "Мощность",
      });
    }
  }, [graphData]);

  // console.log("powerGraphData",powerGraphData);
  // console.log("spectrumGraphData",spectrumGraphData);
  // console.log("graphData",graphData);

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
      // console.log(queryParams);
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
              <Typography
                variant="h3"
                sx={{ width: "100%", textAlign: "center" }}
              >
                Графики
              </Typography>
              {spectrumGraphData?.yData?.length == 0 && powerGraphData?.yData?.length == 0 &&  (
                <Typography variant="body1">Добавьте измерения, нажав на кнопку "Исследовать" на карточке измерения</Typography>
              )}

              {false &&
                <RinexTable />}

              {spectrumGraphData?.yData?.length !== 0 && (
                <LinearChart {...spectrumGraphData} />
              )}
              {powerGraphData?.yData?.length !== 0 && (
                <LinearChart {...powerGraphData} />
              )}
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
            {measures?.data?.length
              ? measures.data.map((item) => (
                  <CardMeasure
                    key={item.id}
                    measure={item}
                    setGraphData={setGraphData}
                  />
                ))
              : "Измерения не загрузились"}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Measure;
