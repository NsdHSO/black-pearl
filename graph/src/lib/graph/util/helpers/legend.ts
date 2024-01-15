import { Any, createNewGroup } from './generate';

export function addLegendToGradient(
  legendGroup: Any,
  legendX: Any,
  legendY: Any,
) {
  return (item: Any) => {
    const rectSize = 15; // Size of the colored rectangles in the legend
    const rectPadding = 5; // Padding between rectangle and text
    // Append rectangles representing the colors

    const legendChild = createNewGroup(legendGroup);
    legendChild
      .append('rect')
      .attr('x', legendX)
      .attr('y', legendY)
      .attr('width', rectSize)
      .attr('height', rectSize)
      .attr('fill', item.color);

    // Append text labels for the legend
    legendChild
      .append('text')
      .attr('x', legendX + rectSize + rectPadding)
      .attr('y', legendY + rectSize / 2)
      .text(item.label)
      .attr('alignment-baseline', 'middle')
      .attr('fill', 'gray'); // Adjust text properties as needed

    // Increment Y position for the next legend item
    legendY += rectSize + 10; // Adjust spacing between legend items
    return legendChild;
  };
}
