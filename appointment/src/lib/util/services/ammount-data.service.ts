import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Amount } from '../interfaces';
import { buildSVG } from '@graph';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class AmmountDataService {
  private _httpClient = inject(HttpClient);
  amountData$: Observable<Amount> = this._httpClient
    .get<Amount>('http://localhost:3000/amount')
    .pipe(
      //eslint-disable-next-line
      tap((v: any) => {
        const stack = d3.stack().keys(['valueMoney', 'contrastMoney']);
        const stackedValues = stack(v.economy);
        const extractValuesAndMonth = (layer: any[]) =>
          layer.map((d, i) => ({
            values: d,
            month: new Date(v.economy[i]['month']),
          }));
        const stackedData = stackedValues.map((layer) =>
          extractValuesAndMonth(layer),
        );
        console.log(stackedData);
        const height = 400;
        const width = 400;
        buildSVG('#chart', width, height, stackedData);
      }),
    );

  constructor() {}
}
