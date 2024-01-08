import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-tenant-payments-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AsyncSpinnerComponent,
  ],
  template: `
    <mat-card>
      <ng-container *ngIf="!isAsyncCall">
        <div style="padding: 30px;">
          <div style="display: flex; justify-content: flex-end;">
            <button mat-icon-button aria-label="close dialog" mat-dialog-close>
              <mat-icon>close</mat-icon>
            </button>
          </div>

          <ng-container *ngIf="selectedRequestType === 'create'">
            <h2>Create Tenant Payment</h2>
          </ng-container>
          <ng-container *ngIf="selectedRequestType === 'update'">
            <h2>Update Tenant Payment</h2>
          </ng-container>

          <ng-container *ngIf="selectedRequestType === 'view'">
            <h2>View Tenant Payment</h2>
          </ng-container>

          <form [formGroup]="tenantPaymentsForm">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Tenant Name</mat-label>
              <mat-select formControlName="tenantId" placeholder="Tenant Name">
                <mat-option
                  *ngFor="let tentName of tenantArrayData"
                  [value]="tentName.id"
                >
                  {{ tentName.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Rent</mat-label>
              <input
                matInput
                type="number"
                formControlName="rent"
                placeholder="Rent"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Area Maintenance Fee</mat-label>
              <input
                matInput
                type="number"
                formControlName="areaMaintainienceFee"
                placeholder="Area Maintenance Fee"
              />
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Is Late</mat-label>
              <mat-select formControlName="isLate">
                <mat-option [value]="true">Yes</mat-option>
                <mat-option [value]="false">No</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Late Fee</mat-label>
              <input
                matInput
                type="number"
                formControlName="lateFee"
                placeholder="Late Fee"
              />
            </mat-form-field>

            <ng-container *ngIf="selectedRequestType === 'update'">
              <mat-form-field appearance="outline" class="full">
                <mat-label>Is Payable</mat-label>
                <mat-select formControlName="isPayable">
                  <mat-option [value]="true">Yes</mat-option>
                  <mat-option [value]="false">No</mat-option>
                </mat-select>
              </mat-form-field>
            </ng-container>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Rent Payed At</mat-label>
              <input
                matInput
                [matDatepicker]="picker"
                formControlName="rentPayedAt"
                placeholder="Rent Payed At"
              />
              <mat-datepicker-toggle
                matSuffix
                [for]="picker"
              ></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full">
              <mat-label>Month</mat-label>
              <input matInput formControlName="month" placeholder="Month" />
            </mat-form-field>

            <div style="margin-top: 20px;">
              <button
                mat-raised-button
                color="primary"
                (click)="saveData()"
                [disabled]="!tenantPaymentsForm.valid"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </ng-container>
      <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
    </mat-card>
  `,
  styles: ['.full { width: 100%; }'],
})
export class TenantPaymentsDialogComponent {
  isAsyncCall = false;
  tenantArrayData: any[] = [];

  selectedRequestType!: requestType;
  tenantPaymentsForm = this.formBuilder.group({
    id: [''],
    tenantId: ['', Validators.required],
    rent: ['', Validators.required],
    areaMaintainienceFee: ['', Validators.required],
    isLate: ['', Validators.required],
    lateFee: ['', Validators.required],
    isPayable: [''],
    rentPayedAt: ['', Validators.required],
    month: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TenantPaymentsDialogComponent>,
    private snackbar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    console.log(data, 'dataaaaaaaa');
  }

  get id() {
    return this.tenantPaymentsForm.controls.id;
  }
  get tenantId() {
    return this.tenantPaymentsForm.controls.tenantId;
  }
  get rent() {
    return this.tenantPaymentsForm.controls.rent;
  }
  get areaMaintainienceFee() {
    return this.tenantPaymentsForm.controls.areaMaintainienceFee;
  }
  get isLate() {
    return this.tenantPaymentsForm.controls.isLate;
  }
  get lateFee() {
    return this.tenantPaymentsForm.controls.lateFee;
  }
  get isPayable() {
    return this.tenantPaymentsForm.controls.isPayable;
  }
  get rentPayedAt() {
    return this.tenantPaymentsForm.controls.rentPayedAt;
  }
  get month() {
    return this.tenantPaymentsForm.controls.month;
  }

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantPaymentsForm.disable();
    }
    this.patchValue();
    this.getTenantNameDropDown();
  }

  getTenantNameDropDown() {
    this.isAsyncCall = true;
    this.authService.getDropDownTenantName().subscribe((res) => {
      if (res) {
        console.log(res, 'respone of tenantnamedropdown');
        this.tenantArrayData = res?.results;
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
      this.tenantPaymentsForm.patchValue({
        id: data.item.id,
        tenantId: data.item.tenantName,
        rent: data.item.rent,
        areaMaintainienceFee: data.item.areaMaintainienceFee,
        isLate: data.item.isLate,
        lateFee: data.item.lateFee,
        isPayable: data.item.isPayable,

        rentPayedAt: data.item.rentPayedAt,
        month: data.item.month,
      });
    }
  }

  saveData() {
    if (this.selectedRequestType === 'create') {
      this.createTenantsPayments();
    } else if (this.selectedRequestType === 'update') {
      this.updateTenantsPayments();
    }
  }
  createTenantsPayments() {
    const createData = {
      id: this.id.value,
      tenantId: this.tenantId.value,
      rent: this.rent.value,
      areaMaintainienceFee: this.areaMaintainienceFee.value,
      isLate: this.isLate.value,
      lateFee: this.lateFee.value,
      rentPayedAt: this.rentPayedAt.value,
      month: this.month.value,
    };
    console.log(createData, 'createData');
    this.isAsyncCall = true;
    this.authService
      .createTenantsPaymentsInfo(createData)
      .subscribe((result) => {
        if (result) {
          this.createSnackbar();
          this.dialogRef.close(true);
          this.isAsyncCall = false;
        } else {
          this.isAsyncCall = false;
        }
      });
  }
  updateTenantsPayments() {
    const updateData = {
      id: this.id.value,
      tenantId: this.tenantId.value,
      rent: this.rent.value,
      areaMaintainienceFee: this.areaMaintainienceFee.value,
      isLate: this.isLate.value,
      lateFee: this.lateFee.value,
      isPayable: this.isPayable.value,
      rentPayedAt: this.rentPayedAt.value,
      month: this.month.value,
    };
    console.log(updateData, 'updateData');

    this.isAsyncCall = true;
    this.authService
      .updateTenantsPaymentsInfo(updateData)
      .subscribe((result) => {
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
    this.snackbar.open(`DATA UPDATED SUCCESSFULLY`, 'X', config);
  }

  createSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`DATA CREATED SUCCESSFULLY`, 'X', config);
  }
}

type requestType = 'create' | 'update' | 'view';
