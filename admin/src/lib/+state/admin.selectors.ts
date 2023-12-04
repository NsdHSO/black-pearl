import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ADMIN_FEATURE_KEY, AdminState, adminAdapter } from './admin.reducer';

// Lookup the 'Admin' feature state managed by NgRx
export const selectAdminState =
  createFeatureSelector<AdminState>(ADMIN_FEATURE_KEY);

const { selectAll, selectEntities } = adminAdapter.getSelectors();

export const selectAdminLoaded = createSelector(
  selectAdminState,
  (state: AdminState) => state.loaded
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state: AdminState) => state.error
);

export const selectAllAdmin = createSelector(
  selectAdminState,
  (state: AdminState) => selectAll(state)
);

export const selectAdminEntities = createSelector(
  selectAdminState,
  (state: AdminState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAdminState,
  (state: AdminState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAdminEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
