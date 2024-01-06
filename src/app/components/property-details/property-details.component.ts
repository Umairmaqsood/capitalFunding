import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PropertyDetailsDialogComponent } from '../property-details-dialog/property-details-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

export interface PropertyDetails {
  id: string;
  propertyName: string;
  address: string;
  typeofProperty: string;
  numberofBedrooms: number;
  numberofBathrooms: number;
  isAvailable: boolean;
  description: string;
}

const PROPERTY_DATA: PropertyDetails[] = [
  {
    id: '1',
    propertyName: 'Cozy Apartment',
    address: '123 Main Street',
    typeofProperty: 'Apartment',
    numberofBedrooms: 2,
    numberofBathrooms: 1,
    isAvailable: true,
    description: 'A cozy apartment in a convenient location.',
  },
  {
    id: '2',
    propertyName: 'Spacious House',
    address: '456 Elm Street',
    typeofProperty: 'House',
    numberofBedrooms: 4,
    numberofBathrooms: 3,
    isAvailable: false,
    description: 'A spacious house with a beautiful garden.',
  },
];

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, MaterialModule, AsyncSpinnerComponent],
  template: `
    <div style="padding:30px">
      <div
        style="width: 100%; border-radius: 5px; padding: 5px; margin-bottom: 10px;
  background: linear-gradient(to right, red, #a80056);
"
      >
        <h1
          style="text-align: center; margin: 0; font-weight: bold; color: white;"
        >
          Tenant Property Details
        </h1>
      </div>
      <div class="flex" style="justify-content:space-between">
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
          (click)="createPropertyDetailsDialog({})"
          style="background: linear-gradient(to right, red, #a80056); color: white;
        margin-top:10px; padding:20px;"
        >
          Create
        </button>
      </div>

      <div>
        <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
          <!-- ID Column -->
          <ng-container matColumnDef="id">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              ID
            </th>
            <td mat-cell *matCellDef="let element">{{ element.id }}</td>
          </ng-container>

          <!-- Property Name Column -->
          <ng-container matColumnDef="propertyName">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Property Name
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.propertyName }}
            </td>
          </ng-container>

          <!-- Address Column -->
          <ng-container matColumnDef="address">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Address
            </th>
            <td mat-cell *matCellDef="let element">{{ element.address }}</td>
          </ng-container>

          <!-- Type of Property Column -->
          <ng-container matColumnDef="typeofProperty">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Type of Property
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.typeofProperty }}
            </td>
          </ng-container>

          <!-- Number of Bedrooms Column -->
          <ng-container matColumnDef="numberofBedrooms">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Number of Bedrooms
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.numberofBedrooms }}
            </td>
          </ng-container>

          <!-- Number of Bathrooms Column -->
          <ng-container matColumnDef="numberofBathrooms">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Number of Bathrooms
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.numberofBathrooms }}
            </td>
          </ng-container>

          <!-- Is Available Column -->
          <ng-container matColumnDef="isAvailable">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Is Available
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.isAvailable }}
            </td>
          </ng-container>

          <!-- Description Column -->
          <ng-container matColumnDef="description">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
            >
              Description
            </th>
            <td mat-cell *matCellDef="let element">
              {{ element.description }}
            </td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="action">
            <th
              mat-header-cell
              *matHeaderCellDef
              style="background-color:black; color:white"
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
                <mat-option (click)="updatePropertyDetailsDialog(row)">
                  Update<mat-icon style="color:#2E7D32">update</mat-icon>
                </mat-option>
                <mat-option>
                  Delete<mat-icon style="color:#E53935">delete</mat-icon>
                </mat-option>
                <mat-option (click)="viewPropertyDetailsDialog(row)">
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
export class PropertyDetailsComponent {
  isAsyncCall = false;
  displayedColumns: string[] = [
    'id',
    'propertyName',
    'address',
    'typeofProperty',
    'numberofBedrooms',
    'numberofBathrooms',
    'isAvailable',
    'description',
    'action',
  ];

  constructor(private dialog: MatDialog) {}

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  dataSource = new MatTableDataSource(PROPERTY_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createPropertyDetailsDialog(item: any) {
    const dialog = this.dialog.open(PropertyDetailsDialogComponent, {
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
  updatePropertyDetailsDialog(item: PropertyDetails) {
    const dialog = this.dialog.open(PropertyDetailsDialogComponent, {
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
  viewPropertyDetailsDialog(item: PropertyDetails) {
    const dialog = this.dialog.open(PropertyDetailsDialogComponent, {
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
  deletePropertyDetails() {}
}
