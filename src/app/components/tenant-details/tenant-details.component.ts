import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/src/public-api';
import { TenantsDetailsResidencyDialogComponent } from '../tenants-details-residency-dialog/tenants-details-residency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { PropertyDetails } from '../property-details/property-details.component';
import { TenantComplaints } from '../tenant-complaints/tenant-complaints.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSort } from '@angular/material/sort';

export interface TenantResidencyInfo {
  id: string;
  userId: string;
  propertyId: string;
  movedIn: Date;
  movedOut: string | null;
}
@Component({
  selector: 'app-tenant-details',
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
          Tenants Residency Info
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
            (click)="createTenantPaymentResidency({})"
            style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:25px 30px;font-weight:bold"
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
            <!-- Define your columns as per your requirements -->
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

            <ng-container matColumnDef="userName">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                User Name
              </th>
              <td mat-cell *matCellDef="let element">{{ element.userName }}</td>
            </ng-container>

            <!-- Property ID Column -->
            <ng-container matColumnDef="propertyName">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Property Name
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.propertyName }}
              </td>
            </ng-container>

            <!-- Moved In Column -->
            <ng-container matColumnDef="movedIn">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Moved In
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.movedIn | date : 'dd-MM-yyyy' }}
              </td>
            </ng-container>

            <!-- Moved Out Column -->
            <ng-container matColumnDef="movedOut">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Moved Out
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.movedOut | date : 'dd-MM-yyyy' }}
              </td>
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
                  <mat-option (click)="updateTenantPaymentResidency(row)">
                    Update<mat-icon style="color:#2E7D32">update</mat-icon>
                  </mat-option>
                  <mat-option (click)="deleteTenantsResidency(row)">
                    Delete<mat-icon style="color:#E53935">delete</mat-icon>
                  </mat-option>
                  <mat-option (click)="viewTenantPaymentResidency(row)">
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
              <td class="mat-cell" [attr.colspan]="displayedColumns.length">
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
    `,
  ],
})
export class TenantDetailsComponent implements OnInit {
  isAsyncCall = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 5, 10, 20, 100];

  displayedColumns: string[] = [
    'id',
    'userName',
    'propertyName',
    'movedIn',
    'movedOut',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTenantsDetailsResidency();
  }

  dataSource = new MatTableDataSource([]);

  truncateText(text: string, maxLength: number): string {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTenantsDetailsResidency() {
    this.isAsyncCall = true;
    this.authService
      .getTenantsResidency(this.pageIndex + 1, this.pageSize)
      .subscribe(
        (res) => {
          if (res) {
            const data = res?.results?.items;
            this.dataSource = new MatTableDataSource(data);
            this.resultsLength = res?.results.totalCount;
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
    this.getTenantsDetailsResidency();
  }

  createTenantPaymentResidency(item: any) {
    const dialog = this.dialog.open(TenantsDetailsResidencyDialogComponent, {
      data: {
        requestType: 'create',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getTenantsDetailsResidency();
      }
    });
  }
  updateTenantPaymentResidency(item: TenantResidencyInfo) {
    const dialog = this.dialog.open(TenantsDetailsResidencyDialogComponent, {
      data: {
        requestType: 'update',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.getTenantsDetailsResidency();
      }
    });
  }
  viewTenantPaymentResidency(item: TenantResidencyInfo) {
    const dialog = this.dialog.open(TenantsDetailsResidencyDialogComponent, {
      data: {
        requestType: 'view',
        item,
      },
      width: '460px',
      height: '530px',
    });

    dialog.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }

  deleteTenantsResidency(item: TenantResidencyInfo) {
    this.isAsyncCall = true;
    this.authService.deleteTenantsResidency(item.id ?? '').subscribe(
      (res) => {
        if (res) {
          this.deleteSnackBar();
          this.getTenantsDetailsResidency();
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
