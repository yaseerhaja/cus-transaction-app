import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideApollo } from 'apollo-angular';
import { routes } from './app.routes';
import { InMemoryCache } from '@apollo/client/core';
import { environment } from '../environments/environment';
import {provideNoopAnimations} from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideApollo(() => {
      return {
        uri:  environment.graphqlEndpoint,
        cache: new InMemoryCache(),
        // other options...
      };
    }), provideNoopAnimations(),
  ]
};
