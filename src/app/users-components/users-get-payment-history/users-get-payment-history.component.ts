import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-users-get-payment-history',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>

      <ng-container *ngIf="!isAsyncCall">
        <h1 style="font-weight:bold">Payment History</h1>
        <div>
          <table
            mat-table
            [dataSource]="dataSource"
            matSort
            class="mat-elevation-z8"
          >
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
                  {{ element.isPayable ? 'Unpayed' : 'Payed' }}
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
            [length]="resultsLength"
            [pageIndex]="pageIndex"
            [pageSize]="pageSize"
            [pageSizeOptions]="pageSizeOptions"
            (page)="onPageChange($event)"
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

      .true {
        background-color: red;
        color: white;
      }

      .false {
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
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 5, 10, 20, 100];
  displayedColumns: string[] = [
    'id',
    'rent',
    'areaMaintainienceFee',
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

  getPaymentHistory() {
    this.isAsyncCall = true;
    this.authService
      .getPaymentHistory(this.userId, this.pageIndex + 1, this.pageSize)
      .subscribe(
        (res) => {
          if (res) {
            const data = res?.results?.items;
            this.dataSource = new MatTableDataSource(data);
            this.resultsLength = res?.results?.totalCount;
            this.isAsyncCall = false;

            // Reset paginator after filtering
            if (this.paginator) {
              this.paginator.firstPage();
            }
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

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sort.sortChange.emit(this.sort);
    this.getPaymentHistory();
  }
}
