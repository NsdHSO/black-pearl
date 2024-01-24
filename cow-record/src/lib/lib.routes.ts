import { Route } from '@angular/router';

export const cowRecordRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./cow-record/cow-record.component').then(
        (c) => c.CowRecordComponent,
      ),
    data: { animation: 'step' },
  },
  {
    path: 'cow_views',
    loadComponent: () =>
      import('./viewCow/viewCow.component').then((c) => c.ViewCowComponent),
    data: { animation: 'step1' },
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./loadingCalculation/loadingCalculation.component').then(
        (c) => c.LoadingCalculationComponent,
      ),
    data: { animation: 'step2' },
  },
];
