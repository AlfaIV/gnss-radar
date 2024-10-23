import style from "./radar.module.scss";
import { useState } from "react";
import Plot from "react-plotly.js";
import Button from "@components/button/button";
import plotConfig from "./plot.config";
import TableSatellite from "@components/table/table";

const Radar = () => {
  const [state, setState] = useState({
    taskNumber: "",
    value2: "",
    value3: "",
  });

  return (
    <div className={style.radar}>
      <div className={style.radar__plot}>
        <Plot data={plotConfig.data} layout={plotConfig.layout} />
      </div>
      <div className={style.radar__table}>
        <div className={style.radar__table__status}>
          <p>Статус калибровки:</p>
          <div>Калиброван</div>
        </div>
        <Button text="Проверить" />
        <div className={style.radar__table__task}>
          <p>Выполняется задание:</p>
          <div className={style.radar__table__task_p}>
            <p>Спутник: </p>
            <p>Начало записи: </p>
            <p>Окончание записи: </p>
          </div>
          <Button text="Прервать задание" />
        </div>
        <TableSatellite />
      </div>  
    </div>
  );
};
export default Radar;

