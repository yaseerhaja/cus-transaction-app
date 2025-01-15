import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  standalone: true,
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  constructor(private router: Router) {}

  goToHome(): void {
    this.router.navigate(['/']);
  }
}
