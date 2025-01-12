import { TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {HttpClientModule} from '@angular/common/http';
import {Apollo} from 'apollo-angular';

describe('HeaderComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, BrowserDynamicTestingModule, ApolloTestingModule, HttpClientModule],
      providers:[Apollo],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
