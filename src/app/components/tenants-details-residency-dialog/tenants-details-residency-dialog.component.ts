import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-tenants-details-residency-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AsyncSpinnerComponent,
  ],
  template: `
    <mat-card>
      <div style="padding: 30px;">
        <div style="display: flex; justify-content: flex-end;">
          <button mat-icon-button aria-label="close dialog" mat-dialog-close>
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <ng-container *ngIf="selectedRequestType === 'create'">
          <h2>Create Tenant Residency</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'update'">
          <h2>Update Tenant Residency</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'view'">
          <h2>View Tenant Residency</h2>
        </ng-container>

        <form [formGroup]="tenantsDetailsForm">
          <!-- <mat-form-field appearance="outline" class="full">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" placeholder="ID" />
          </mat-form-field> -->

          <mat-form-field appearance="outline" class="full">
            <mat-label>User Name</mat-label>
            <mat-select formControlName="userId" placeholder="User ID">
              <mat-option *ngFor="let user of userIds" [value]="user.id">
                {{ user.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Property Name</mat-label>
            <mat-select formControlName="propertyId" placeholder="Property ID">
              <mat-option
                *ngFor="let property of propertyIds"
                [value]="property.id"
              >
                {{ property.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Moved In</mat-label>
            <input
              matInput
              [matDatepicker]="movedInPicker"
              formControlName="movedIn"
              placeholder="Moved In"
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="movedInPicker"
            ></mat-datepicker-toggle>
            <mat-datepicker #movedInPicker></mat-datepicker>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Moved Out</mat-label>
            <input
              matInput
              [matDatepicker]="movedOutPicker"
              formControlName="movedOut"
              placeholder="Moved Out"
            />
            <mat-datepicker-toggle
              matSuffix
              [for]="movedOutPicker"
            ></mat-datepicker-toggle>
            <mat-datepicker #movedOutPicker></mat-datepicker>
          </mat-form-field>

          <div style="margin-top: 20px;">
            <button mat-raised-button color="primary" (click)="saveData()">
              Submit
            </button>
          </div>
        </form>
      </div>
    </mat-card>
  `,
  styles: ['.full { width: 100%; }'],
})
export class TenantsDetailsResidencyDialogComponent {
  isAsyncCall = false;
  userIds: any[] = [];
  propertyIds: any[] = [];

  selectedRequestType!: requestType;
  tenantsDetailsForm = this.formBuilder.group({
    id: ['', Validators.required],
    userId: ['', Validators.required],
    propertyId: ['', Validators.required],
    movedIn: ['', Validators.required],
    movedOut: ['', Validators.required],
  });

  get id() {
    return this.tenantsDetailsForm.controls.id;
  }
  get userId() {
    return this.tenantsDetailsForm.controls.userId;
  }
  get propertyId() {
    return this.tenantsDetailsForm.controls.propertyId;
  }
  get movedIn() {
    return this.tenantsDetailsForm.controls.movedIn;
  }
  get movedOut() {
    return this.tenantsDetailsForm.controls.movedOut;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<TenantsDetailsResidencyDialogComponent>
  ) {}

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantsDetailsForm.disable();
    }
    this.patchValue();
    this.getUserDropDown();
    this.getPropertyNameDropDown();
  }

  getUserDropDown() {
    this.isAsyncCall = true;
    this.authService.getDropDownUserName().subscribe((res) => {
      if (res) {
        console.log(res, 'respone ofuser dropdown');
        this.userIds = res?.results;
        this.isAsyncCall = false;
      }
    });
  }
  getPropertyNameDropDown() {
    this.isAsyncCall = true;
    this.authService.getDropDownPropertyName().subscribe((res) => {
      if (res) {
        console.log(res, 'respone of propertyName');
        this.propertyIds = res?.results;
        this.isAsyncCall = false;
      }
    });
  }

  patchValue() {
    const data = this.data;
    if (
      this.selectedRequestType === 'update' ||
      this.selectedRequestType === 'view'
    ) {
      this.tenantsDetailsForm.patchValue({
        id: data.item.id,
        userId: data.item.userId,
        propertyId: data.item.propertyId,
        movedIn: data.item.movedIn,
        movedOut: data.item.movedOut,
      });
    }
  }

  saveData() {
    if (this.selectedRequestType === 'create') {
      this.createTenatsDetailsResidency();
    } else if (this.selectedRequestType === 'update') {
      this.updateTenatsDetailsResidency();
    }
  }

  createTenatsDetailsResidency() {
    const createData = {
      id: this.id.value,
      userId: this.userId.value,
      propertyId: this.propertyId.value,
      movedIn: this.movedIn.value,
      movedOut: this.movedOut.value,
    };
    console.log(createData, 'createData');
    this.isAsyncCall = true;
    this.authService.createTenantsResidency(createData).subscribe((result) => {
      if (result) {
        this.createSnackbar();
        this.dialogRef.close(true);
        this.isAsyncCall = false;
      } else {
        this.isAsyncCall = false;
      }
    });
  }
  updateTenatsDetailsResidency() {
    const updateData = {
      id: this.id.value,
      userId: this.userId.value,
      propertyId: this.propertyId.value,
      movedIn: this.movedIn.value,
      movedOut: this.movedOut.value,
    };
    console.log(updateData, 'updateData');
    this.isAsyncCall = true;
    this.authService.updateTenantsResidency(updateData).subscribe((result) => {
      if (result) {
        this.updateSnackbar();
        this.dialogRef.close(true);
        this.isAsyncCall = false;
      } else {
        this.isAsyncCall = false;
      }
    });
  }

  updateSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`DATA UPDATED SUCCESSFULLY`, 'X', config);
  }

  createSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`DATA CREATED SUCCESSFULLY`, 'X', config);
  }
}

type requestType = 'create' | 'update' | 'view';
