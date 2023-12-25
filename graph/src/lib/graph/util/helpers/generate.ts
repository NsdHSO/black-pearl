import * as d3 from 'd3';

export const buildSVG = (
  container: string,
  width: number,
  height: number,
  wrapperClassActive = true,
  wrapperClassName = 'bar-char',
  svg?: d3.Selection<SVGSVGElement, unknown, HTMLElement, never>,
) => {
  if (!svg) {
    svg = d3
      .select(container)
      .append('svg')
      .classed(wrapperClassName, wrapperClassActive);

    const containerGroup = svg
      .append('g')
      .classed('container-group', true)
      .attr('transform', `translate(20, 10)`);

    buildContainerGroups(containerGroup);
  }

  svg.attr('width', width);
  svg.attr('height', height);
};

const generateG = (
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
  classes: string,
  showed: boolean,
) => container.append('g').classed(classes, showed);

const buildContainerGroups = (
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
) => {
  buildContainer(container);
};

const buildContainer = (
  container: d3.Selection<SVGGElement, unknown, HTMLElement, never>,
) => {
  generateG(container, 'y-axis-group axis', true);
  generateG(container, 'x-axis-group axis', true);
};
