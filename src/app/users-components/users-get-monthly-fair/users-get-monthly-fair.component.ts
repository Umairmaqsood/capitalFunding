import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';

@Component({
  selector: 'app-users-get-monthly-fair',
  standalone: true,
  template: `
    <ng-container class="center-container" *ngIf="!isAsyncCall">
      <div class="center-div custom-text">
        <div class="card p-4 rounded">
          <div style="display:flex; justify-content:space-between">
            <span class="subheading">Your Current Balance</span>

            <span
              *ngIf="
                !(conditionalRendring === 0 || conditionalRendring == null)
              "
              class="custom-badge"
              [ngClass]="isLate ? 'late' : 'outstanding-badge'"
            >
              {{ isLate ? 'Late' : 'Outstanding Amount' }}
            </span>
          </div>

          <span style="color:#4848e3; font-weight:bold; font-size:25px"
            >$ {{ (areaMaintainienceFee ?? 0) + (lateFee ?? 0) + (rent ?? 0) }}
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
                <td>Maintenance</td>
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
                <td>
                  $
                  {{
                    (areaMaintainienceFee ?? 0) + (lateFee ?? 0) + (rent ?? 0)
                  }}
                </td>
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
        padding: 4px 8px;
        color: white;
        border-radius: 7px;
        font-weight: 500;
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
        background-color: #d5294d;
        color: white;
        animation: blink 1.5s infinite;
      }

      .outstanding-badge {
        background-color: #f1975b;
        color: white;
        animation: blink 1.5s infinite;
      }

      .center-div {
        background-color: #eaf3ff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 65%;
        margin: 0 auto;
        padding: 20px;
        box-sizing: border-box;
        margin-top: 5%;
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
        background: #005377;
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

      @media (max-width: 768px) {
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
  conditionalRendring: any;

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
          this.rent = res?.results?.rent;
          this.areaMaintainienceFee = res?.results?.areaMaintainienceFee;
          this.isLate = res?.results?.isLate;
          this.lateFee = res?.results?.lateFee;
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
