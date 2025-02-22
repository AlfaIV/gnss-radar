import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { FC } from "react";
import CardMeasureProps from "./cardMeasure.type";
import { Measure } from "~/utils/types/types";
import "moment/locale/ru";

import { getGraph } from "~/utils/requests/requests";
import { useMutation } from "react-query";

//toDo подумать как сделать загрузку данных

const CardMeasure: FC<{
  measure: Measure;
  setGraphData: (graphData: Measure | null) => void;
}> = ({ measure, setGraphData }) => {
  const getGraphMutation = useMutation(`getGraph/${measure?.token}`, getGraph, {
    onSuccess: (data) => {
      data[0] ? setGraphData(data[0]) : setGraphData(null);
    },
  });

  const handleDownload = async (jsonData: Record<string, any>) => {
    try {
      // console.log(jsonData);
      const blob = new Blob([JSON.stringify(jsonData)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${measure?.token}-MeasuredData-${measure?.startTime}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Ошибка при загрузке JSON:", error);
    }
  };

  const downloadGraphMutation = useMutation(
    `downloadGraph/${measure?.token}`,
    getGraph,
    {
      onSuccess: (data) => {
        // console.log(!!data[0]);
        !!data[0] && handleDownload(data[0]);
      },
    }
  );

  return (
    <Card sx={{ width: 350, padding: "10px" }}>
      <CardHeader
        title={measure?.token}
        subheader={`Запись наблюдения № ${measure?.token}`}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Начало записи: {measure?.startTime?.format("HH:mm DD.MM.YYYY")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Окончание записи: {measure?.endTime?.format("HH:mm DD.MM.YYYY")}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Цель: {measure?.target}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => {
            console.log("downloadGraphMutation", measure?.id);
            downloadGraphMutation.mutate(measure?.id);
          }}
          size="small"
          variant="contained"
        >
          Скачать
        </Button>
        <Button
          onClick={() => getGraphMutation.mutate(measure?.id)}
          size="small"
          variant="contained"
        >
          Исследовать
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardMeasure;
