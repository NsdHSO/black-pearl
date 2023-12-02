import { createAction, props } from '@ngrx/store';
import { CowDiet } from '@black-pearl/dashboard-home';

export const initDashboard = createAction('[Dashboard Page] Init');

export const loadDashboardSuccess = createAction(
  '[Dashboard/API] Load Dashboard Success',
  props<{ dashboard: CowDiet }>(),
);

export const loadDashboardFailure = createAction(
  '[Dashboard/API] Load Dashboard Failure',
  props<{ error: any }>(),
);
