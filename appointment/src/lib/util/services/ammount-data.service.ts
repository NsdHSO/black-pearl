import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Amount } from '../interfaces';
import { buildSVG } from '@graph';

@Injectable({
  providedIn: 'root',
})
export class AmmountDataService {
  private _httpClient = inject(HttpClient);
  amountData$: Observable<Amount> = this._httpClient
    .get<Amount>('http://localhost:3000/amount')
    .pipe(
      tap((v: Amount) => {
        const height = 400;
        const width = 400;
        buildSVG('#graph', width, height);
      }),
    );

  constructor() {}
}
