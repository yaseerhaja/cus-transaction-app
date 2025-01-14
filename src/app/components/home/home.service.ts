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

interface GetAllTransactionsResponse {
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
        console.log(result.data.getAllTransactions)
        return result.data.getAllTransactions;



        // // Normalize transactions to always have amounts in EUR
        // return data.map((day) => ({
        //   ...day,
        //   transactions: day.transactions.map((transaction) => ({
        //     ...transaction,
        //     amount: this.convertToEur(
        //       transaction.amount,
        //       transaction.currencyCode
        //     ),
        //     currencyCode: 'EUR', // Override to EUR
        //   })),
        // }));
      })
    );
  }

  /**
   * Converts a given amount to EUR based on the currencyCode.
   * Currently supports USD-to-EUR conversion. Assumes 1.173628 as the USD-to-EUR rate.
   */
  private convertToEur(amount: number, currencyCode: string): number {
    const conversionRates: { [key: string]: number } = {
      USD: 1.173628,
    };

    if (currencyCode === 'USD') {
      return amount / conversionRates['USD'];
    }

    // Assume already in EUR for other cases
    return amount;
  }
}
