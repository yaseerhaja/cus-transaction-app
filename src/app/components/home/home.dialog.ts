import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormGroup, FormBuilder, Validators, ReactiveFormsModule} from '@angular/forms';
import {AppService} from '../../app.service';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-home-dialog',
  templateUrl: './home.dialog.html',
  standalone: true,
  imports: [
    NgIf,
    MatButton,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  styleUrls: ['./home.dialog.scss']
})
export class HomeDialogComponent implements OnInit {
  newEmpFormGroup: FormGroup | undefined;
  responseData! : string;
  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    private formBuilder: FormBuilder,
    private appService: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.newEmpFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      age: ['', [Validators.required]]
    });
  }

  createNewEmployee(e: Event) {
    if (e) {
      e.preventDefault();
    }

    this.newEmpFormGroup?.markAllAsTouched();
    const formIns = this.newEmpFormGroup?.getRawValue();

    // stop here if form is invalid
    if (this.newEmpFormGroup?.invalid) {
      return;
    }
    const formData = { name: formIns.name, salary: parseInt(formIns.salary, 10), age: parseInt(formIns.age, 10) };

    this.appService.createEmployee(formData).subscribe((response: any) => {
      this.newEmpFormGroup?.reset();
      this.responseData = 'success';
    }, (err) => {
      this.responseData = 'failure';
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  closeForm(){
    this.dialogRef.close();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newEmpFormGroup?.controls[controlName].hasError(errorName);
  }

  resetForm() {
    this.newEmpFormGroup?.reset();
  }
}
