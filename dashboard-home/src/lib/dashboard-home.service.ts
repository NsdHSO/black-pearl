import { Inject, inject, Injectable } from '@angular/core';
import { of, shareReplay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from 'ngx-synergy';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private _httpClient = inject(HttpClient);
  private accounts$ = this._httpClient.get<Account[]>(
    `${this._baseUrl}/accounts`,
  );
  accountWithIcons$ = this.accounts$.pipe(
    switchMap((v) => of(v)),
    shareReplay(),
  );

  constructor(@Inject('BASE_URL_HOME') private _baseUrl: any) {}
}
