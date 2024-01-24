import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromAdmin from './+state/admin.reducer';
import { AdminEffects } from './+state/admin.effects';
import { SideBarConfig } from '@synergy';

function routes() {
  return [
    {
      path: 'dashboard',
      name: 'Dashboard',
      icon: 'fa_brands:jenkins',
    },
    {
      path: 'appointment',
      name: 'Cow Heath',
      icon: 'fa_brands:figma',
    },
    {
      path: 'cow_records',
      name: 'Cow Records',
      icon: 'fa_brands:diaspora',
    },
    {
      path: 'breeding',
      name: 'Breeding',
      icon: 'fa_brands:tumblr',
    },
    {
      path: 'animal_weight',
      name: 'Animal Weight',
      icon: 'fa_brands:linux',
    },
  ];
}

export const adminRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@synergy').then((c) => c.SideBarComponent),
    data: {
      items: routes() as SideBarConfig[],
    },
    providers: [
      provideState(fromAdmin.ADMIN_FEATURE_KEY, fromAdmin.adminReducer),
      provideEffects(AdminEffects),
    ],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@dashboard').then((m) => m.dashboardRoutes),
      },
      {
        path: 'appointment',
        loadChildren: () =>
          import('@appointment').then((m) => m.appointmentRoutes),
      },
      {
        path: 'cow_records',
        loadChildren: () =>
          import('@cow-record').then((m) => m.cowRecordRoutes),
      },
      { path: '', redirectTo: 'cow_records', pathMatch: 'full' },
    ],
  },
];
