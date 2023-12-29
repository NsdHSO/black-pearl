import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Amount, ContrastEntry } from '../interfaces';
import * as d3 from 'd3';
import { Any, extent, newSvg, stackedSeries } from '@graph';

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
            month: '02.02.2023',
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
        const xScale: Any = d3
          .scaleTime()
          .domain(xExtent as Any)
          .range([0, width]);
        const margin = { top: 0, bottom: 30, left: 30, right: 20 };
        const svg = newSvg('#chart', width, height, d3);

        const heightChart: Any =
          +svg.attr('height') - margin.top - margin.bottom;
        const yScale: Any = d3
          .scaleLinear()
          .domain(yExtent as Any)
          .range([heightChart, 0]);
        const chart = svg.append('g').attr('transform', `scale(0.9`);
        const grp = chart
          .append('g')
          .attr(
            'transform',
            `translate(-${margin.left - this.strokeWidth},-${
              margin.top
            }-20); scale(0.9)`,
          );
        const colorScale = d3
          .scaleOrdinal()
          .domain(['valueMoney', 'contrastMoney'])
          .range(['#f8f2f6', '#aec9f8']);
        const colorStroke = d3
          .scaleOrdinal()
          .domain(['valueMoney', 'contrastMoney'])
          .range(['#dfb5bb', '#1f67ea']);
        const areaGen: Any = d3
          .area()
          .x((d: Any) => xScale(new Date(d.data.month)))
          .y0((d: Any) => {
            console.log(d);
            return +yScale(d[0]);
          })
          .y1((d: Any) => +yScale(d[1]))
          .curve(d3.curveNatural);

        const series = grp.selectAll('series');
        const dateFormat = d3.timeFormat('%d/%m/%Y');

        const xAxis: Any = d3
          .axisBottom(xScale)
          .ticks(data.length)
          .tickFormat((d: Any) => {
            console.log(d);
            return dateFormat(new Date(d));
          });

        series
          .data(stacked)
          .join('path')
          .attr('stroke', (d: Any) => colorStroke(d.key) as Any)
          .attr('padding', 2)
          .attr('stroke-width', (d: Any) => (d.key === 'contrastMoney' ? 2 : 0)) // Set stroke width only for the top line
          .attr('d', areaGen)
          .attr('fill', (d: Any) => colorScale(d.key) as Any);
        chart
          .append('g')
          .attr('transform', `translate(0,${heightChart})`)
          .call(xAxis)
          .selectAll('text')
          .style('fill', 'white')
          .style('font-size', '15');
      }),
    );

  constructor() {}
}
