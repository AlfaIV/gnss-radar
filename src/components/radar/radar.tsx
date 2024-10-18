import style from "./radar.module.scss";
import { useState } from "react"; 
import Plot from "react-plotly.js";
import Button from "@components/button/button";

const Radar = () => {

  const [state, setState] = useState({
    taskNumber: '',
    value2: '',
    value3: '',
  });


  return (
    <div className={style.radar}>
      <div className={style.radar__plot}>
        <Plot
          data={[
            {
              type: "scatterpolar",
              r: [250, 100, 8, 7, 28, 39],
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
          ]}
          layout={{
            title: "ГНСС радар",
            plot_bgcolor: "rgba(255, 255, 255, 0.0)", // Цвет фона графика
            paper_bgcolor: "#A48ECC", // Цвет фона всей области
            width: 600, // Ширина графика
            height: 600, // Высота графика
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
          }}
        />
      </div>
      <div className={style.radar__table}>
        <div className={style.radar__table__status}>
          <p>Статус калибровки:</p>
          <div>Калиброван</div>
        </div>
        <Button text="Проверить"/>
        <div className={style.radar__table__task}>
          <p>Выполняется задание:</p>
          <div className={style.radar__table__task_p}>
            <p>Спутник: </p>
            <p>Начало записи: </p>
            <p>Окончание записи: </p>
          </div>
          <Button text="Прервать задание"/>
        </div>
      </div>
    </div>
  );
};
export default Radar;
