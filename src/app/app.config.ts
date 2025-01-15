import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { routes } from './app.routes';
import { InMemoryCache } from '@apollo/client/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      return {
        uri: 'http://13.60.195.142:8081/graphql',
        cache: new InMemoryCache(),
        // other options...
      };
    }), provideAnimationsAsync(),
  ]
};
