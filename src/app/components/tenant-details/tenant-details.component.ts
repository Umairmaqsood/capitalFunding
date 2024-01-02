import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/src/public-api';
import { TenantsDetailsResidencyDialogComponent } from '../tenants-details-residency-dialog/tenants-details-residency-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface TenantResidencyInfo {
  id: string;
  userId: string;
  propertyId: string;
  movedIn: Date;
  movedOut: Date | null;
}

const TENANT_RESIDENCY_DATA: TenantResidencyInfo[] = [
  {
    id: '1',
    userId: 'U001',
    propertyId: 'P001',
    movedIn: new Date('2023-01-01'),
    movedOut: new Date('2023-12-31'),
  },
  {
    id: '2',
    userId: 'U002',
    propertyId: 'P002',
    movedIn: new Date('2024-02-15'),
    movedOut: null,
  },
  // Add more dummy data as needed
];
@Component({
  selector: 'app-tenant-details',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <div style="padding: 30px">
      <p>tenant-details works!</p>

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

        <button mat-raised-button (click)="createTenantPaymentResidency({})">
          Create
        </button>
      </div>

      <div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <!-- Define your columns as per your requirements -->
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{ element.id }}</td>
          </ng-container>

          <!-- Tenant ID Column -->
          <ng-container matColumnDef="userId">
            <th mat-header-cell *matHeaderCellDef>User ID</th>
            <td mat-cell *matCellDef="let element">{{ element.userId }}</td>
          </ng-container>

          <!-- Property ID Column -->
          <ng-container matColumnDef="propertyId">
            <th mat-header-cell *matHeaderCellDef>Property ID</th>
            <td mat-cell *matCellDef="let element">{{ element.propertyId }}</td>
          </ng-container>

          <!-- Moved In Column -->
          <ng-container matColumnDef="movedIn">
            <th mat-header-cell *matHeaderCellDef>Moved In</th>
            <td mat-cell *matCellDef="let element">{{ element.movedIn }}</td>
          </ng-container>

          <!-- Moved Out Column -->
          <ng-container matColumnDef="movedOut">
            <th mat-header-cell *matHeaderCellDef>Moved Out</th>
            <td mat-cell *matCellDef="let element">{{ element.movedOut }}</td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th mat-header-cell *matHeaderCellDef>Action</th>
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
                <mat-option>
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
export class TenantDetailsComponent {
  displayedColumns: string[] = [
    'id',
    'userId',
    'propertyId',
    'movedIn',
    'movedOut',
    'action',
  ];

  constructor(private dialog: MatDialog) {}

  dataSource = new MatTableDataSource(TENANT_RESIDENCY_DATA);

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
        console.log(res, 'response');
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
        console.log(res, 'response');
      }
    });
  }
}
