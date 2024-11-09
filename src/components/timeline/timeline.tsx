import { FC } from "react";
import Chart from "react-apexcharts";

const TimelineChart: FC = () => {
  const options: ApexCharts.ApexOptions = {
    series: [
      {
        name: 'Устройство 1',
        data: [
          {
            x: 'G13',
            y: [
              new Date('2019-03-05T5:00:00').getTime(),
              new Date('2019-03-05T9:00:00').getTime()
            ]
          },
          {
            x: 'G14',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-09').getTime()
            ]
          },
          {
            x: 'G5',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime()
            ]
          }
        ]
      },
      // {
      //   name: 'Устройство 2',
      //   data: [
      //     {
      //       x: 'G13',
      //       y: [
      //         new Date('2019-03-02').getTime(),
      //         new Date('2019-03-05').getTime()
      //       ]
      //     },
      //     {
      //       x: 'G14',
      //       y: [
      //         new Date('2019-03-06').getTime(),
      //         new Date('2019-03-09').getTime()
      //       ]
      //     },
      //     {
      //       x: 'G2',
      //       y: [
      //         new Date('2019-03-10').getTime(),
      //         new Date('2019-03-19').getTime()
      //       ]
      //     }
      //   ]
      // }
    ],
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
    xaxis: {
      type: 'datetime',
      title: {
        text: "Дата",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
      },
    labels: {
      formatter: (value: string): string => {
        return new Date(value).toLocaleDateString("ru-RU", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "2-digit",
          // minute: "2-digit",
        });
      },
    },
    },
    title: {
      text: "Временная шкала задач",
      align: "left",
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
  };

  
  return (
    <div>
      <Chart options={options} series={options.series} type={'rangeBar'} height={400}/>
    </div>
  );
};

export default TimelineChart;

// const options: ApexCharts.ApexOptions = {
//   series: [
//     {
//       name: 'Bob',
//       data: [
//         {
//           x: 'Design',
//           y: [
//             new Date('2019-03-05').getTime(),
//             new Date('2019-03-08').getTime()
//           ]
//         },
//         {
//           x: 'Code',
//           y: [
//             new Date('2019-03-08').getTime(),
//             new Date('2019-03-11').getTime()
//           ]
//         },
//         {
//           x: 'Test',
//           y: [
//             new Date('2019-03-11').getTime(),
//             new Date('2019-03-16').getTime()
//           ]
//         }
//       ]
//     },
//     {
//       name: 'Joe',
//       data: [
//         {
//           x: 'Design',
//           y: [
//             new Date('2019-03-02').getTime(),
//             new Date('2019-03-05').getTime()
//           ]
//         },
//         {
//           x: 'Code',
//           y: [
//             new Date('2019-03-06').getTime(),
//             new Date('2019-03-09').getTime()
//           ]
//         },
//         {
//           x: 'Test',
//           y: [
//             new Date('2019-03-10').getTime(),
//             new Date('2019-03-19').getTime()
//           ]
//         }
//       ]
//     }
//   ],
//   chart: {
//     type: "rangeBar",
//     height: 300,
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
//   legend: {
//     show: true,
//     showForSingleSeries: true,
//     position: "top",
//     horizontalAlign: "left",
//   },
//   xaxis: {
//     type: "datetime",
//     // labels: {
//     //   formatter: (value: string): string => {
//     //     return new Date(value).toLocaleDateString("ru-RU", {
//     //       year: "numeric",
//     //       month: "numeric",
//     //       day: "numeric",
//     //       hour: "2-digit",
//     //       minute: "2-digit",
//     //     });
//     //   },
//     // },
//     title: {
//       text: "Дата",
//       style: {
//         fontSize: "14px",
//         fontWeight: "bold",
//         color: undefined,
//       },
//     },
//   },
//   title: {
//     text: "Временная шкала задач",
//     align: "left",
//   },
// };