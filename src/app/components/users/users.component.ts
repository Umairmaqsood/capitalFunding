import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UsersTenantsDataDialogComponent } from '../users-tenants-data-dialog/users-tenants-data-dialog.component';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

export interface UsersData {
  id: string;
  name: string;
  email: string;
  gender: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

const usersData: UsersData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    gender: 'male',
    role: 'admin',
    isActive: true,
    isEmailVerified: true,
  },
  // Add more user data here as needed
];
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: ` <div style="padding: 30px">
    <p>User Data works!</p>

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

      <button mat-raised-button (click)="createUsersDataDialog({})">
        Create
      </button>
    </div>

    <div>
      <div class="mat-elevation-z8">
        <table mat-table [dataSource]="dataSource">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th mat-header-cell *matHeaderCellDef>ID</th>
            <td mat-cell *matCellDef="let element">{{ element.id }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="name">
            <th mat-header-cell *matHeaderCellDef>Name</th>
            <td mat-cell *matCellDef="let element">{{ element.name }}</td>
          </ng-container>

          <!-- Email Column -->
          <ng-container matColumnDef="email">
            <th mat-header-cell *matHeaderCellDef>Email</th>
            <td mat-cell *matCellDef="let element">{{ element.email }}</td>
          </ng-container>

          <!-- Gender Column -->
          <ng-container matColumnDef="gender">
            <th mat-header-cell *matHeaderCellDef>Gender</th>
            <td mat-cell *matCellDef="let element">{{ element.gender }}</td>
          </ng-container>

          <!-- Role Column -->
          <ng-container matColumnDef="role">
            <th mat-header-cell *matHeaderCellDef>Role</th>
            <td mat-cell *matCellDef="let element">{{ element.role }}</td>
          </ng-container>

          <!-- Active Column -->
          <ng-container matColumnDef="isActive">
            <th mat-header-cell *matHeaderCellDef>Active</th>
            <td mat-cell *matCellDef="let element">{{ element.isActive }}</td>
          </ng-container>

          <!-- Email Verified Column -->
          <ng-container matColumnDef="isEmailVerified">
            <th mat-header-cell *matHeaderCellDef>Email Verified</th>
            <td mat-cell *matCellDef="let element">
              {{ element.isEmailVerified }}
            </td>
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
                <mat-option (click)="updateUsersDataDialog(row)">
                  Update<mat-icon style="color:#2E7D32">update</mat-icon>
                </mat-option>
                <mat-option>
                  Delete<mat-icon style="color:#E53935">delete</mat-icon>
                </mat-option>
                <mat-option (click)="viewUsersDataDialog(row)">
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
        </table>

        <!-- Pagination -->
        <mat-paginator
          [pageSizeOptions]="[5, 10, 25, 100]"
          showFirstLastButtons
        ></mat-paginator>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .cellColor:hover {
        cursor: pointer;
        background-color: lightgreen !important;
      }
    `,
  ],
})
export class UsersComponent {
  isAsyncCall = false;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gender',
    'role',
    'isActive',
    'isEmailVerified',
    'action',
  ];
  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  dataSource = new MatTableDataSource(usersData);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createUsersDataDialog(item: any) {
    const dialog = this.dialog.open(UsersTenantsDataDialogComponent, {
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
  updateUsersDataDialog(item: UsersData) {
    const dialog = this.dialog.open(UsersTenantsDataDialogComponent, {
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
  viewUsersDataDialog(item: UsersData) {
    const dialog = this.dialog.open(UsersTenantsDataDialogComponent, {
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
