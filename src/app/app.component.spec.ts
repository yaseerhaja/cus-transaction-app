import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import {HttpClientModule} from "@angular/common/http";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserDynamicTestingModule, ApolloTestingModule, HttpClientModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'cus-transaction-app' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cus-transaction-app');
  });
});
