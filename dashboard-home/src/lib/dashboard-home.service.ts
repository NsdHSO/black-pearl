import { Inject, inject, Injectable } from '@angular/core';
import { forkJoin, map, shareReplay, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account, Icon } from 'ngx-synergy';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private _httpClient = inject(HttpClient);
  private accounts$ = this._httpClient.get<Account[]>(
    `${this._baseUrl}/accounts`,
  );

  constructor(@Inject('BASE_URL_HOME') private _baseUrl: string) {}

  iconsReq$ = (accounts: Account[]) =>
    accounts.map((a) => this.icon$Request(a.currency.toLowerCase()));
  accountWithIcons$ = this.accounts$.pipe(
    switchMap((accounts) =>
      forkJoin(this.iconsReq$(accounts)).pipe(
        map((icons) => {
          return accounts.map((acc: Account, index) => ({
            ...acc,
            icon: icons[index][0],
          }));
        }),
      ),
    ),
    shareReplay(),
  );

  private icon$Request = (nameIcon: string) =>
    this._httpClient.get<Icon[]>(`${this._baseUrl}/icon/`, {
      params: { name: nameIcon },
    });
}
