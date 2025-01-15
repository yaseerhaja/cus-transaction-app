import { TestBed } from '@angular/core/testing';
import {DetailPageService, Transaction} from './detail-page.service';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';

// Create mock data for the query response
const mockTransaction: Transaction = {
  id: 42,
  timestamp: '2022-11-08T12:45:47.123456',
  amount: -25.95,
  currencyCode: 'EUR',
  currencyRate: 1.13,
  description: 'Gym',
  otherParty: {
    name: 'Gym be fit',
    iban: 'NL00RABO0123456789'
  }
};

describe('DetailPageService', () => {
  let service: DetailPageService;
  let apollo: jasmine.SpyObj<Apollo>;

  beforeEach(() => {
    // Mock the Apollo service
    apollo = jasmine.createSpyObj('Apollo', ['query']);

    // Configure the TestBed
    TestBed.configureTestingModule({
      providers: [
        DetailPageService,
        { provide: Apollo, useValue: apollo }
      ]
    });

    service = TestBed.inject(DetailPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return transaction data when getTransactionById is called', (done) => {
    apollo.query.and.returnValue(of({
      loading: false, networkStatus: 7,
      data: {
        getTransactionById: mockTransaction
      }
    }));

    service.getTransactionById(42).subscribe((transaction) => {
      expect(transaction).toEqual(mockTransaction);
      done();
    });

    expect(apollo.query).toHaveBeenCalledWith(jasmine.objectContaining({
      variables: { transactionId: 42 }
    }));
  });

  it('should return an empty response for null transaction ID', (done) => {
    apollo.query.and.returnValue(of({
      loading: false, networkStatus: 7,
      data: {
        getTransactionById: null
      }
    }));

    service.getTransactionById(null).subscribe((transaction) => {
      expect(transaction).toBeNull();
      done();
    });

    expect(apollo.query).toHaveBeenCalledWith(jasmine.objectContaining({
      variables: { transactionId: null }
    }));
  });
});
