import {Injectable} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

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
  __typename: string;
  id: string;
  transactions: Transaction[];
}

export interface GetAllTransactionsResponse {
  getAllTransactions: Day[];
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly apollo: Apollo) {}

  getAllTransactions(): Observable<Day[]> {
    return this.apollo
    .query<GetAllTransactionsResponse>({
      query: gql`
        query GetAllTransactions {
          getAllTransactions {
            __typename
            id
            transactions {
              id
              amount
              currencyCode
              timestamp
              otherParty {
                name
              }
            }
          }
        }
      `,
    })
    .pipe(
      map((result) => {
        return result.data.getAllTransactions;
      })
    );
  }
}
