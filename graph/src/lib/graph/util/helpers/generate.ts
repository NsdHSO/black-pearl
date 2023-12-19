import * as d3 from 'd3';

let svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, any>;
const width = 400;
const height = 600;

export function buildSVG(container: string) {
  if (!svg) {
    svg = d3.select(container).append('svg').classed('bar-char', true);
    buildContainerGroups();
  }

  svg.attr('width', width);
  svg.attr('height', height);
}

function buildContainerGroups() {
  const container = svg
    .append('g')
    .classed('container-group', true)
    .attr('transform', `translate(20, 10)`);

  container.append('g').classed('chart-axis-group', true);
  container.append('g').classed('y-axis-group axis', true);
  container.append('g').classed('x-axis-group axis', true);
}
