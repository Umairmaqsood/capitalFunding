import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-users-get-monthly-fair',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: ` <p>users-get-monthly-fair works!</p> `,
  styles: ``,
})
export class UsersGetMonthlyFairComponent {
  isAsyncCall = false;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getMonthlyFair();
  }

  getMonthlyFair() {
    this.isAsyncCall = true;
    this.authService.getMontlyFair().subscribe((res) => {
      if (res) {
        console.log(res, 'monthlyfair');
      }
    });
    this.isAsyncCall = false;
  }
}
