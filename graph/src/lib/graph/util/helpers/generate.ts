import * as d3 from 'd3';

let svg: d3.Selection<SVGSVGElement, unknown, HTMLElement, never>;
const width = 400;
const height = 600;

export function buildSVG(container: string) {
  if (!svg) {
    svg = d3.select(container).append('svg').classed('bar-char', true);

    const containerGroup = svg
      .append('g')
      .classed('container-group', true)
      .attr('transform', `translate(20, 10)`);

    buildContainerGroups(containerGroup);
  }

  svg.attr('width', width);
  svg.attr('height', height);
}

function generateG(
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
  classes: string,
  showed: boolean,
) {
  container.append('g').classed(classes, showed);
}

function buildContainerGroups(
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
) {
  buildContainer(container);
}

function buildContainer(
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
) {
  generateG(container, 'y-axis-group axis', true);
  generateG(container, 'x-axis-group axis', true);
}
