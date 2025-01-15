import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {DetailPageService} from './detail-page.service';
import {MatCardModule} from '@angular/material/card';
import {AsyncPipe, CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

export interface Transaction {
  id: number;
  amount: number;
  currencyCode: string;
  timestamp: string;
  description: string;
  currencyRate: number;
  otherParty: {
    name: string;
    iban: string;
  };
}

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  imports: [
    MatCardModule,
    AsyncPipe,
    NgIf,
    MatIconModule,
    MatButton,
    CurrencyPipe,
    DatePipe,
    MatProgressSpinner
  ],
  standalone: true,
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  public transactionIdDetail$!: Observable<Transaction>;
  id!: number | null;

  constructor(
    private route: ActivatedRoute,
    private readonly detailPageService: DetailPageService
  ) {}

  ngOnInit(): void {
    // Get the ID from the route parameters
    const id = this.route.snapshot.paramMap.get('id');
    this.id = id ? Number(id) : null;

    if (this.id !== null) {
      // Fetch transaction details only if the ID is valid
      this.transactionIdDetail$ = this.detailPageService.getTransactionById(this.id);
    } else {
      console.error('Invalid transaction ID');
    }
  }

  onBack():void {
    window.history.back();
  }
}

