import { createAction, props } from '@ngrx/store';
import { HomeEntity } from './home.models';

const PREFIX_HOME = 'Home';

export const initHome = createAction(`[${PREFIX_HOME} Page] Init`);

export const loadHomeSuccess = createAction(
  `[[${PREFIX_HOME}/API] Load Home Success`,
  props<{ home: HomeEntity[] }>(),
);

export const loadHomeFailure = createAction(
  `[${PREFIX_HOME}/API] Load Home Failure`,
  props<{ error: any }>(),
);

export const setSearchValue = createAction(
  `[${PREFIX_HOME}] Set Search Value`,
  props<any>(),
);
