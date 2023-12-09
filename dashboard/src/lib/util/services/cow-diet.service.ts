import { Inject, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CowDiet } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CowDietService {
  private _httpClient = inject(HttpClient);

  constructor(@Inject('BASE_URL_HOME') private _baseUrl: string) {}

  getDietCow$ = this._httpClient.get<CowDiet>(`${this._baseUrl}/cow-diet`);
}
