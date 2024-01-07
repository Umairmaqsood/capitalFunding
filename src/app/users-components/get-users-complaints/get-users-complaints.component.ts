import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AsyncSpinnerComponent } from '../../components/async-spinner/async-spinner.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-get-users-complaints',
  standalone: true,
  template: `
    <div style="padding: 40px">
      <ng-container *ngIf="!isAsyncCall">
        <h1 style="font-weight:bold">Complaints History</h1>

        <div>
          <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
            <ng-container matColumnDef="createdAt">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Complaint Date
              </th>
              <td mat-cell *matCellDef="let element">
                {{ element.createdAt | date : 'dd-MM-yyyy' }}
              </td>
            </ng-container>

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

            <ng-container matColumnDef="details">
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
                [matTooltip]="truncateText(element.details, 100)"
              >
                {{ truncateText(element.details, 8) }}
              </td>
            </ng-container>

            <ng-container matColumnDef="isFixed">
              <th
                mat-header-cell
                *matHeaderCellDef
                style="background-color:#2c3e50; color:white"
              >
                Status
              </th>
              <td mat-cell *matCellDef="let element">{{ element.isFixed }}</td>
            </ng-container>

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

      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </div>
  `,
  styles: ['.full{width:100%}'],
  imports: [
    AsyncSpinnerComponent,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
  ],
})
export class GetUsersComplaintsComponent {
  isAsyncCall = false;
  userId: any;

  displayedColumns: string[] = ['createdAt', 'title', 'details', 'isFixed'];

  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    this.getUsersComplaints();
  }

  truncateText(text: string, maxLength: number): string {
    if (text?.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    } else {
      return text;
    }
  }

  page = 1;
  pageSize = 10;

  getUsersComplaints() {
    this.isAsyncCall = true;
    this.authService.getUsersComplaints(this.userId).subscribe(
      (res) => {
        if (res) {
          const data = res?.results;
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
