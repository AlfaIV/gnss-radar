import style from "./measure.module.scss";
import "./measure.module.scss";
import CardMeasure from "@components/cardMeasure/cardMeasure";
import MeasureFilter from "@components/measureFilter/measureFilter";
import filters from "@components/measureFilter/measureFilter.types";
import moment from "moment";
import { useState, useEffect } from "react";
import { debounce } from "lodash";
import CardMeasureProps from "@components/cardMeasure/cardMeasure.type";
import {
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  List,
  ListItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

const Measure = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        (event as React.KeyboardEvent).key === "Tab"
      ) {
        return;
      }
      setOpen(open);
    };

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

  const measure: CardMeasureProps[] = [
    {
      id: 1,
      name: "Измерение 1",
      comment: "Первое измерение",
      startData: "2024-01-01",
      startTime: "08:00",
      endTime: "09:00",
      endData: "2024-01-01",
      dataLink: "https://example.com/data1",
    },
    {
      id: 2,
      name: "Измерение 2",
      comment: "Второе измерение",
      startData: "2024-01-02",
      startTime: "09:00",
      endTime: "10:00",
      endData: "2024-01-02",
      dataLink: "https://example.com/data2",
    },
    {
      id: 3,
      name: "Измерение 3",
      comment: "Третье измерение",
      startData: "2024-01-03",
      startTime: "10:00",
      endTime: "11:00",
      endData: "2024-01-03",
      dataLink: "https://example.com/data3",
    },
    {
      id: 4,
      name: "Измерение 4",
      comment: "Четвертое измерение",
      startData: "2024-01-04",
      startTime: "11:00",
      endTime: "12:00",
      endData: "2024-01-04",
      dataLink: "https://example.com/data4",
    },
    {
      id: 5,
      name: "Измерение 5",
      comment: "Пятое измерение",
      startData: "2024-01-05",
      startTime: "12:00",
      endTime: "13:00",
      endData: "2024-01-05",
      dataLink: "https://example.com/data5",
    },
  ];

  return (
    <div className={style.measure}>
      <div style={{ display: "flex" }}>
        {/* <AppBar position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Мое Приложение</Typography>
          </Toolbar>
        </AppBar> */}
        {/* <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          variant="persistent" // Используем постоянный вариант
          sx={{
            "& .MuiDrawer-paper": {
              width: 250, // Ширина панели
              height: "100%", // Высота панели
            },
          }}
        >
          <MeasureFilter filters={filters} setFilters={setFilters} />
        </Drawer> */}
        {/* <main style={{ marginLeft: 250, padding: "16px", flexGrow: 1 }}>
          <Typography paragraph>
            Здесь будет основное содержимое вашего приложения.
          </Typography>
        </main> */}
      </div>
      <div className={style.filters}>
        <MeasureFilter filters={filters} setFilters={setFilters} />
      </div>
      <div className={style.log}>
        <h1 className={style.log__heasder}>Записи</h1>
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
      <div className={style.plots}>
        <h1>Графики</h1>
      </div>
    </div>
  );
};

export default Measure;
