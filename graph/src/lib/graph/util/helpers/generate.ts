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
  keys: Any,
  d3: Any,
) => d3.stack().keys(keys)(data);

export const extent = <T>(data: Iterable<T>, fn: DatumFunction<T>, d3: Any) =>
  d3.extent(data, fn);

export const createNewSvg = (
  container: string,
  { height, width }: Any,
  d3: Any,
) =>
  d3
    .select(container)
    .append('svg')
    .attr('height', height)
    .attr('width', width);

export const coloring = (d3: Any, domains: string[], ranges: string[]) =>
  d3.scaleOrdinal().domain(domains).range(ranges);
export const createNewGroup = (parent: Any) => parent.append('g');
export const mouseEvent =
  (eventType: string) => (fn: any) => (element: any) => {
    element.on(eventType, fn);
  };
export function addASquareOnTheX(
  markerGroup: Any,
  xScale: Any,
  xPosition: number,
  yPosition = 0,
  fillColor = 'gray',
  sideLength = 15,
) {
  const group = createNewGroup(markerGroup)
    .attr(
      'transform',
      `translate(${xScale(xPosition)}, ${yPosition - 14}) rotate(${45})`,
    )
    .style('rx', '5px') // Rounded corner
    .style('ry', '5px');
  group
    .append('rect')
    .attr('width', sideLength)
    .attr('height', sideLength)
    .transition()
    .duration(500)
    .style('fill', fillColor);
  return group;
}
export function appendCircle(
  parent: Any,
  markerX: Any,
  markerY: Any,
  stroke = 'black',
  strokeWidth = 3,
  radius = 6,
  fill = 'white',
) {
  parent
    .append('circle')
    .attr('cx', markerX)
    .attr('cy', markerY)
    .attr('r', radius) // Adjust the radius of the circle as needed
    .attr('fill', fill) // Set the color of the marker
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth);
  return parent;
}

export function appendLineMarker(
  parent: Any,
  markerX: Any,
  markerY: Any,
  totalChartHeight: number,
  radius = 6,
  stroke = 'black',
  strokeWidth = 3,
) {
  parent
    .append('line')
    .attr('x1', markerX)
    .attr('y1', markerY + radius) // Start the line at the base of the circle
    .attr('x2', markerX)
    .attr('y2', totalChartHeight + radius + 25) // Line ends at the bottom of the chart area
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth);
  return parent;
}
export function appendSeriesPath(series: Any, configGraph: Any) {
  return createNewGroup(series)
    .attr('class', 'series')
    .append('path')
    .attr('transform', `translate(${configGraph.marginLeft},0)`)
    .style('fill', (d: Any, i: number) => configGraph.color[i])
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', configGraph.strokeWidth);
}
export function appendDLine(parent: Any, typeGenerator: Any) {
  parent.attr('d', typeGenerator);
  return parent;
}
