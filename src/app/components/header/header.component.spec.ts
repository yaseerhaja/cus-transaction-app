import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';


import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import {AppService} from '../../app.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockAppService: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    // Create mock instance of AppService
    mockAppService = jasmine.createSpyObj('AppService', ['logout'], {
      currentUserValue: { username: 'testUser' }
    });

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        NgIf
      ],
      providers: [
        { provide: AppService, useValue: mockAppService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout when logout() is triggered', () => {
    component.logout(new Event('click'));

    expect(mockAppService.logout).toHaveBeenCalled();
  });

  it('should not call logout if no event is triggered', () => {
    component.logout(new Event('click'));
    expect(mockAppService.logout).toHaveBeenCalled();
  });
});
