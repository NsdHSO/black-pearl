import {createFeatureSelector, createSelector} from '@ngrx/store';
import {HOME_FEATURE_KEY, homeAdapter, HomeState} from './home.reducer'; // Lookup the 'Home' feature state managed by NgRx

// Lookup the 'Home' feature state managed by NgRx
export const selectHomeState =
  createFeatureSelector<HomeState>(HOME_FEATURE_KEY);

const { selectAll, selectEntities } = homeAdapter.getSelectors();

export const selectHomeLoaded = createSelector(
  selectHomeState,
  (state: HomeState) => state.loaded,
);

export const selectHomeError = createSelector(
  selectHomeState,
  (state: HomeState) => state.error,
);

export const selectAllHome = createSelector(
  selectHomeState,
  (state: HomeState) => selectAll(state),
);

export const selectHomeEntities = createSelector(
  selectHomeState,
  (state: HomeState) => selectEntities(state),
);

export const selectSearchField = createSelector(
  selectHomeState,
  (state: HomeState) => state.entities['search'],
);

export const selectSelectedId = createSelector(
  selectHomeState,
  (state: HomeState) => state.selectedId,
);

export const selectEntity = createSelector(
  selectHomeEntities,
  selectSelectedId,
  selectSearchField,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);
