import { Route } from '@angular/router';
import { CowRecordComponent } from './cow-record/cow-record.component';
import { ViewCowComponent } from './viewCow/viewCow.component';

export const cowRecordRoutes: Route[] = [
  { path: '', component: CowRecordComponent, data: { animation: 'Step1' } },
  {
    path: 'tes',
    component: ViewCowComponent,
    data: { animation: 'Step2' },
  },
];
