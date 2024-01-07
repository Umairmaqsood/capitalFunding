import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-get-monthly-fair',
  standalone: true,
  template: `
    <ng-container *ngIf="!isAsyncCall">
      <mat-card
        style=" padding: 20px 40px; 
         display:block; margin:20px auto;border-radius: 10px;width:600px"
      >
        <h1 style="text-align:center; font-weight:bold">Get Monthly Fair</h1>
      </mat-card>
    </ng-container>

    <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
  `,
  styles: ``,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
})
export class UsersGetMonthlyFairComponent {
  isAsyncCall = false;
  userId: any;

  displayedColumns: string[] = [
    'id',
    'tenantId',
    'rent',
    'areaMaintainienceFee',
    'isLate',
    'lateFee',
    'isPayable',
    'rentPayedAt',
    'month',
  ];

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    console.log(this.userId, 'UserId');
    this.getMonthlyFair();
  }
  dataSource = new MatTableDataSource([]);

  getMonthlyFair() {
    this.isAsyncCall = true;
    this.authService.getMontlyFair(this.userId).subscribe(
      (res) => {
        if (res) {
          console.log(res, 'monthlyfair');
          const data = res.results;
          this.dataSource = new MatTableDataSource(data);
          this.isAsyncCall = false;
        } else {
          this.error();
          this.isAsyncCall = false;
        }
      },
      (error) => {
        this.error();
        this.isAsyncCall = false;
      }
    );
  }

  error(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`AN ERROR OCCURED!`, 'X', config);
  }
}
