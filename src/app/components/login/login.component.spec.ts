import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import {AppService} from '../../app.service';
import {provideAnimations} from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appService: AppService;
  let router: Router;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        provideAnimations(),
        FormBuilder,
        {
          provide: AppService,
          useValue: {
            currentUserValue: null,
            identifyLogin: jasmine.createSpy('identifyLogin').and.returnValue(of({})),
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { returnUrl: '/home' } },
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the login form', () => {
    expect(component).toBeTruthy();
    expect(component.loginFormGroup).toBeDefined();
    expect(component.loginFormGroup?.controls['username']).toBeDefined();
    expect(component.loginFormGroup?.controls['password']).toBeDefined();
  });


  it('should submit the form and navigate on successful login', () => {
    const loginData = { username: 'testUser', password: 'testPassword' };
    component.loginFormGroup?.setValue(loginData);

    component.onSubmit(new Event('submit'));

    expect(appService.identifyLogin).toHaveBeenCalledWith(loginData);

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show validation errors for invalid form input', () => {
    component.loginFormGroup?.controls['username'].setValue('');
    component.loginFormGroup?.controls['password'].setValue('');

    component.onSubmit(new Event('submit'));

    expect(component.loginFormGroup?.invalid).toBeTrue();
    expect(component.hasError('username', 'required')).toBeTrue();
    expect(component.hasError('password', 'required')).toBeTrue();
  });

  it('should redirect to the return URL after successful login', () => {
    component.returnUrl = '/somePage';
    const loginData = { username: 'validUser', password: 'validPass' };
    component.loginFormGroup?.setValue(loginData);

    component.onSubmit(new Event('submit'));

    expect(router.navigate).toHaveBeenCalledWith(['/somePage']);
  });
});
