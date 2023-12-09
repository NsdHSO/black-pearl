import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CowService {
  private _httpClient = inject(HttpClient);
  cowItems = new Subject();
  getCows = of(1).pipe(
    switchMap((v) =>
      this._httpClient
        .get('http://localhost:3000/cows')
        .pipe(tap((v) => this.cowItems.next(v)))
    )
  );

  cow$ = this.getCows;

  addNewCow(cow: { name: string }) {
    return this._httpClient
      .post('http://localhost:3000/cows', cow)
      .pipe(switchMap(() => this.cow$));
  }
}
