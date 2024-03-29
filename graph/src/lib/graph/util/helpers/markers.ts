import {
  addASquareOnTheX,
  Any,
  appendCircle,
  appendLineMarker,
  createNewGroup,
} from './generate';

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
  yPosition: number,
) {
  const middleInterval = firstInterval + 1;
  const heightLines = 39;
  const betweenFourAndFiveGroup = createNewGroup(parentGroup)
    .attr('class', 'between-group')
    .attr('transform', `translate(10, 0)`);
  addBanner(
    betweenFourAndFiveGroup,
    xScale,
    yPosition,
    middleInterval,
    xScale(firstInterval + 2.01) - xScale(firstInterval),
  ); // Rounded corner
  addTextToMarker(
    betweenFourAndFiveGroup,
    xScale,
    yPosition + 10,
    textMarker,
    middleInterval,
  );

  const markerSecond = createNewGroup(betweenFourAndFiveGroup);
  [firstInterval, firstInterval + 2].reduce((acc, interval) => {
    addALineOnTheX(
      acc,
      xScale,
      interval,
      heightLines * -1 + 10,
      1.5,
      heightLines,
    );
    return acc;
  }, markerSecond);
  return betweenFourAndFiveGroup;
}

export function addAMarkerWithLine(
  xScale: Any,
  parentGroup: Any,
  xPosition: number,
  yPosition: number,
  text: string,
) {
  const markerGroup = createNewGroup(parentGroup)
    .attr('class', 'marker-group')
    .attr('transform', `translate(10, 0)`);
  addALineOnTheX(markerGroup, xScale, xPosition);
  addBanner(markerGroup, xScale, yPosition, xPosition, 80); // Rounded corner
  addTextToMarker(markerGroup, xScale, yPosition + 10, text, xPosition);

  return markerGroup;
}
export function addAMarkerWithSquare(
  xScale: Any,
  parentGroup: Any,
  xPosition: number,
  yPosition: number,
  text: string,
) {
  const markerGroup = createNewGroup(parentGroup)
    .attr('class', 'marker-group')
    .attr('transform', `translate(10, 0)`)
    .attr('height', 10);
  addASquareOnTheX(markerGroup, xScale, xPosition);
  addBanner(markerGroup, xScale, yPosition, xPosition, 80); // Rounded corner
  addTextToMarker(markerGroup, xScale, yPosition + 10, text, xPosition);

  return markerGroup;
}
export function addMarkerLinear(
  xScale: Any,
  yScale: Any,
  markerDate: Any,
  markerValue: Any,
  parent: Any,
  height: Any,
  configGraph: Any,
  radius = 6,
  stroke = 'black',
  strokeWidth = 3,
) {
  const markerX = xScale(markerDate);
  const markerY = yScale(markerValue);
  const marker = createNewGroup(parent);
  const totalChartHeight =
    height - configGraph.marginTop - configGraph.marginBottom;

  appendCircle(marker, markerX, markerY, stroke, strokeWidth, radius);

  appendLineMarker(
    marker,
    markerX,
    markerY,
    totalChartHeight,
    radius,
    stroke,
    strokeWidth,
  );
  return marker;
}
