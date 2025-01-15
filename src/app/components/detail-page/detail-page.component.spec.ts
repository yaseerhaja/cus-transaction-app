import { ComponentFixture, TestBed } from '@angular/core/testing';
import {DetailPageComponent, Transaction} from './detail-page.component';
import { ActivatedRoute } from '@angular/router';
import { DetailPageService } from './detail-page.service';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailPageComponent', () => {
  let component: DetailPageComponent;
  let fixture: ComponentFixture<DetailPageComponent>;
  let mockDetailPageService: jasmine.SpyObj<DetailPageService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Create the spy object for the service
    mockDetailPageService = jasmine.createSpyObj('DetailPageService', ['getTransactionById']);

    // Create a mock ActivatedRoute to simulate the route parameter
    mockActivatedRoute = {
      snapshot: {
        paramMap: new Map([['id', '42']])
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButton,
        MatProgressSpinner,
        CurrencyPipe,
        DatePipe,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DetailPageService, useValue: mockDetailPageService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch transaction details on init when valid ID is provided', () => {
    const mockTransaction: Transaction = {
      id: 42,
      amount: 100.0,
      currencyCode: 'USD',
      timestamp: '2022-12-01T00:00:00',
      otherParty: { name: 'Company ABC', iban: 'sdsd' },
      description: "test description",
      currencyRate: 1.23
    };

    mockDetailPageService.getTransactionById.and.returnValue(of(mockTransaction));

    component.ngOnInit();

    expect(mockDetailPageService.getTransactionById).toHaveBeenCalledWith(42);
    component.transactionIdDetail$.subscribe(transaction => {
      expect(transaction).toEqual(mockTransaction);
    });
  });

  it('should not fetch transaction details when ID is invalid', () => {
    mockActivatedRoute.snapshot.paramMap = new Map([['id', 'invalid']]);
    component.ngOnInit();

    expect(component.transactionIdDetail$).toBeUndefined();
  });

  it('should call onBack and navigate back to the previous page', () => {
    const backSpy = spyOn(window.history, 'back');

    component.onBack();

    expect(backSpy).toHaveBeenCalled();
  });
});
