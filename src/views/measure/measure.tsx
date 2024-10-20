import style from "./measure.module.scss";
import CardMeasure from "@components/cardMeasure/cardMeasure";

const Measure = () => {
  return (
    <div className={style.measure}>
      <div className={style.filters}>
        <h1>Фильтры</h1>
        {/* <h2>Тип спутниковой группировки:</h2>
        <h2>Диапазон сигнала:</h2>
        <h2>Время и дата записи:</h2> */}
      </div>
      <div className={style.log}>
        <h1 className={style.log__heasder}>Записи</h1>
        <CardMeasure/>
        <CardMeasure/>
        <CardMeasure/>
        <CardMeasure/>
        <CardMeasure/>
      </div>
      <div className={style.plots}>
        <h1>Графики</h1>
      </div>
    </div>
  );
};

export default Measure;
