import * as d3 from 'd3';
import { Any, createNewGroup } from './generate';

type AxisOrientation = 'bottom' | 'top' | 'left' | 'right';

export function createAxis(
  d3Instance: typeof d3,
  scale: d3.AxisScale<number | Date | string>,
  orientation: AxisOrientation,
  translate: [number, number] = [0, 0],
  graphWrapper: Any,
  lenght = 10,
) {
  const axisGenerator =
    orientation === 'left' || orientation === 'right'
      ? d3Instance.axisLeft(scale)
      : d3Instance.axisBottom(scale);

  if (orientation === 'top' || orientation === 'bottom') {
    axisGenerator.ticks(lenght); // Adjust the number of ticks as needed
  }

  const axisGroup = createNewGroup(graphWrapper)
    .attr('transform', `translate(${translate[0]}, ${translate[1]})`)
    .call(axisGenerator);

  return axisGroup;
}
