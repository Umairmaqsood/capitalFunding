import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';

@Component({
  selector: 'app-users-get-monthly-fair',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <ng-container *ngIf="!isAsyncCall"> </ng-container>

      <p>users-get-monthly-fair works!</p>

      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </div>
  `,
  styles: ``,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
})
export class UsersGetMonthlyFairComponent {
  isAsyncCall = false;
  userId: any;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  async ngOnInit() {
    this.userId = await localStorage.getItem('Id');
    console.log(this.userId, 'UserId');
    this.getMonthlyFair();
  }

  getMonthlyFair() {
    this.isAsyncCall = true;
    this.authService.getMontlyFair(this.userId).subscribe(
      (res) => {
        if (res) {
          console.log(res, 'monthlyfair');
          this.isAsyncCall = false;
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        this.isAsyncCall = false;
      }
    );
  }
}
