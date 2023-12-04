import { createAction, props } from '@ngrx/store';
import { AdminEntity } from './admin.models';

export const initAdmin = createAction('[Admin Page] Init');

export const loadAdminSuccess = createAction(
  '[Admin/API] Load Admin Success',
  props<{ admin: AdminEntity[] }>()
);

export const loadAdminFailure = createAction(
  '[Admin/API] Load Admin Failure',
  props<{ error: any }>()
);
