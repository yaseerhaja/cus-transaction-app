import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {HomeService} from './home.service';
import {catchError, Observable, of} from 'rxjs';
import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {Router} from '@angular/router';

interface Transaction {
  id: number;
  amount: number;
  currencyCode: string;
  timestamp: string;
  otherParty: {
    name: string;
  };
}

interface Day {
  id: string;
  transactions: Transaction[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatChipsModule,
    NgIf, NgForOf, AsyncPipe, MatCardModule, DatePipe, CurrencyPipe, NgClass],
  providers: [HomeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public transactionList$: Observable<Day[]>;
  readonly panelOpenState = signal(false);

  @ViewChild('dataSort', { static: true }) dataSort: MatSort | undefined;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator | undefined;
  public hasError: boolean | undefined;

  constructor(
    private readonly homeService: HomeService,
    private readonly router: Router) {
    this.transactionList$ = new Observable<Day[]>();
  }

  ngOnInit(): void {
    // Fetch transactions as an observable
    this.transactionList$ = this.homeService.getAllTransactions().pipe(
      catchError(() => {
        this.hasError = true;
        return of([]);
      })
    );
  }

  trackByTransactionId(index: number, transaction: Transaction): string  {
    return transaction.timestamp;
  }

  trackByDayId(index: number, day: Day): string {
    return day.id;
  }

  showDetailedTransaction(e: Event, transaction: Transaction): void {
    e.preventDefault();

    this.router.navigate(['/detail-page', transaction.id]);
  }

  getTimestamp(timestamp: string):string{
    const date = new Date(timestamp);

    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}, ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
  }
}
