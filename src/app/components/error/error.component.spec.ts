import { TestBed } from '@angular/core/testing';

import { ErrorComponent } from './error.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';


describe('ErrorComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorComponent, BrowserDynamicTestingModule, ApolloTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ErrorComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
