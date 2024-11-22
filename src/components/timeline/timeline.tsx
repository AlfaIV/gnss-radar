import { FC } from "react";
import Chart from "react-apexcharts";
import { task } from "@utils/types/types";
import moment from "moment";

const TimelineChart: FC<{ tasks: task[] | undefined }> = ({ tasks }) => {
  const data = {
    series: [
      {
        name: "Задачи",
        data: tasks?.map((task) => ({
          x: task?.targetID,
          y: [task?.startDataTime?.toDate().getTime(), task?.endDataTime?.toDate().getTime()],
        })) || [],
      },
    ],
  };

  console.log(data);

  const options: ApexCharts.ApexOptions = {
    ...data,
    chart: {
      type: "rangeBar",
      height: 300, // Увеличьте высоту для лучшего отображения
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
    xaxis: {
      type: "datetime",
      title: {
        text: "Дата",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
      labels: {
        formatter: (value: string): string => {
          return new Date(value).toLocaleString("ru-RU", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        },
      },
      tickAmount: 5,
    },
    title: {
      text: "Временная шкала задач",
      align: "left",
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
    },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
      x: {
        show: false,
      },
    },
  };

  // const options: ApexCharts.ApexOptions = {
  //   series: [
  //     {
  //       name: "Устройство 1",
  //       data: [
  //         {
  //           x: "G13",
  //           y: [
  //             new Date("2019-03-05T05:00:00").getTime(), // Начало задачи в 5:00
  //             new Date("2019-03-05T09:00:00").getTime(), // Конец задачи в 9:00
  //           ],
  //         },
  //         {
  //           x: "G14",
  //           y: [
  //             new Date("2019-03-05T10:00:00").getTime(), // Начало задачи в 10:00
  //             new Date("2019-03-05T12:00:00").getTime(), // Конец задачи в 12:00
  //           ],
  //         },
  //         {
  //           x: "G5",
  //           y: [
  //             new Date("2019-03-05T13:00:00").getTime(), // Начало задачи в 13:00
  //             new Date("2019-03-05T16:00:00").getTime(), // Конец задачи в 16:00
  //           ],
  //         },
  //       ],
  //     },
  //     // Добавьте другие устройства по аналогии
  //   ],
  //   chart: {
  //     type: "rangeBar",
  //     height: 300, // Увеличьте высоту для лучшего отображения
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: true,
  //       rangeBarGroupRows: true,
  //       distributed: true,
  //       dataLabels: {
  //         hideOverflowingLabels: false,
  //       },
  //     },
  //   },
  //   xaxis: {
  //     type: "datetime",
  //     title: {
  //       text: "Дата",
  //       style: {
  //         fontSize: "14px",
  //         fontWeight: "bold",
  //       },
  //     },
  //     labels: {
  //       formatter: (value: string): string => {
  //         return new Date(value).toLocaleString("ru-RU", {
  //           year: "numeric",
  //           month: "numeric",
  //           day: "numeric",
  //           hour: "2-digit",
  //           minute: "2-digit",
  //         });
  //       },
  //     },
  //     tickAmount: 5,
  //   },
  //   title: {
  //     text: "Временная шкала задач",
  //     align: "left",
  //   },
  //   legend: {
  //     show: true,
  //     position: "top",
  //     horizontalAlign: "left",
  //   },
  //   tooltip: {
  //     enabled: false,
  //     shared: true,
  //     intersect: false,
  //     x: {
  //       show: false,
  //     },
  //   },
  // };

  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type={"rangeBar"}
        height={400}
      />
    </div>
  );
};

export default TimelineChart;
