import gnssTable from "./table.config.tsx";
import style from "./table.module.scss";

const TableSatellite = () => {
  console.log(gnssTable);
  return (
    <div>
      <table className={style.table}>
        <thead className={style.table__header}>
          <tr>
            <th className={style.table__header__item}>Спутник</th>
            <th className={style.table__header__item}>Азимут</th>
            <th className={style.table__header__item}>Угол места</th>
            <th className={style.table__header__item}>Дальность</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(gnssTable).map((key) =>
            gnssTable[key].map((item) => (
              <tr className={style.table__row} key={item.name}>
                <td className={style.table__row__item}> {item.name}</td>
                <td className={style.table__row__item}> {item.azimuth}</td>
                <td className={style.table__row__item}> {item.elevation}</td>
                <td className={style.table__row__item}> {item.range}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableSatellite;
