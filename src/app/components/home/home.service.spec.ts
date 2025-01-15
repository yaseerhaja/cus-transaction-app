import {TestBed} from '@angular/core/testing';
import {Apollo} from 'apollo-angular';
import {GetAllTransactionsResponse, HomeService} from './home.service';
import {of} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client';

describe('HomeService', () => {
  let service: HomeService;
  let apollo: Apollo;

  // Create a mock Apollo service
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HomeService,
        { provide: Apollo, useValue: mockApollo },
      ],
    });
    service = TestBed.inject(HomeService);
    apollo = TestBed.inject(Apollo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all transactions correctly', (done) => {
    service.getAllTransactions().subscribe((result) => {
      expect(result.length).toBe(1);
      expect(result[0].id).toBe('2022-11-08');
      expect(result[0].transactions.length).toBe(1);
      expect(result[0].transactions[0].amount).toBe(-25.95);

      done();
    });
  });

  it('should call Apollo.query once', () => {
    service.getAllTransactions().subscribe(() => {
      expect(mockApollo.query).toHaveBeenCalled();
    });
  });

  it('should map the response data correctly', (done) => {
    service.getAllTransactions().subscribe((result) => {
      const transaction = result[0].transactions[0];
      expect(transaction.id).toBe(1);
      expect(transaction.amount).toBe(-25.95);
      expect(transaction.currencyCode).toBe('EUR');
      expect(transaction.timestamp).toBe('2022-11-08T12:45:47.123456');
      expect(transaction.otherParty.name).toBe('Miss Y');
      done();
    });
  });
});
