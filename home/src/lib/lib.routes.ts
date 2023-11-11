import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromHome from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';

export const homeRoutes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      provideState(fromHome.HOME_FEATURE_KEY, fromHome.homeReducer),
      provideEffects(HomeEffects),
    ],
    data: {
      hero: 'Force',
    },
  },
];
