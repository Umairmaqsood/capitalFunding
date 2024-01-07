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
    <ng-container class="center-container" *ngIf="!isAsyncCall">
      <div class="center-div custom-text">
        <div class="card p-4 rounded">
          <div style="display:flex; justify-content:space-between">
            <span class="subheading">Your Current Balance</span>

            <span class="custom-badge" [ngClass]="isLate ? 'late' : 'not-late'">
              {{ isLate ? 'Late' : 'On Time' }}
            </span>
          </div>

          <span style="color:blue; font-weight:bold; font-size:25px"
            >$ {{ areaMaintainienceFee + lateFee + rent ?? 0 }}
          </span>
          <br />

          <span class="font-italic" style="font-size:21px">{{
            getCurrentMonth()
          }}</span>
          <br />
          <table class="table table-bordered mt-4" style="margin-top: 10px;">
            <thead class="thead-dark">
              <tr>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rent</td>
                <td>$ {{ rent ?? 0 }}</td>
              </tr>
              <tr>
                <td>Common Area Maintenance</td>
                <td>$ {{ areaMaintainienceFee ?? 0 }}</td>
              </tr>

              <tr>
                <td>Late Fee</td>
                <td>$ {{ lateFee ?? 0 }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total Balance</td>
                <td>$ {{ areaMaintainienceFee + lateFee + rent ?? 0 }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </ng-container>

    <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
  `,
  styles: [
    `
      .custom-text {
        font-family: 'Roboto', sans-serif;
        font-size: 21px;
        color: #333;
        font-weight: normal;
        line-height: 1.5;
      }

      .subheading {
        font-size: 25px;
        font-weight: bold;
        color: #2d3436;
      }

      #fixedButton {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
      }
      .custom-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 5px;
        font-weight: bold;
        animation: blink 1.5s infinite;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .late {
        background-color: red;
        color: white;
      }

      .not-late {
        background-color: green;
        color: white;
      }

      .center-div {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 65%;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
      }

      .center-div .card {
        background-color: transparent;
        border: none;
      }

      .center-div .table {
        border-collapse: collapse;
        width: 100%;
      }

      .center-div .table th {
        background-color: #007bff;
        color: white;
        text-align: left;
      }

      .center-div .table th,
      .center-div .table td {
        border: none;
      }

      .center-div .table tbody tr {
        border-bottom: 1px solid #dee2e6;
      }

      @@media (max-width: 768px) {
        .center-div {
          max-width: 90%;
        }
      }
    `,
  ],
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
})
export class UsersGetMonthlyFairComponent {
  isAsyncCall = false;
  userId: any;
  rent: any;
  areaMaintainienceFee: any;
  isLate: any;
  lateFee: any;
  sum: any;

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
  ) {
    this.sum = this.rent + this.areaMaintainienceFee + this.lateFee;
  }

  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    console.log(this.userId, 'UserId');
    this.getMonthlyFair();
  }

  getCurrentMonth(): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();

    return months[currentMonth];
  }
  getMonthlyFair() {
    this.isAsyncCall = true;
    this.authService.getMontlyFair(this.userId).subscribe(
      (res) => {
        if (res) {
          console.log(res, 'monthlyfair');
          const data = res.results;
          this.rent = res.results.rent;
          this.areaMaintainienceFee = res.results.areaMaintainienceFee;
          this.isLate = res.results.isLate;
          this.lateFee = res.results.lateFee;

          // this.dataSource = new MatTableDataSource(data);
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
