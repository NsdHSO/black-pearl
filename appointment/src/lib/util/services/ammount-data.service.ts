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
  amountData$: Observable<Amount> = this._httpClient
    .get<Amount>('http://localhost:3000/amount')
    .pipe(
      tap((v) => {
        // d3.data().then((d) => console.log(d));
        const element = d3
          .select('#virouse')
          .append('div')
          .style('font', '10px sans-serif')
          .style('color', 'white')
          .attr('text-align', 'right')
          .selectAll('svg')
          .data(v.economy)
          .join('div')
          .style('background', 'steelblue')
          .style('padding', '3px')
          .style('margin', '1px')
          .style('width', (d) => `${(d.valueMoney * 10) / 10}px`)
          .text((d) => d.valueMoney / 10)
          .style('text-color', 'red');
      }),
    );

  constructor() {}
}
