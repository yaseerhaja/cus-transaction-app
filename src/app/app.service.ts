import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {BehaviorSubject, map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
      private readonly httpClient: HttpClient,
      private readonly router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(<string>localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  public set currentUserValue(value: { id: number, name: string }) {
    this.currentUserSubject.next(value);
  }

  identifyLogin(formData: any): Observable<{id: number, username: string}> {
    return this.httpClient.post<any>('/api/login/identifyLogin', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).pipe(map(user => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }
}
