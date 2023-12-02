import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import * as DashboardActions from './dashboard.actions';
import { CowDietService } from '@black-pearl/dashboard-home';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private _cowDiet = inject(CowDietService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.initDashboard),
      switchMap(() =>
        this._cowDiet.getDietCow$.pipe(
          map((data) =>
            DashboardActions.loadDashboardSuccess({ dashboard: data }),
          ),
          catchError((error) => {
            console.error('Error', error);
            return of(DashboardActions.loadDashboardFailure({ error }));
          }),
        ),
      ),
    ),
  );
}
