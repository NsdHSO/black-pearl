import { inject, Injectable } from '@angular/core';
import { of, shareReplay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account } from 'ngx-synergy';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private _httpClient = inject(HttpClient);
  private accounts$ = this._httpClient.get<Account[]>(
    'http://localhost:3000/accounts',
  );
  accountWithIcons$ = this.accounts$.pipe(
    switchMap((v) => of(v)),
    shareReplay(),
  );
}
