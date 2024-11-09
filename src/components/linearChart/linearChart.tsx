import { FC } from 'react';
import Chart from 'react-apexcharts';
import { linearChartInterface } from "@components/linearChart/linearChart.interface";

const LinearChart: FC<linearChartInterface> = ({ title, xData, xLabel, yData, yLabel }) => {

  const plotConfig = {
    series: [
      {
        name: title,
        data: xData,
      }
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: title,
        align: 'center',
      },
      xaxis: {
        // categories: yData.map((element) => `${element} Гц`),
        title: {
          text: xLabel,
        }
      },
      yaxis: {
        title: {
          text: yLabel,
        }
      },
      tooltip: {
        shared: true,
        intersect: false,
      }
    }
  };

  return (
    <div>
      <Chart options={plotConfig.options} series={plotConfig.series} type="line" height={350} />
    </div>
  );
};

export default LinearChart;