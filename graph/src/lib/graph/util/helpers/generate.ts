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

export const createNewSvg = (
  container: string,
  width: number | string,
  height: number | string,
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
  (eventType: string) => (fn: any) => (element: any) => {
    element.on(eventType, fn);
  };
export function addTextToMarker(
  markerGroup: Any,
  xScale: (s: Any) => Any,
  yPosition: number,
  text: string,
  position: number,
  color = 'white',
  fontSize = '10px',
) {
  markerGroup
    .append('text')
    .attr('x', xScale(position))
    .attr('y', yPosition) // Adjusted position to move the text closer to the marker
    .text(text)
    .attr('text-anchor', 'middle')
    .attr('fill', color)
    .attr('font-size', fontSize);
}

export function addBanner(
  markerGroup: Any,
  xScale: Any,
  yPosition: number,
  xPosition: number,
  width: number,
  height = 15,
  rounded = '5px',
  fillColor = 'gray',
) {
  markerGroup
    .append('rect')
    .attr('x', xScale(xPosition) - width / 2) // Adjusted x-position to center the text
    .attr('y', yPosition) // Adjusted y-position to move the background rectangle
    .attr('width', width) // Adjusted width for the background rectangle
    .attr('height', height) // Adjusted height for the background rectangle
    .style('fill', fillColor) // Background color
    .style('rx', rounded) // Rounded corner
    .style('ry', rounded);
}
export function addALineOnTheX(
  markerGroup: Any,
  xScale: Any,
  xPosition: number,
  yPosition = 0,
  width = 3,
  height = 10,
  fillColor = 'white',
) {
  markerGroup
    .append('rect')
    .attr('x', xScale(xPosition))
    .attr('y', yPosition)
    .attr('width', width)
    .attr('height', height)
    .transition() // Apply transition effect
    .duration(500)
    .style('fill', fillColor);
}

export function addJumbotron(
  xScale: Any,
  parentGroup: Any,
  firstInterval: number,
  textMarker: string,
) {
  const middleInterval = firstInterval + 0.5;
  const betweenFourAndFiveGroup = createNewGroup(parentGroup)
    .attr('class', 'between-group')
    .attr('transform', `translate(10, 0)`);
  addBanner(betweenFourAndFiveGroup, xScale, -20, middleInterval, 120); // Rounded corner
  addTextToMarker(
    betweenFourAndFiveGroup,
    xScale,
    -10,
    textMarker,
    middleInterval,
  );

  const markerSecond = createNewGroup(betweenFourAndFiveGroup);
  [firstInterval, firstInterval + 1].reduce((acc, interval) => {
    addALineOnTheX(acc, xScale, interval);
    return acc;
  }, markerSecond);
}

export function addAMarker(
  xScale: Any,
  parentGroup: Any,
  xPosition: number,
  text: string,
) {
  const markerGroup = createNewGroup(parentGroup)
    .attr('class', 'marker-group')
    .attr('transform', `translate(10, 0)`);
  addALineOnTheX(markerGroup, xScale, xPosition);
  addBanner(markerGroup, xScale, -20, xPosition, 80); // Rounded corner
  addTextToMarker(markerGroup, xScale, -10, text, xPosition);

  return markerGroup;
}
