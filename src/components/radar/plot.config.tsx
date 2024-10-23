import { PlotParams } from 'react-plotly.js';
import { Data, Layout } from 'plotly.js';

const plotConfig: PlotParams = {
  data: [
    {
      type: "scatterpolar",
      r: [250, 100],
      theta: [0, 340],
      fill: "toself",
      name: "GPS",
      mode: "markers",
      marker: {
        size: 10,
        color: "blue",
      },
    },
    {
      type: "scatterpolar",
      r: [150, 50],
      theta: [90, 180],
      fill: "toself",
      name: "Glonass",
      mode: "markers",
      marker: {
        size: 10,
        color: "red",
      },
    },
  ] as Data[],
  layout: {
    title: "ГНСС радар",
    plot_bgcolor: "rgba(255, 255, 255, 0.0)", // Цвет фона графика
    paper_bgcolor: "#A48ECC", // Цвет фона всей области
    width: 800, // Ширина графика
    height: 800, // Высота графика
    polar: {
      angularaxis: {
        rotation: 90, // Установка угла начала оси (азимута)
        direction: "clockwise", // Направление оси
      },
      radialaxis: {
        visible: true,
        range: [0, 300], // Установка диапазона радиальной оси
      },
    },
    showlegend: true,
  } as Layout,
};

export default plotConfig;

