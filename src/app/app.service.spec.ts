import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AppService', () => {
  let appService: AppService;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a mock Router
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppService,
        { provide: Router, useValue: mockRouter }
      ]
    });

    appService = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(appService).toBeTruthy();
  });

  it('should get currentUserValue correctly', () => {
    const user = { id: 1, name: 'Test User' };
    appService.currentUserValue = user;

    expect(appService.currentUserValue).toEqual(user);
  });

  it('should set currentUserValue correctly', () => {
    const user = { id: 2, name: 'New User' };
    appService.currentUserValue = user;

    expect(appService.currentUserValue).toEqual(user);
  });

  it('should call identifyLogin and set user to localStorage', () => {
    const formData = { username: 'testuser', password: 'password123' };
    const mockResponse = { id: 1, username: 'Test User' };

    // Spy on HttpClient's post method
    spyOn(appService['httpClient'], 'post').and.returnValue(of(mockResponse));

    appService.identifyLogin(formData).subscribe((user) => {
      expect(user).toEqual(mockResponse);
      expect(localStorage.getItem('currentUser')).toBeTruthy();
      expect(appService.currentUserValue).toEqual(mockResponse);
    });
  });

  it('should logout user and redirect to login page', () => {
    localStorage.setItem('currentUser', JSON.stringify({ id: 1, name: 'Test User' })); // Mock logged-in user
    appService.logout();

    // Check if localStorage is cleared
    expect(localStorage.getItem('currentUser')).toBeNull();
    expect(appService.currentUserValue).toBeNull();

    // Check if navigate was called
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  afterEach(() => {
    httpMock.verify();  // Ensure no outstanding HTTP requests
  });
});
