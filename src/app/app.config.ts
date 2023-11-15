import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';
import { IconCoreModule } from 'ngx-liburg-icon';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideRouter(
      appRoutes,
      withEnabledBlockingInitialNavigation(),
      withComponentInputBinding(),
      withViewTransitions(),
    ),
    provideStoreDevtools(),
    provideAnimations(),
    importProvidersFrom(IconCoreModule),
    {
      provide: 'BASE_URL_HOME',
      useValue: process.env['NX_BASE_URL_HOME'],
    },
  ],
};
