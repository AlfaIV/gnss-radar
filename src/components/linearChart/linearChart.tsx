import { FC } from "react";
import Chart from "react-apexcharts";
import ApexOptions from "react-apexcharts";
import { linearChartInterface } from "@components/linearChart/linearChart.interface";

const LinearChart: FC<linearChartInterface> = ({
  title,
  xData,
  xLabel,
  yData,
  yLabel,
}) => {
  const plotConfig:ApexOptions = {
    series: [
      {
        name: title,
        data: yData,
      },
    ],
    options: {
      chart: {
        type: 'line' as const,
        height: 350,
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
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
    },
  };

  return (
    <Chart
      options={plotConfig.options}
      series={plotConfig.series}
      type="line"
      height={350}
    />
  );
};

export default LinearChart;

