import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-users-get-payment-history',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>

      <ng-container *ngIf="!isAsyncCall">
        <h1 style="font-weight:bold">Payment History</h1>
        <div>
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                ID
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [matTooltip]="truncateText(element.id, 100)"
              >
                {{ truncateText(element.id, 8) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="tenantId">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Tenant ID
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [matTooltip]="truncateText(element.tenantId, 100)"
              >
                {{ truncateText(element.tenantId, 8) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="rent">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Rent
              </th>
              <td mat-cell *matCellDef="let element">{{ element.rent }}</td>
            </ng-container>

            <ng-container matColumnDef="areaMaintainienceFee">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Area Maintenance Fee
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.areaMaintainienceFee }}
              </td>
            </ng-container>

            <ng-container matColumnDef="isLate">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color: #2c3e50; color: white"
              >
                Is Late
              </th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="custom-badge"
                  [ngClass]="element.isLate ? 'false' : 'true'"
                >
                  {{ element.isLate ? 'Late' : 'On Time' }}
                </span>
              </td>
            </ng-container>

            <!-- Late Fee Column -->
            <ng-container matColumnDef="lateFee">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Late Fee
              </th>
              <td mat-cell *matCellDef="let element">{{ element.lateFee }}</td>
            </ng-container>

            <ng-container matColumnDef="isPayable">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Status
              </th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="custom-badge"
                  [ngClass]="element.isPayable ? 'true' : 'false'"
                >
                  {{ element.isPayable ? 'Payed' : 'Unpayed' }}
                </span>
              </td>
            </ng-container>

            <!-- Rent Payed At Column -->
            <ng-container matColumnDef="rentPayedAt">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Rent Payed At
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.rentPayedAt | date : 'dd-MM-yyyy' }}
              </td>
            </ng-container>

            <!-- Month Column -->
            <ng-container matColumnDef="month">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Month
              </th>
              <td mat-cell *matCellDef="let element">{{ element.month }}</td>
            </ng-container>

            <!-- Header and Row Definitions -->
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              style="cursor:pointer"
              class="cellColor row"
              *matRowDef="let row; columns: displayedColumns"
            ></tr>
          </table>

          <mat-paginator
            #paginator
            [pageSize]="10"
            [pageSizeOptions]="[5, 10, 20, 100]"
            showFirstLastButtons
          ></mat-paginator>
        </div>
      </ng-container>
    </div>
  `,
  styles: [
    `
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

      .false {
        background-color: red;
        color: white;
      }

      .true {
        background-color: green;
        color: white;
      }
    `,
  ],
  imports: [AsyncSpinnerComponent, CommonModule, MaterialModule],
})
export class UsersGetPaymentHistoryComponent {
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
    this.getPaymentHistory();
  }

  truncateText(text: string, maxLength: number): string {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  dataSource = new MatTableDataSource([]);

  page = 1;
  pageSize = 10;

  getPaymentHistory() {
    this.isAsyncCall = true;
    this.authService
      .getPaymentHistory(this.userId, this.page, this.pageSize)
      .subscribe(
        (res) => {
          if (res) {
            const data = res?.results?.items;
            this.dataSource = new MatTableDataSource(data);
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
