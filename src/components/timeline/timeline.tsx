import { FC } from "react";
import Chart from "react-apexcharts";

interface TimelineData {
  x: string;
  y: [number, number];
}

const TimelineChart: FC = () => {
  const series = [
    {
      data: [
        {
          x: "Проект A",
          y: [
            new Date("2024-01-01T12:00:00").getTime(),
            new Date("2024-01-10").getTime(),
          ],
        },
        {
          x: "Проект B",
          y: [
            new Date("2024-01-05").getTime(),
            new Date("2024-01-15").getTime(),
          ],
        },
        {
          x: "Проект C",
          y: [
            new Date("2024-01-12").getTime(),
            new Date("2024-01-20").getTime(),
          ],
        },
      ] as TimelineData[],
    },
  ];

  const options = {
    chart: {
      type: "rangeBar",
      height: 100,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        rangeBarGroupRows: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false,
        },
      },
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: function (value: number) {
          return new Date(value).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: '2-digit',
            // minute: '2-digit',
          });
        },
      },
      title: {
        text: "Дата",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: undefined,
        },
      },
    },
    title: {
      text: "Временная шкала задач",
      align: "left",
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="rangeBar" height={300} />
    </div>
  );
};

export default TimelineChart;
