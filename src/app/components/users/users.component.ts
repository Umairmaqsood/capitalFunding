import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { UsersTenantsDataDialogComponent } from '../users-tenants-data-dialog/users-tenants-data-dialog.component';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';

export interface UsersData {
  id: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: ` <div style="padding: 40px">
    <ng-container *ngIf="!isAsyncCall">
      <!-- <div
      style="width: 100%; border-radius: 5px; padding: 5px; margin-bottom: 10px;
  background: linear-gradient(to right, red, #a80056);
"
    >
      <h1
        style="text-align: center; margin: 0; font-weight: bold; color: white;"
      >
        Tenants Details
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
          (click)="createUsersDataDialog({})"
          style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:25px 30px;font-weight:bold;"
        >
          Create
        </button>
      </div>

      <div>
        <div class="mat-elevation-z8">
          <table mat-table [dataSource]="dataSource" matSort>
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

            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Name
              </th>
              <td mat-cell *matCellDef="let element">{{ element.name }}</td>
            </ng-container>

            <!-- Email Column -->
            <ng-container matColumnDef="email">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Email
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [matTooltip]="truncateText(element.email, 100)"
              >
                {{ truncateText(element.email, 8) }}
              </td>
            </ng-container>

            <!-- Password Column -->
            <ng-container matColumnDef="password">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Password
              </th>
              <td
                mat-cell
                *matCellDef="let element"
                [matTooltip]="truncateText(element.password, 100)"
              >
                {{ truncateText(element.password, 8) }}
              </td>
            </ng-container>

            <!-- Gender Column -->
            <ng-container matColumnDef="gender">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Gender
              </th>
              <td mat-cell *matCellDef="let element">{{ element.gender }}</td>
            </ng-container>

            <!-- Role Column -->
            <ng-container matColumnDef="role">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Role
              </th>
              <td mat-cell *matCellDef="let element">{{ element.role }}</td>
            </ng-container>

            <!-- Active Column -->
            <ng-container matColumnDef="isActive">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color: #2c3e50; color: white"
              >
                Active
              </th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="custom-badge"
                  [ngClass]="element.isActive ? 'active' : 'inactive'"
                >
                  {{ element.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
            </ng-container>

            <!-- Email Verified Column -->
            <ng-container matColumnDef="isEmailVerified">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color: #2c3e50; color: white"
              >
                Email Verified
              </th>
              <td mat-cell *matCellDef="let element">
                <span
                  class="custom-badge"
                  [ngClass]="element.isEmailVerified ? 'active' : 'inactive'"
                >
                  {{ element.isEmailVerified ? 'Verified' : 'Unverified' }}
                </span>
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
                  <mat-option (click)="updateUsersDataDialog(row)">
                    Update<mat-icon style="color:#2E7D32">update</mat-icon>
                  </mat-option>
                  <mat-option (click)="deleteUsers(row)">
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
      </div>
    </ng-container>
    <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
  </div>`,
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
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }

      .active {
        background-color: #31aa70;
        color: white;
      }

      .inactive {
        background-color: #d5294d;
        color: white;
        animation: blink 1.5s infinite;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  isAsyncCall = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 5, 10, 20, 100];

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'password',
    'gender',
    'role',
    'isActive',
    'isEmailVerified',
    'action',
  ];
  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getUserInformation();
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

  getUserInformation() {
    this.isAsyncCall = true;
    this.authService.getUsersInfo(this.pageIndex + 1, this.pageSize).subscribe(
      (res) => {
        if (res) {
          console.log(res, 'responseoftenantspayments');
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
        console.error('Error Occurred:', error);
        this.error();
        this.isAsyncCall = false;
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sort.sortChange.emit(this.sort);
    this.getUserInformation();
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
        this.getUserInformation();
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
        this.getUserInformation();
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

  deleteUsers(item: UsersData) {
    this.isAsyncCall = true;
    this.authService.deleteUsersInfo(item.id ?? '').subscribe(
      (res) => {
        if (res) {
          this.deleteSnackBar();
          this.getUserInformation();
        }
        this.isAsyncCall = false;
      },
      (error: any) => {
        console.error('Error Occurred:', error);
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
