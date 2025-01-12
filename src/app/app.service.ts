import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class AppComponentService {
  constructor(private readonly apollo: Apollo) {}

  getHello() {
    return this.apollo.query({
      query: gql`
        query {
          hello
        }
      `,
    });
  }
}
