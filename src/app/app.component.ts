import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppService } from './app.service';
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NgIf,
    MatIconModule,
    MatToolbarModule,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cus-transaction-app';
  hasLoggedIn = true;

  constructor(private appService: AppService) {
    this.hasLoggedIn = this.appService.currentUserValue;
  }
}
