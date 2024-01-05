import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Amount, ContrastEntry } from '../interfaces';
import * as d3 from 'd3';
import {
  Any,
  coloring,
  createNewGroup,
  extent,
  mouseEvent,
  newSvg,
  stackedSeries,
} from '@graph';

@Injectable({
  providedIn: 'root',
})
export class AmmountDataService {
  private _httpClient = inject(HttpClient);
  private strokeWidth: number = 1.2;
  amountData$: Observable<Amount> = this._httpClient
    .get<Amount>('http://localhost:3000/amount')
    .pipe(
      //eslint-disable-next-line
      tap((v: Any) => {
        const width = 600;
        const height = 420;
        const data = [
          {
            contrastMoney: 0,
            month: '01.01.2023',
            valueMoney: 0,
          },
          {
            contrastMoney: 7,
            month: '02.01.2023',
            valueMoney: 7,
          },
          {
            contrastMoney: 25,
            month: '04.04.2023',
            valueMoney: 11,
          },
          {
            contrastMoney: 75,
            month: '05.05.2023',
            valueMoney: 13,
          },
        ] as Any;

        const stacked = stackedSeries(
          data,
          ['valueMoney', 'contrastMoney'],
          d3,
        );
        const yExtent = extent<ContrastEntry>(
          data,
          (d) => '' + d.contrastMoney,
          d3,
        );
        const xExtent = extent<ContrastEntry>(
          data,
          (d) => new Date(d.month),
          d3,
        );
        const svg = newSvg('#chart', width, height, d3);
        const margin = { top: 0, bottom: 30, left: 30, right: 20 };
        const widths =
          +svg.attr('width') -
          margin.left -
          margin.right -
          this.strokeWidth * 2;
        const heights = +svg.attr('height') - margin.top - margin.bottom;
        const xScale: Any = d3
          .scaleTime()
          .domain(xExtent as Any)
          .range([0, widths]);
        const heightChart: Any =
          +svg.attr('height') - margin.top - margin.bottom;
        const yScale: Any = d3
          .scaleLinear()
          .domain(yExtent as Any)
          .range([heights, 60]);
        const wrapperGroup = createNewGroup(svg);
        wrapperGroup.attr(
          'transform',
          `translate(${margin.left}, ${margin.top})`,
        );
        const grp = createNewGroup(wrapperGroup);

        const colorScale = coloring(
          d3,
          ['valueMoney', 'contrastMoney'],
          ['#f8f2f6', '#aec9f8'],
        );
        const colorStroke = coloring(
          d3,
          ['valueMoney', 'contrastMoney'],
          ['#dfb5bb', '#1f67ea'],
        );
        const areaGen: Any = d3
          .area()
          .x((d: Any) => xScale(new Date(d.data.month)))
          .y0((d: Any) => +yScale(d[0]))
          .y1((d: Any) => +yScale(d[1]))
          .curve(d3.curveNatural);
        const t = (element: Any) => {
          mouseEvent('mouseout')((event: Any) =>
            d3
              .select(event.currentTarget)
              .attr('fill', (d: Any) => colorScale(d.key) as Any)
              .attr('opacity', 1),
          )(element);
        };
        const series = grp.selectAll('series');
        const dateFormat = d3.timeFormat('%d/%m/%Y');

        const xAxis: Any = d3
          .axisBottom(xScale)
          .ticks(data.length)
          .tickFormat((d: Any) => dateFormat(new Date(d)));

        series
          .data(stacked)
          .join('path')
          .attr('stroke', (d: Any) => colorStroke(d.key) as Any)
          .attr('padding', 2)
          .attr('stroke-width', (d: Any) => (d.key === 'contrastMoney' ? 2 : 0)) // Set stroke width only for the top line
          .attr('d', areaGen)
          .attr('fill', (d: Any) => colorScale(d.key) as Any)
          .call(
            mouseEvent('mouseover')((event: Any) =>
              d3.select(event.currentTarget).attr('opacity', '0.9'),
            ),
          )
          .call(t);

        const bottomAxies = createNewGroup(wrapperGroup)
          .attr('transform', `translate(${margin.left},${heightChart})`)
          .call(xAxis)
          .selectAll('text')
          .style('fill', 'white')
          .style('font-size', '15');

        const markerDate = new Date('04.04.2023');
        const markerDataEntry = data.find(
          (entry: any) =>
            new Date(entry.month).getTime() === markerDate.getTime(),
        );
        const markerValue = markerDataEntry
          ? markerDataEntry.contrastMoney + markerDataEntry.valueMoney
          : 0; // Default to 0 if no matching data found

        // Calculate x and y positions for the circle marker based on the scales
        const markerX = xScale(markerDate);
        const markerY = yScale(markerValue);

        grp
          .append('circle')
          .attr('cx', markerX)
          .attr('cy', markerY)
          .attr('r', 6) // Adjust the radius of the circle as needed
          .attr('fill', 'red') // Set the color of the marker
          .attr('stroke', 'black');
        const totalChartHeight = height - margin.top - margin.bottom;

        grp
          .append('line')
          .attr('x1', markerX)
          .attr('y1', markerY + 6) // Start the line at the base of the circle
          .attr('x2', markerX)
          .attr('y2', totalChartHeight) // Line ends at the bottom of the chart area
          .attr('stroke', 'black')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '4')
          .attr('opacity', 0.7);
      }),
    );

  constructor() {}
}