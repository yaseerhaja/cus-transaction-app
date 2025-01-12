import { Component, OnInit, DoCheck } from '@angular/core';

import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIconButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [
    MatMenu,
    MatMenuItem,
    MatIconButton,
    MatMenuTrigger,
    MatIconModule,
    NgIf
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {
  hasLoggedIn: any;

  constructor(private appService: AppService) { }

  ngOnInit(): void { }

  ngDoCheck(): void {
    this.hasLoggedIn = this.appService.currentUserValue;
  }

  logout(e: Event){
    this.appService.logout();
  }
}
