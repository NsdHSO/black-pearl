import { Route } from '@angular/router';
import { AppointmentComponent } from './appointment/appointment.component';

export const appointmentRoutes: Route[] = [
  {
    path: '',
    component: AppointmentComponent,
    data: {
      range: [1, 5],
      gradientSettings: [
        { offset: '0%', stopColor: '#FA7842' },
        { offset: '11%', stopColor: '#FEC73C' },
        { offset: '26%', stopColor: '#FFDF3A' },
        { offset: '100%', stopColor: 'green' },
      ],
    },
  },
];
