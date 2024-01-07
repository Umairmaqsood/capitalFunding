import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-users-get-payment-history',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <ng-container *ngIf="!isAsyncCall"> </ng-container>

      <p>users-get-payment-history works!</p>

      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </div>
  `,
  styles: ``,
  imports: [AsyncSpinnerComponent, CommonModule, MaterialModule],
})
export class UsersGetPaymentHistoryComponent {
  isAsyncCall = false;
  userId: any;
  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    this.getPaymentHistory();
  }

  page = 1;
  pageSize = 10;

  getPaymentHistory() {
    this.isAsyncCall = true;
    this.authService
      .getPaymentHistory(this.userId, this.page, this.pageSize)
      .subscribe(
        (res) => {
          if (res) {
            console.log(res, 'paymenthistory');
            this.isAsyncCall = false;
          }
        },
        (error) => {
          console.error('An error occurred:', error);
          this.isAsyncCall = false;
          this.error();
        }
      );
  }
  error(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`AN ERROR OCCURED!`, 'X', config);
  }
}
