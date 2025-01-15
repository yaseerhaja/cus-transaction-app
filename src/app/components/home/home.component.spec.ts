import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {GetAllTransactionsResponse, HomeService} from './home.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { NgIf, NgForOf, AsyncPipe } from '@angular/common';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {Apollo} from 'apollo-angular';
import {ApolloQueryResult} from '@apollo/client';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHomeService: jasmine.SpyObj<HomeService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let apollo: Apollo;
  const mockApollo = {
    query: jasmine.createSpy('query').and.returnValue(
      of<ApolloQueryResult<GetAllTransactionsResponse>>({
        loading: false, networkStatus: 7,
        data: {
          getAllTransactions: [
            {
              __typename: 'Day',
              id: '2022-11-08',
              transactions: [
                {
                  id: 1,
                  amount: -25.95,
                  currencyCode: 'EUR',
                  timestamp: '2022-11-08T12:45:47.123456',
                  otherParty: { name: 'Miss Y' },
                },
              ],
            },
          ],
        }
      })
    ),
  };

  beforeEach(async () => {
    // Create mock instances of services
    mockHomeService = jasmine.createSpyObj('HomeService', ['getAllTransactions']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Configure the TestBed
    await TestBed.configureTestingModule({
      imports: [
        NgIf, NgForOf, AsyncPipe,
        DatePipe, CurrencyPipe,
      ],
      providers: [
        { provide: HomeService, useValue: mockHomeService },
        { provide: Router, useValue: mockRouter },
        { provide: Apollo, useValue: mockApollo },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    apollo = TestBed.inject(Apollo);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call HomeService.getAllTransactions on ngOnInit and populate transactionList$', () => {
    const mockTransactions = [
      { __typename: 'Day', id: '2022-11-08', transactions: [{ id: 1, amount: 25, currencyCode: 'USD', timestamp: '2022-11-08T10:00:00', otherParty: { name: 'Party 1' } }] }
    ];

    // Set up the mock service to return mock data
    mockHomeService.getAllTransactions.and.returnValue(of(mockTransactions));

    fixture.detectChanges();

    // Verify that transactionList$ has been populated correctly
    component.transactionList$.subscribe((transactions) => {
      expect(transactions.length).toBe(1);
      expect(transactions[0].id).toBe('2022-11-08');
    });
  });

  it('should correctly track transactions by id', () => {
    const transaction = { id: 1, amount: 100, currencyCode: 'USD', timestamp: '2022-11-08T10:00:00', otherParty: { name: 'Party 1' } };
    expect(component.trackByTransactionId(0, transaction)).toBe('2022-11-08T10:00:00');
  });

  it('should correctly track days by id', () => {
    const day = { __typename: 'Day', id: '2022-11-08', transactions: [] };
    expect(component.trackByDayId(0, day)).toBe('2022-11-08');
  });

  it('should navigate to the detail page on showDetailedTransaction', () => {
    const mockEvent = new Event('click');
    const transaction = { id: 1, amount: 100, currencyCode: 'USD', timestamp: '2022-11-08T10:00:00', otherParty: { name: 'Party 1' } };

    component.showDetailedTransaction(mockEvent, transaction);

    // Verify navigation
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/detail-page', 1]);
  });

  it('should correctly format the timestamp', () => {
    const timestamp = '2022-11-08T10:00:00';
    const formattedTimestamp = component.getTimestamp(timestamp);
    expect(formattedTimestamp).toBe('2022/11/08, 10:00:00');
  });
});
