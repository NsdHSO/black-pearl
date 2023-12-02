import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { CowDiet } from '@black-pearl/dashboard-home';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface DashboardState extends EntityState<CowDiet> {
  selectedId?: string | number; // which Dashboard record has been selected
  loaded: boolean; // has the Dashboard list been loaded
  error?: string | null; // last known error (if any)
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: DashboardState;
}

export const dashboardAdapter: EntityAdapter<CowDiet> =
  createEntityAdapter<CowDiet>();

export const initialDashboardState: DashboardState =
  dashboardAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialDashboardState,
  on(DashboardActions.initDashboard, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) =>
    dashboardAdapter.setOne(dashboard, { ...state, loaded: true }),
  ),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function dashboardReducer(
  state: DashboardState | undefined,
  action: Action,
) {
  return reducer(state, action);
}
