import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { startWith, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CowService {
  private _httpClient = inject(HttpClient);
  cowItems = new Subject();
  signalItem = new Subject();

  getCows = this._httpClient
    .get('http://localhost:3000/cows')
    .pipe(tap((v) => this.cowItems.next(v)));

  cow$ = this.getCows;
  cowSignalForTriggerGet = this.signalItem.pipe(
    startWith(1),
    switchMap(() => this.cow$)
  );

  addNewCow(cow: { name: string }) {
    return this._httpClient
      .post('http://localhost:3000/cows', cow)
      .pipe(switchMap(() => this.cow$));
  }
}
