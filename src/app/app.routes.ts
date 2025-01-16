
import { Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import {HomeComponent} from "./components/home/home.component";
import {DetailPageComponent} from './components/detail-page/detail-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
      path: 'detail-page/:id',
      component: DetailPageComponent,
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];
