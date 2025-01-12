import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [

  ],
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  employeeList: any = [];
  employeeListFiltered: any = [];
  @ViewChild('dataSort', { static: true }) dataSort: MatSort | undefined;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    const el = document.getElementsByClassName('tbl-home')[0];
    el.classList.add('be-loading-active');

    this.appService.getEmployeeList().subscribe(data => {
      el.classList.remove('be-loading-active');
    }, err => {
      this.employeeList = [];
      this.employeeListFiltered = [];
    });
  }
}
