import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-users-complaints',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <ng-container *ngIf="!isAsyncCall"> </ng-container>

      <p>users-get-payment-history works!</p>

      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </div>
  `,
  styles: ['.full{width:100%}'],
  imports: [
    AsyncSpinnerComponent,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ],
})
export class GetUsersComplaintsComponent {
  isAsyncCall = false;

  tenantName: any[] = [];

  userId: any;
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('Id');

    this.getUsersComplaints();
  }

  page = 1;
  pageSize = 10;

  getUsersComplaints() {
    this.isAsyncCall = true;
    this.authService.getUsersComplaints(this.userId).subscribe(
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
