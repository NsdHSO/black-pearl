import { inject, Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  concatMap,
  interval,
  map,
  retryWhen,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalCowRecordService {
  private _router = inject(Router);
  private _stopTimer = new Subject();
  private _howMuch = new BehaviorSubject(240);

  whoYouAre: UntypedFormControl;

  constructor() {
    this.whoYouAre = new UntypedFormControl('');
  }

  navigate(route: unknown[]) {
    const url = route.map((segment) => String(segment)).join('/');
    this._router.navigateByUrl(url);
  }

  timer$ = this._howMuch.pipe(
    switchMap((valueNumber) =>
      interval(valueNumber / 60).pipe(
        concatMap((v) => interval(valueNumber * (valueNumber / 60))),
        tap(console.log),
        map((value) => valueNumber - Math.floor(value)), // Adjusted mapping
        map((value) => this.formatTime(value)),
        retryWhen(() => this._howMuch),
        takeUntil(this._stopTimer),
      ),
    ),
  );

  formatTime(value: number): string {
    if (value <= 1) {
      this.stopTimer();
    }
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  stopTimer() {
    this.navigate(['', 'admin', 'cow_records', 'cow_views']);
  }
}
