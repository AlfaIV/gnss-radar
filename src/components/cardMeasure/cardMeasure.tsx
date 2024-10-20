import style from "./cardMeasure.module.scss";

const CardMeasure = () => {
  return (
    <div className={style.cardMeasure}>
      <h1 className={style.cardMeasure__text}>Наблюдение №1</h1>
      <p className={style.cardMeasure__text}>Цель: GLN1</p>
      <p className={style.cardMeasure__text}>15.12.2023 15:00</p>
      <p className={style.cardMeasure__text}>15.12.2023 18:00</p>
    </div>
  );
};

export default CardMeasure;
