import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductionMilkType } from '../index';

@Injectable({
  providedIn: 'root',
})
export class ProductionMilkOnWeekService {
  private _httpClient = inject(HttpClient);

  constructor(@Inject('BASE_URL_HOME') private _baseUrl: string) {}

  getProductionMilk$ = this._httpClient.get<ProductionMilkType>(
    `${this._baseUrl}/productionMilkWeek`
  );
}
