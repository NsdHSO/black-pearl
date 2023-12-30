// eslint-disable-next-line
export type Any = any;
type DatumReturned = string | null | undefined | Date | Any;
type DatumFunction<T> = (
  datum: T,
  index: number,
  array: Iterable<T>,
) => DatumReturned;
export const stackedSeries = <
  T extends Iterable<{
    [key: string]: number;
  }>,
>(
  data: T,
  keys: string[],
  d3: Any,
) => d3.stack().keys(keys)(data);

export const extent = <T>(data: Iterable<T>, fn: DatumFunction<T>, d3: Any) =>
  d3.extent(data, fn);

export const newSvg = (
  container: string,
  width: number,
  height: number,
  d3: Any,
) =>
  d3
    .select(container)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

export const coloring = (d3: Any, domains: string[], ranges: string[]) =>
  d3.scaleOrdinal().domain(domains).range(ranges);
export const createNewGroup = (parrent: Any) => parrent.append('g');
export const mouseEvent =
  (eventType: string, d3: any) => (fn: any) => (element: any) => {
    element.on(eventType, fn);
  };

export const applyEvent = (series: any, fn: any) => {
  series.each(fn);
};
