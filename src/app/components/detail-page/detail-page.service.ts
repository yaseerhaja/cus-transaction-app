import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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

interface GetTransactionsByIdResponse {
  getTransactionById: Transaction;
}

@Injectable({
  providedIn: 'root',
})
export class DetailPageService {
  constructor(private readonly apollo: Apollo) {}

  getTransactionById(id: number | null): Observable<Transaction> {
    return this.apollo
    .query<GetTransactionsByIdResponse>({
      query :gql`
        query GetTransactionById($transactionId: Int!)  {
          getTransactionById(transactionId: $transactionId) {
            id
            timestamp
            amount
            currencyCode
            currencyRate
            description
            otherParty {
              name
              iban
            }
          }
         }`,
        variables: {
          "transactionId": id,
        },
    })
    .pipe(
      map((result) => {
        return result.data.getTransactionById
      })
    );
  }
}
