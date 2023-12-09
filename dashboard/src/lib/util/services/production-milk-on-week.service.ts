import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductionMilkType } from '../index';

@Injectable({
  providedIn: 'root',
})
export class ProductionMilkOnWeekService {
  private _httpClient = inject(HttpClient);
  private _baseUrl: string = 'http://localhost:3000';

  constructor() {}

  getProductionMilk$ = this._httpClient.get<ProductionMilkType>(
    `${this._baseUrl}/productionMilkWeek`
  );
}
