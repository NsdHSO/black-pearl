import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AdminActions from './admin.actions';
import { AdminEntity } from './admin.models';

export const ADMIN_FEATURE_KEY = 'admin';

export interface AdminState extends EntityState<AdminEntity> {
  selectedId?: string | number; // which Admin record has been selected
  loaded: boolean; // has the Admin list been loaded
  error?: string | null; // last known error (if any)
}

export interface AdminPartialState {
  readonly [ADMIN_FEATURE_KEY]: AdminState;
}

export const adminAdapter: EntityAdapter<AdminEntity> =
  createEntityAdapter<AdminEntity>();

export const initialAdminState: AdminState = adminAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialAdminState,
  on(AdminActions.initAdmin, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(AdminActions.loadAdminSuccess, (state, { admin }) =>
    adminAdapter.setAll(admin, { ...state, loaded: true })
  ),
  on(AdminActions.loadAdminFailure, (state, { error }) => ({ ...state, error }))
);

export function adminReducer(state: AdminState | undefined, action: Action) {
  return reducer(state, action);
}
