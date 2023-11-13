import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as HomeActions from './home.actions';
import { HomeEntity } from './home.models';

export const HOME_FEATURE_KEY = 'home';

export interface HomeState extends EntityState<HomeEntity> {
  selectedId?: string | number; // which Home record has been selected
  loaded: boolean; // has the Home list been loaded
  error?: string | null; // last known error (if any)
}

export interface HomePartialState {
  readonly [HOME_FEATURE_KEY]: HomeState;
}

export const homeAdapter: EntityAdapter<HomeEntity> =
  createEntityAdapter<HomeEntity>();

export const initialHomeState: HomeState = homeAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  entities: {
    search: 'valye',
    theme: 'dark',
  },
});

const reducer = createReducer(
  initialHomeState,
  on(HomeActions.initHome, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(HomeActions.loadHomeSuccess, (state, { home }) =>
    homeAdapter.setAll(home, { ...state, loaded: true }),
  ),
  on(HomeActions.loadHomeFailure, (state, { error }) => ({ ...state, error })),
  on(HomeActions.setSearchValue, (state, action) => {
    return {
      ...state,
      entities: { ...state.entities, search: action.search },
    };
  }),
);

export function homeReducer(state: HomeState | undefined, action: Action) {
  return reducer(state, action);
}
