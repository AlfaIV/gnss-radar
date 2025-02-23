import { FC } from 'react'
import Chart from 'react-apexcharts'

import { task } from '~/utils/types/types'

const TimelineChart: FC<{
  tasks: task[] | undefined
  openInfoTask: (task: task) => void
}> = ({ tasks, openInfoTask }) => {
  const data = {
    series: [
      {
        name: 'Запланированные задачи',
        data:
          tasks?.map((task) => ({
            x: task?.targetID,
            y: [
              task?.startDataTime?.toDate().getTime(),
              task?.endDataTime?.toDate().getTime(),
            ],
          })) || [],
      },
    ],
  }

  const options: ApexCharts.ApexOptions = {
    ...data,
    chart: {
      type: 'rangeBar',
      // height: 400,
      events: {
        dataPointSelection: function (event, chartContext, opts) {
          if (tasks) openInfoTask(tasks[opts.dataPointIndex])
        },
      },
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
        text: 'Дата',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
      labels: {
        formatter: (value: string): string => {
          return new Date(value).toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        },
      },
      tickAmount: 5,
    },
    title: {
      text: 'Временная шкала задач',
      align: 'left',
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'left',
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return `Название задачи: ${tasks ? tasks[opts.dataPointIndex].name : 'Нет данных'}`
      },
      style: {
        colors: ['#f3f4f5', '#fff'],
        // colors: ["#000"],
      },
    },
    tooltip: {
      enabled: false,
      shared: true,
      intersect: false,
      x: {
        show: false,
      },
    },
  }

  return (
    <div>
      <Chart
        options={options}
        series={options.series}
        type='rangeBar'
        height={400}
      />
    </div>
  )
}

export default TimelineChart
