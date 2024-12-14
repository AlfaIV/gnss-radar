import { Moment } from "moment";
import moment from "moment";

export function freqRange(start: number | null | undefined, step: number | null | undefined, length: number | null | undefined) {
  if (!start || !step || !length) return [];
  return Array.from({ length: length }, (_, i) => start + i * step);
}

// fix it
// export function timeRange(start: Moment | null | undefined, step: Moment | null | undefined, length: number | null | undefined) {
//   if (!start || !step || !length) return [];
//   // console.log(start, step, length);
//   let previousElement: string | null = null;
//   return Array.from({ length: length }, (_, index) => {
//     // console.log(step.valueOf());
//     const result = previousElement !== null ? moment(previousElement).add(step.valueOf(), 'milliseconds').format('HH:MM:SS') : start.format('HH:MM:SS');
//     previousElement = result;
//     return result;
//   });
// }


export function timeRange(start: Moment | null | undefined, step: Moment | null | undefined, length: number | null | undefined) {
  // Проверяем, что все параметры валидны
  if (!start || !step || !length || length <= 0) return [];

  let previousElement: Moment | null = null; 
  const stepMilliseconds = step.valueOf();   

  return Array.from({ length }, (_, index) => {
    const result = previousElement ? previousElement.add(stepMilliseconds, 'milliseconds') : start;
    previousElement = result;         
    return result.format('HH:mm:ss'); 
  });
}