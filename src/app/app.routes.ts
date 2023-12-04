import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'admin',
    loadChildren: () => import('@admin').then((m) => m.adminRoutes),
  },
  { path: '', redirectTo: 'admin', pathMatch: 'full' },
];
