import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as AdminActions from './admin.actions';
import * as AdminFeature from './admin.reducer';

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.initAdmin),
      switchMap(() => of(AdminActions.loadAdminSuccess({ admin: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(AdminActions.loadAdminFailure({ error }));
      })
    )
  );
}
