import style from "./radar.module.scss";
import Plot from "react-plotly.js";
import {Button} from "@mui/material";
import plotConfig from "./plot.config";
import TableSatellite from "@components/table/table";

const Radar = () => {
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Проверить
        </Button>
        <div className={style.radar__table__task}>
          <p>Выполняется задание:</p>
          <div className={style.radar__table__task_p}>
            <p>Спутник: </p>
            <p>Начало записи: </p>
            <p>Окончание записи: </p>
          </div>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Проверить задание
        </Button>
        </div>
        <TableSatellite />
      </div>  
    </div>
  );
};
export default Radar;

