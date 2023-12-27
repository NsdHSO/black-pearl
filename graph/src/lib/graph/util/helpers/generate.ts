import * as d3 from 'd3';

export const buildSVG = (
  container: string,
  width: number,
  height: number,
  stacked: any,
  wrapperClassActive = true,
  wrapperClassName = 'bar-char',
  svg?: d3.Selection<SVGSVGElement, unknown, HTMLElement, never>,
) => {
  if (!svg) {
    svg = d3
      .select(container)
      .append('svg')
      .classed(wrapperClassName, wrapperClassActive);

    const grp = svg
      .append('g')
      .attr('transform', `translate(-${10 - 1.1},-${5})`);

    series(grp, stacked);
    // buildContainerGroups(grp);
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

// Create scales
const yScale: any = (stackedValues: any, height: number) =>
  d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      0,
      d3.max(
        stackedValues[stackedValues.length - 1],
        (dp: any) => dp[1],
      ) as any,
    ]);
const xScale: any = (data: any, width: number) =>
  d3
    .scaleLinear()
    .range([0, width])
    .domain(
      d3.extent(data, (dataPoint: any) => {
        console.log(dataPoint);
        return dataPoint.month;
      }) as any,
    );

const area: any = d3
  .area()
  .x((dataPoint: any) => {
    console.log(dataPoint);
    return xScale(dataPoint, 400);
  })
  .y0((dataPoint: any) => yScale(dataPoint.values[0], 400))
  .y1((dataPoint: any) => yScale(dataPoint.values[1], 400));
const series: any = (grp: any, stackedData: any) =>
  grp
    .selectAll('.series')
    .data(stackedData)
    .attr('class', 'series')
    .join('path')
    .attr('transform', `translate(${2},0)`)
    .style('fill', (d: any, i: any) => (i % 2 == 0 ? 'red' : 'blue'))
    .attr('stroke', 'steelblue')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-linecap', 'round')
    .attr('d', area);
