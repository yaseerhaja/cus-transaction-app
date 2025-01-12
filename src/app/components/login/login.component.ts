import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import {NgIf} from '@angular/common';
import {MatInput, MatPrefix} from '@angular/material/input';
import {AppService} from '../../app.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatInput,
    MatPrefix,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatButton,
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup | undefined;
  returnUrl: string | undefined;
  identificationError = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService) {
    // redirect to home if already logged in
    if (this.appService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(e: Event) {
    if (e) {
      e.preventDefault();
    }

    this.loginFormGroup?.markAllAsTouched();
    const formIns = this.loginFormGroup?.getRawValue();

    // stop here if form is invalid
    if (this.loginFormGroup?.invalid) {
      return;
    }

    const formData = {
      username: formIns.username,
      password: formIns.password
    };

    this.appService.identifyLogin(formData).subscribe((response: any) => {
      if (response === null) {
        this.identificationError = true;
      } else {
        this.router.navigate([this.returnUrl]);
      }
    }, () => {
      this.identificationError = true;
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginFormGroup?.controls[controlName].hasError(errorName);
  }
}
