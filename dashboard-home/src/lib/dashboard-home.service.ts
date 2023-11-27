import { Inject, inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  map,
  shareReplay,
  switchMap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Account, ConfigButton, Icon } from 'ngx-synergy';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private _httpClient = inject(HttpClient);
  private _selectedAccount$ = new BehaviorSubject(0);
  private accounts$ = this._httpClient.get<Account[]>(
    `${this._baseUrl}/accounts`,
  );

  constructor(@Inject('BASE_URL_HOME') private _baseUrl: string) {}

  iconsReq$ = (accounts: Account[]) =>
    accounts.map((a) => this.icon$Request(a.currency.toLowerCase()));

  setAccount = (index: number) => {
    this._selectedAccount$.next(index);
  };

  private icon$Request = (nameIcon: string) =>
    this._httpClient.get<Icon[]>(`${this._baseUrl}/icon/`, {
      params: { name: nameIcon },
    });

  private accountConfigRequest$ = (accountIban: string) =>
    this._httpClient.get<ConfigButton[]>(`${this._baseUrl}/configAccount/`, {
      params: { IBAN: accountIban },
    });

  private accountWithIcons$ = this.accounts$.pipe(
    switchMap((accounts) =>
      forkJoin(this.iconsReq$(accounts)).pipe(
        map((icons) => {
          return accounts.map((acc: Account, index) => {
            return {
              ...acc,
              icon: icons[index][0],
            };
          });
        }),
      ),
    ),
    switchMap((accounts) =>
      forkJoin(
        accounts.map((account) =>
          this.accountConfigRequest$(account.IBAN).pipe(
            map((config) => ({
              ...account,
              configuration: { buttons: [...config] },
            })),
            map((configurations) => ({
              ...configurations,
              configuration: {
                buttons: configurations.configuration.buttons.map((config) => ({
                  ...config,
                  action: (row: unknown) => console.log(row),
                })),
              },
            })),
          ),
        ),
      ),
    ),
    shareReplay(),
  );

  accountWithIconsAndSelected$ = combineLatest([
    this.accountWithIcons$,
    this._selectedAccount$.asObservable(),
  ]).pipe(
    map(([accounts, selectedAccount]) => {
      return accounts.map((v, index) => ({
        ...v,

        selected: index === selectedAccount,
      }));
    }),
  );
}
