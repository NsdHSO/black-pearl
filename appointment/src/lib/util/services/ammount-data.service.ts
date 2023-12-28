import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Amount } from '../interfaces';
import * as d3 from 'd3';

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
      tap((v: any) => {
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
        ] as any;
        const stackGen = d3.stack().keys(['valueMoney', 'contrastMoney']);

        const stackedSeries = stackGen(data);
        const xExtent: any = d3.extent(data, (d: any) => {
          console.log(data, d);
          return new Date(d.month);
        });
        const yExtent: any = d3.extent(data, (d: any) => {
          return d.contrastMoney;
        });
        const xScale: any = d3.scaleTime().domain(xExtent).range([0, 400]);
        const yScale: any = d3.scaleLinear().domain(yExtent).range([400, 0]);

        const colorScale = d3
          .scaleOrdinal()
          .domain(['valueMoney', 'contrastMoney'])
          .range(['#f8f2f6', '#aec9f8']);
        const colorStroke = d3
          .scaleOrdinal()
          .domain(['valueMoney', 'contrastMoney'])
          .range(['#dfb5bb', '#1f67ea']);
        const areaGen: any = d3
          .area()
          .x((d: any) => xScale(new Date(d.data.month)))
          .y0((d: any) => {
            console.log(d);
            return +yScale(d[0]);
          })
          .y1((d: any) => +yScale(d[1]))
          .curve(d3.curveNatural);

        d3.select('#chart')
          .append('svg')
          .attr('width', 400)
          .attr('height', 400)
          .append('g')
          .attr('transform', `translate(-${10 - 1.1},-${5})`)
          .selectAll('.areas')
          .data(stackedSeries)
          .join('path')
          .attr('stroke', (d: any) => colorStroke(d.key) as any)
          .attr('padding', 2)
          .attr('stroke-width', (d: any) => (d.key === 'contrastMoney' ? 2 : 0)) // Set stroke width only for the top line
          .attr('d', areaGen)
          .attr('fill', (d: any) => colorScale(d.key) as any);
      }),
    );

  constructor() {}
}
