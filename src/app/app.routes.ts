import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@black-pearl/home').then((m) => m.homeRoutes),
  },
];
