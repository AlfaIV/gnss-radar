import style from "./measure.module.scss";
import "./measure.module.scss";
import CardMeasure from "@components/cardMeasure/cardMeasure";
import MeasureFilter from "@components/measureFilter/measureFilter";


const Measure = () => {
  return (
    <div className={style.measure}>
      <div className={style.filters}>
        <MeasureFilter />
      </div>
      <div className={style.log}>
        <h1 className={style.log__heasder}>Записи</h1>
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
        <CardMeasure />
      </div>
      <div className={style.plots}>
        <h1>Графики</h1>
      </div>
    </div>
  );
};

export default Measure;
