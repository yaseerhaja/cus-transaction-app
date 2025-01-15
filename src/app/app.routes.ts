
import { Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import {AuthService} from "./auth/auth.service";
import {LoginComponent} from "./components/login/login.component";
import {HomeComponent} from "./components/home/home.component";
import {DetailPageComponent} from './components/detail-page/detail-page.component';

export const routes: Routes = [
    {
        path: 'home',
        //canActivate: [AuthService],
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
      path: 'detail-page/:id',
      component: DetailPageComponent,
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: ErrorComponent }
];