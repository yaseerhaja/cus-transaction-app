import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppComponentService } from './app.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, BrowserDynamicTestingModule, ApolloTestingModule],
      providers:[AppComponentService],
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

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, cus-transaction-app');
  });
});
