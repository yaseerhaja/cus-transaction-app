import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorComponent } from './error.component';
import { Router } from '@angular/router';

describe('ErrorComponent', () => {
  let component: ErrorComponent;
  let fixture: ComponentFixture<ErrorComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create mock instance of Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Configure TestBed
    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call navigate to home when goToHome is called', () => {
    // Call the goToHome method
    component.goToHome();

    // Verify that the navigate method of Router was called with the correct route
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});
