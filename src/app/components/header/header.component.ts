import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {}
