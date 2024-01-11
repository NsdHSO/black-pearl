import { Any } from '@graph';

export function addGradientAndWireToBar(
  parentToAdd: Any,
  height: number,
  url: string,
  width = '100%',
  rounded = true,
) {
  parentToAdd
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr('rx', rounded ? 7 : 0) // Horizontal radius for rounded corners
    .attr('ry', rounded ? 7 : 0) // Vertical radius for rounded corners
    .transition() // Apply transition effect
    .duration(500)
    .style('fill', `url(#${url})`);
}
export function addColoringGradient(
  gradientSettings: { offset: string; stopColor: string }[],
  parent: Any,
) {
  gradientSettings.forEach((setting: Any) => {
    parent
      .append('stop')
      .attr('offset', setting.offset)
      .attr('stop-color', setting.stopColor);
  });
}
export function createDefForGradient(
  gradientAndXAxis: Any,
  idBar: string,
  gradientSettings: Any,
  typeLinear = 'linearGradient',
) {
  const gradient = gradientAndXAxis
    .append('defs')
    .append(typeLinear)
    .attr('id', idBar)
    .attr('x1', '0%')
    .attr('y1', '0%')
    .attr('x2', '100%')
    .attr('y2', '0%');
  addColoringGradient(gradientSettings, gradient);
  addGradientAndWireToBar(gradientAndXAxis, 10, idBar);
  return gradient;
}
