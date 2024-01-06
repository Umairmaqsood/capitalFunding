import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { TenantsComplaintsDialogComponent } from '../tenants-complaints-dialog/tenants-complaints-dialog.component';

export interface TenantComplaints {
  id: string;
  tenantId: string;
  title: string;
  details: string;
  isFixed: boolean;
}

const TENANT_COMPLAINTS_DATA: TenantComplaints[] = [
  {
    id: '1',
    tenantId: 'T001',
    title: 'Broken Faucet',
    details: 'Faucet in the kitchen is broken and needs fixing.',
    isFixed: false,
  },
  {
    id: '2',
    tenantId: 'T002',
    title: 'Electrical Issue',
    details: 'Some electrical outlets not working in the living room.',
    isFixed: false,
  },
];

@Component({
  selector: 'app-tenant-complaints',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: `
    <div style="padding: 30px">
      <!-- <div
        style="width: 100%; border-radius: 5px; padding: 5px; margin-bottom: 10px;
  background: linear-gradient(to right, red, #a80056);
"
      >
        <h1
          style="text-align: center; margin: 0; font-weight: bold; color: white;"
        >
          Tenants Complaints
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
          (click)="createTenantComplaintsDialog({})"
          style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:25px 30px;font-weight:bold;"
        >
          Create
        </button>
      </div>

      <div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <!-- Define columns based on the TenantComplaints interface -->
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
          <ng-container matColumnDef="tenantId">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:#2c3e50; color:white"
            >
              Tenant ID
            </th>
            <td mat-cell *matCellDef="let element">{{ element.tenantId }}</td>
          </ng-container>

          <!-- Title Column -->
          <ng-container matColumnDef="title">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:#2c3e50; color:white"
            >
              Title
            </th>
            <td mat-cell *matCellDef="let element">{{ element.title }}</td>
          </ng-container>

          <!-- Details Column -->
          <ng-container matColumnDef="details">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:#2c3e50; color:white"
            >
              Details
            </th>
            <td mat-cell *matCellDef="let element">{{ element.details }}</td>
          </ng-container>

          <!-- Is Fixed Column -->
          <ng-container matColumnDef="isFixed">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:#2c3e50; color:white"
            >
              Is Fixed
            </th>
            <td mat-cell *matCellDef="let element">{{ element.isFixed }}</td>
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
                <mat-option (click)="updateTenantsComplaintsDialog(row)">
                  Update<mat-icon style="color:#2E7D32">update</mat-icon>
                </mat-option>
                <mat-option>
                  Delete<mat-icon style="color:#E53935">delete</mat-icon>
                </mat-option>
                <mat-option (click)="viewTenantComplaintsDialog(row)">
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
export class TenantComplaintsComponent {
  isAsyncCall = false;

  displayedColumns: string[] = [
    'id',
    'tenantId',
    'title',
    'details',
    'isFixed',
    'action',
  ];

  constructor(private dialog: MatDialog) {}

  dataSource = new MatTableDataSource(TENANT_COMPLAINTS_DATA);

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

  createTenantComplaintsDialog(item: any) {
    const dialog = this.dialog.open(TenantsComplaintsDialogComponent, {
      data: {
        requestType: 'create',
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
  updateTenantsComplaintsDialog(item: TenantComplaints) {
    const dialog = this.dialog.open(TenantsComplaintsDialogComponent, {
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
      }
    });
  }
  viewTenantComplaintsDialog(item: TenantComplaints) {
    const dialog = this.dialog.open(TenantsComplaintsDialogComponent, {
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
}
