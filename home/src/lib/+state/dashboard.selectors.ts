import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DASHBOARD_FEATURE_KEY,
  dashboardAdapter,
  DashboardState,
} from './dashboard.reducer';

// Lookup the 'Dashboard' feature state managed by NgRx
export const selectDashboardState = createFeatureSelector<DashboardState>(
  DASHBOARD_FEATURE_KEY,
);

const { selectAll, selectEntities } = dashboardAdapter.getSelectors();

export const selectDashboardLoaded = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.loaded,
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.error,
);

export const selectAllDashboard = createSelector(
  selectDashboardState,
  (state: DashboardState) => selectAll(state),
);

export const selectDashboardEntities = createSelector(
  selectDashboardState,
  (state: DashboardState) => selectEntities(state),
);
