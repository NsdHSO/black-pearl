import { Route } from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromHome from './+state/home.reducer';
import { HomeEffects } from './+state/home.effects';
import { SideBarConfig } from 'ngx-synergy';
import * as fromDashboard from './+state/dashboard.reducer';
import { DashboardEffects } from './+state/dashboard.effects';

function routes() {
  return [
    {
      path: '',
      name: 'Dashboard',
      icon: 'fa_brands:jenkins',
    },
    {
      path: 'cow_heath',
      name: 'Cow Heath',
      icon: 'fa_brands:tumblr',
    },
    {
      path: 'cow_records',
      name: 'Cow Records',
      icon: 'fa_brands:tumblr',
    },
    {
      path: 'breeding',
      name: 'Breeding',
      icon: 'fa_brands:tumblr',
    },
    {
      path: 'animal_weight',
      name: 'Animal Weight',
      icon: 'fa_brands:tumblr',
    },
  ];
}

export const homeRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((c) => c.HomeComponent),
    providers: [
      provideState(fromHome.HOME_FEATURE_KEY, fromHome.homeReducer),
      provideEffects(HomeEffects),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('synergy/src').then((c) => c.SideBarComponent),
        data: {
          items: routes() as SideBarConfig[],
        },
        children: [
          {
            path: '',
            loadComponent: () =>
              import('dashboard-home/src').then(
                (c) => c.DashboardHomeComponent,
              ),
            providers: [
              provideState(
                fromDashboard.DASHBOARD_FEATURE_KEY,
                fromDashboard.dashboardReducer,
              ),
              provideEffects(DashboardEffects),
            ],
          },
        ],
      },
    ],
  },
];
