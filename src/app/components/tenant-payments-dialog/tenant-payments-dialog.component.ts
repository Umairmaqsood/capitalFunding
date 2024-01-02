import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

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
            <mat-label>Tenant ID</mat-label>
            <input
              matInput
              formControlName="tenantId"
              placeholder="Tenant ID"
            />
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
            <button mat-raised-button color="primary">Submit</button>
          </div>
        </form>
      </div>
    </mat-card>
  `,
  styles: ['.full { width: 100%; }'],
})
export class TenantPaymentsDialogComponent {
  isAsyncCall = false;

  selectedRequestType!: requestType;
  tenantPaymentsForm = this.formBuilder.group({
    id: ['', Validators.required],
    tenantId: ['', Validators.required],
    rent: ['', Validators.required],
    areaMaintainienceFee: ['', Validators.required],
    isLate: ['', Validators.required],
    lateFee: ['', Validators.required],
    rentPayedAt: ['', Validators.required],
    month: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantPaymentsForm.disable();
    }
    this.patchValue();
  }

  patchValue() {
    const data = this.data;
    if (
      this.selectedRequestType === 'update' ||
      this.selectedRequestType === 'view'
    ) {
      this.tenantPaymentsForm.patchValue({
        id: data.item.id,
        tenantId: data.item.tenantId,
        rent: data.item.rent,
        areaMaintainienceFee: data.item.areaMaintainienceFee,
        isLate: data.item.isLate,
        lateFee: data.item.lateFee,
        rentPayedAt: data.item.rentPayedAt,
        month: data.item.month,
      });
    }
  }
}

type requestType = 'create' | 'update' | 'view';
