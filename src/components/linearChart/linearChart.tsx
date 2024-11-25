import { FC } from "react";
import Chart from "react-apexcharts";
import { linearChartInterface } from "@components/linearChart/linearChart.interface";

const LinearChart: FC<linearChartInterface> = ({
  title,
  xData,
  xLabel,
  yData,
  yLabel,
}) => {
  const plotConfig: ApexCharts.ApexOptions = {
    series: [
      {
        name: title,
        data: yData,
      },
    ],

    chart: {
      height: 350,
      type: "line",
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: title,
      align: "center",
    },
    xaxis: {
      categories: xData,
      title: {
        text: xLabel,
      },
    },
    yaxis: {
      title: {
        text: yLabel,
      },
      labels: {
        formatter: (value) => {
          return value.toFixed(2); // Ограничиваем до 2 знаков после запятой
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  return <Chart options={plotConfig} series={plotConfig.series} height={350} />;
};

export default LinearChart;
