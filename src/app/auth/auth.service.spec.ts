import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AppService} from '../app.service';

describe('AuthService', () => {
  let authService: AuthService;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAppService: jasmine.SpyObj<AppService>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAppService = jasmine.createSpyObj('AppService', ['currentUserValue']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter },
        { provide: AppService, useValue: mockAppService }
      ]
    });

    authService = TestBed.inject(AuthService);
  });

  it('should allow navigation when the user is logged in', () => {
    mockAppService.currentUserValue = { id: 1, username: 'testuser' };

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const result = authService.canActivate(route, state);

    expect(result).toBe(true);
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should redirect to login page when the user is not logged in', () => {

    mockAppService.currentUserValue = null;

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/some-path' } as RouterStateSnapshot;

    const result = authService.canActivate(route, state);

    expect(result).toBe(false);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login'], { queryParams: { returnUrl: '/some-path' } });
  });
});
