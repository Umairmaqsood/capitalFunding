import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/src/public-api';
import { TenantsDetailsResidencyDialogComponent } from '../tenants-details-residency-dialog/tenants-details-residency-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { PropertyDetails } from '../property-details/property-details.component';
import { TenantComplaints } from '../tenant-complaints/tenant-complaints.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

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
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
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
              <td mat-cell *matCellDef="let element">{{ element.id }}</td>
            </ng-container>

            <!-- Tenant ID Column -->
            <ng-container matColumnDef="userId">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                User ID
              </th>
              <td mat-cell *matCellDef="let element">{{ element.userId }}</td>
            </ng-container>

            <!-- Property ID Column -->
            <ng-container matColumnDef="propertyId">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Property ID
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.propertyId }}
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
            #paginator
            [pageSize]="10"
            [pageSizeOptions]="[5, 10, 20, 100]"
            showFirstLastButtons
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

  displayedColumns: string[] = [
    'id',
    'userId',
    'propertyId',
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

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  page = 1;
  pageSize = 10;
  getTenantsDetailsResidency() {
    this.isAsyncCall = true;
    this.authService
      .getTenantsResidency(this.page, this.pageSize)
      .subscribe((res) => {
        if (res) {
          console.log(res, 'responseoftenantsresidency');
          const data = res.results.items;
          this.dataSource = new MatTableDataSource(data);
          this.isAsyncCall = false;
        }
      });
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
        console.log(res, 'response');
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
    this.authService.deleteTenantsResidency(item.id ?? '').subscribe((res) => {
      if (res) {
        this.deleteSnackBar();
        this.getTenantsDetailsResidency();
        this.isAsyncCall = false;
      } else {
        this.isAsyncCall = false;
      }
    });
  }

  deleteSnackBar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`DATA DELETED SUCCESSFULLY`, 'X', config);
  }
}
