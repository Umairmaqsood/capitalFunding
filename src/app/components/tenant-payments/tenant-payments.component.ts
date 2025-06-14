import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { TenantPaymentsDialogComponent } from '../tenant-payments-dialog/tenant-payments-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSort } from '@angular/material/sort';
export interface TenantsPayment {
  id: string;
  tenantId: string;
  rent: number;
  areaMaintainienceFee: number;
  isLate: boolean;
  lateFee: number;
  rentPayedAt: string;
  month: string;
}

@Component({
  selector: 'app-tenant-payments',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: `
    <div style="padding: 40px">
      <ng-container *ngIf="!isAsyncCall">
        <!-- <div
        style="width: 100%; border-radius: 5px; padding: 5px; margin-bottom: 10px;
  background: linear-gradient(to right, red, #a80056);
"
      >
        <h1
          style="text-align: center; margin: 0; font-weight: bold; color: white;"
        >
          Tenants Payment Info
        </h1>
      </div> -->
        <div class="flex" style="justify-content: space-between">
          <mat-form-field appearance="outline">
            <mat-label>Search</mat-label>
            <input
              matInput
              (keyup)="applyFilter($event)"
              placeholder="Search Data"
              #input
            />
          </mat-form-field>

          <button
            mat-raised-button
            (click)="createTenantPaymentDialog({})"
            style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:25px 30px;font-weight:bold;"
          >
            Create
          </button>
        </div>

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

            <!-- Tenant ID Column -->
            <ng-container matColumnDef="tenantName">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Tenant Name
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.tenantName }}
              </td>
            </ng-container>

            <!-- Rent Column -->
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

            <!-- Area Maintenance Fee Column -->
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

            <!-- Is Late Column -->
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
                Is Payable
              </th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="custom-badge"
                  [ngClass]="element.isPayable ? 'false' : 'true'"
                >
                  {{ element.isPayable ? 'Payable' : 'Payed' }}
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
                <ng-container *ngIf="element.rentPayedAt; else inResidence">
                  {{ element.rentPayedAt | date : 'MMMM dd, yyyy' }}
                </ng-container>
                <ng-template #inResidence>
                  <span class="outstanding-badge">outstanding</span>
                </ng-template>
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

            <!-- Action Column -->
            <ng-container matColumnDef="action">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Action
              </th>
              <td
                mat-cell
                *matCellDef="let row"
                class="mat-cell text-center"
                style="width: 160px"
              >
                <mat-select #select placeholder="Select">
                  <mat-option (click)="updateTenantPaymentDialog(row)">
                    Update<mat-icon style="color:#2E7D32">update</mat-icon>
                  </mat-option>
                  <mat-option (click)="deleteTenantPaymentDialog(row)">
                    Delete<mat-icon style="color:#E53935">delete</mat-icon>
                  </mat-option>
                  <mat-option (click)="viewTenantPaymentDialog(row)">
                    Details<mat-icon style="color:#FFA726">details</mat-icon>
                  </mat-option>
                </mat-select>
              </td>
            </ng-container>

            <!-- Header and Row Definitions -->
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              style="cursor:pointer"
              class="cellColor row"
              *matRowDef="let row; columns: displayedColumns"
            ></tr>

            <!-- Row shown when there is no matching data -->
            <tr class="mat-row" *matNoDataRow>
              <td class="mat-cell" colspan="8">
                No data matching the filter "{{ input.value }}"
              </td>
            </tr>
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
      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </div>
  `,
  styles: [
    `
      .cellColor:hover {
        cursor: pointer;
        background-color: lightgreen !important;
      }

      .custom-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 5px;
        font-weight: 500;
      }

      @keyframes blink {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
        100% {
          opacity: 1;
        }
      }

      .true {
        background-color: #31aa70;
        color: white;
      }

      .false {
        background-color: #d5294d;
        color: white;
        animation: blink 1.5s infinite;
      }

      .outstanding-badge {
        display: inline-block;
        padding: 4px 8px;
        background-color: #f1975b;
        color: white;
        border-radius: 7px;
        font-weight: 500;
      }
    `,
  ],
})
export class TenantPaymentsComponent implements OnInit {
  isAsyncCall = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 5, 10, 20, 100];

  displayedColumns: string[] = [
    'id',
    'tenantName',
    'rent',
    'areaMaintainienceFee',
    'isLate',
    'lateFee',
    'isPayable',
    'rentPayedAt',
    'month',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getTenantsPaymentsInformations();
  }

  truncateText(text: string, maxLength: number): string {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTenantsPaymentsInformations() {
    this.isAsyncCall = true;

    this.authService
      .getTenantsPaymentsInfo(this.pageIndex + 1, this.pageSize)
      .subscribe(
        (res: any) => {
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
        (error: any) => {
          this.error();
          this.isAsyncCall = false;
        }
      );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sort.sortChange.emit(this.sort);
    this.getTenantsPaymentsInformations();
  }

  createTenantPaymentDialog(item: any) {
    const dialog = this.dialog.open(TenantPaymentsDialogComponent, {
      data: {
        requestType: 'create',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getTenantsPaymentsInformations();
      }
    });
  }
  updateTenantPaymentDialog(item: TenantsPayment) {
    const dialog = this.dialog.open(TenantPaymentsDialogComponent, {
      data: {
        requestType: 'update',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res, 'response');
        this.getTenantsPaymentsInformations();
      }
    });
  }
  viewTenantPaymentDialog(item: TenantsPayment) {
    const dialog = this.dialog.open(TenantPaymentsDialogComponent, {
      data: {
        requestType: 'view',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        console.log(res, 'response');
      }
    });
  }

  deleteTenantPaymentDialog(item: TenantsPayment) {
    this.isAsyncCall = true;
    this.authService.deleteTenantsPaymentsInfo(item.id ?? '').subscribe(
      (res) => {
        if (res) {
          this.deleteSnackBar();
          this.getTenantsPaymentsInformations();
        }
        this.isAsyncCall = false;
      },
      (error: any) => {
        console.error('Error occurred:', error);
        this.error();
        this.isAsyncCall = false;
      }
    );
  }

  deleteSnackBar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`DATA DELETED SUCCESSFULLY`, 'X', config);
  }
  error(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`AN ERROR OCCURED!`, 'X', config);
  }
}
