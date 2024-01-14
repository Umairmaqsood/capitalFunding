import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material/src/public-api';
import { MatDialog } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { TenantsComplaintsDialogComponent } from '../tenants-complaints-dialog/tenants-complaints-dialog.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSort } from '@angular/material/sort';
import { saveAs } from 'file-saver';

export interface TenantComplaints {
  complaintId: string;
  tenantName: string;
  complaintTitle: string;
  complaintDetails: string;
  isFixed: boolean;
  complainDate: Date;
}

@Component({
  selector: 'app-tenant-complaints',
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

          <!-- <button
          mat-raised-button
          (click)="createTenantComplaintsDialog({})"
          style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:25px 30px;font-weight:bold;"
        >
          Create
        </button> -->
        </div>

        <div>
          <table
            mat-table
            [dataSource]="dataSource"
            matSort
            class="mat-elevation-z8"
          >
            <!-- Define columns based on the TenantComplaints interface -->
            <!-- ID Column -->
            <ng-container matColumnDef="complaintId">
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
                [matTooltip]="truncateText(element.complaintId, 100)"
              >
                {{ truncateText(element.complaintId, 8) }}
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

            <!-- Title Column -->
            <ng-container matColumnDef="complaintTitle">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Title
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.complaintTitle }}
              </td>
            </ng-container>

            <!-- Details Column -->
            <ng-container matColumnDef="complaintDetails">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Details
              </th>

              <td
                mat-cell
                *matCellDef="let element"
                [matTooltip]="truncateText(element.complaintDetails, 100)"
              >
                {{ truncateText(element.complaintDetails, 8) }}
              </td>
            </ng-container>

            <!-- Is Fixed Column -->
            <ng-container matColumnDef="isFixed">
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
                  [ngClass]="element.isFixed ? 'true' : 'false'"
                >
                  {{ element.isFixed ? 'Fixed' : 'Pending' }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="complainDate">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Date
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.complainDate | date : 'MMMM dd, yyyy' }}
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
                  <mat-option (click)="getTenantImage(row.complaintId)">
                    Download Image<mat-icon style="color:#2196F3"
                      >cloud_download</mat-icon
                    >
                  </mat-option>

                  <mat-option (click)="updateTenantsComplaintsDialog(row)">
                    Update<mat-icon style="color:#2E7D32">update</mat-icon>
                  </mat-option>
                  <mat-option>
                    Delete<mat-icon
                      style="color:#E53935"
                      (click)="deleteTenantsComplaints(row)"
                      >delete</mat-icon
                    >
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
          opacity: 0;
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
    `,
  ],
})
export class TenantComplaintsComponent implements OnInit {
  isAsyncCall = false;
  complaintId: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  resultsLength = 0;
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [2, 5, 10, 20, 100];

  displayedColumns: string[] = [
    'complaintId',
    'tenantName',
    'complaintTitle',
    'complaintDetails',
    'isFixed',
    'complainDate',
    'action',
  ];

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getTenantsComplaints();
  }

  dataSource = new MatTableDataSource([]);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  truncateText(text: string, maxLength: number): string {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
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
        this.getTenantsComplaints();
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
        this.getTenantsComplaints();
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
      }
    });
  }

  getTenantsComplaints() {
    this.isAsyncCall = true;
    this.authService
      .getTenantsComplaints(this.pageIndex + 1, this.pageSize)
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
        (error: any) => {
          this.error();
          this.isAsyncCall = false;
        }
      );
  }

  getTenantImage(complaintId: string) {
    this.isAsyncCall = true;
    this.authService.getImage(complaintId).subscribe({
      next: (res) => {
        if (res && res.results.fileContents) {
          console.log('Image downloaded successfully.');
          console.log('Image size:', res.results.fileContents.length);

          // Decode base64-encoded image data
          const decodedImage = atob(res.results.fileContents);

          // Create Uint8Array from decoded data
          const uint8Array = new Uint8Array(decodedImage.length);
          for (let i = 0; i < decodedImage.length; i++) {
            uint8Array[i] = decodedImage.charCodeAt(i);
          }

          // Create Blob from Uint8Array
          const blob = new Blob([uint8Array], {
            type: res.results.contentType,
          });

          saveAs(blob, res.results.fileDownloadName);
        }
        this.isAsyncCall = false;
      },
      error: (error) => {
        console.error('Error downloading image:', error);
        this.isAsyncCall = false;
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.sort.sortChange.emit(this.sort);
    this.getTenantsComplaints();
  }

  deleteTenantsComplaints(item: TenantComplaints) {
    this.isAsyncCall = true;
    this.authService.deleteTenantsComplaints(item.complaintId ?? '').subscribe(
      (res) => {
        if (res) {
          this.deleteSnackBar();
          this.getTenantsComplaints();
        }
        this.isAsyncCall = false;
      },
      (error: any) => {
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
