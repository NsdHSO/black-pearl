import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, switchMap } from 'rxjs';
import * as HomeActions from './home.actions';

@Injectable()
export class HomeEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.initHome),
      switchMap(() => of(HomeActions.loadHomeSuccess({ home: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(HomeActions.loadHomeFailure({ error }));
      }),
    ),
  );
}
