import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppComponentService } from './app.service';

@Component({
  selector: 'app-root',
  imports: [
      RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'cus-transaction-app';

  message: string = '';

  constructor(private appComponentService: AppComponentService) {}

  ngOnInit() {
    this.appComponentService.getHello().subscribe((result: any) => {
      this.message = result?.data?.hello;
    });
  }
}
