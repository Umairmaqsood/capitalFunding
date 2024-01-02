import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-tenants-details-residency-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
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
          <mat-form-field appearance="outline" class="full">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" placeholder="ID" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>User ID</mat-label>
            <input matInput formControlName="userId" placeholder="User ID" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Property ID</mat-label>
            <input
              matInput
              formControlName="propertyId"
              placeholder="Property ID"
            />
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
            <button mat-raised-button color="primary">Submit</button>
          </div>
        </form>
      </div>
    </mat-card>
  `,
  styles: ['.full { width: 100%; }'],
})
export class TenantsDetailsResidencyDialogComponent {
  selectedRequestType!: requestType;
  tenantsDetailsForm = this.formBuilder.group({
    id: ['', Validators.required],
    userId: ['', Validators.required],
    propertyId: ['', Validators.required],
    movedIn: ['', Validators.required],
    movedOut: [Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantsDetailsForm.disable();
    }
    this.patchValue();
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
}

type requestType = 'create' | 'update' | 'view';
