export function range(start: number | null | undefined, step: number | null | undefined, length: number | null | undefined) {
  if (!start || !step || !length) return [];
  return Array.from({ length: length }, (_, i) => start + i * step);
}