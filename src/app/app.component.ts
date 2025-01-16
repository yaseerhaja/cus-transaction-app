import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {HeaderComponent} from "./components/header/header.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
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
}
