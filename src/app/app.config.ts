import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

import { routes } from './app.routes';

// Initialize Firebase
initializeApp(environment);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes)
  ]
};