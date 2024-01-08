import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material/src/public-api';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-tenants-complaints-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
    <mat-card>
      <!-- <ng-container *ngIf="!isAsyncCall"></ng-container> -->
      <div style="padding: 30px;">
        <div style="display: flex; justify-content: flex-end;">
          <button mat-icon-button aria-label="close dialog" mat-dialog-close>
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <ng-container *ngIf="selectedRequestType === 'create'">
          <h2>Create Tenant Complaint</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'update'">
          <h2>Update Tenant Complaint</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'view'">
          <h2>View Tenant Complaint</h2>
        </ng-container>

        <form [formGroup]="tenantsComplaintsForm">
          <!-- <mat-form-field appearance="outline" class="full">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" placeholder="ID" />
          </mat-form-field> -->

          <mat-form-field appearance="outline" class="full">
            <mat-label>Tenant ID</mat-label>
            <input
              matInput
              formControlName="complaintId"
              placeholder="Tenant ID"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Tenant Name</mat-label>
            <input
              matInput
              formControlName="tenantName"
              placeholder="Tenant Name"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Title</mat-label>
            <input
              matInput
              formControlName="complaintTitle"
              placeholder="Title"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Details</mat-label>
            <textarea
              matInput
              formControlName="complaintDetails"
              placeholder="Details"
            ></textarea>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Is Fixed</mat-label>
            <mat-select formControlName="isFixed">
              <mat-option [value]="true">true</mat-option>
              <mat-option [value]="false">false</mat-option>
            </mat-select>
          </mat-form-field>

          <div style="margin-top: 20px;">
            <button
              mat-raised-button
              color="primary"
              (click)="saveData()"
              [disabled]="!tenantsComplaintsForm.valid"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </mat-card>
  `,
  styles: ['.full{width:100%}'],
})
export class TenantsComplaintsDialogComponent {
  isAsyncCall = false;

  selectedRequestType!: requestType;
  tenantsComplaintsForm = this.formBuilder.group({
    complaintId: ['', Validators.required],
    tenantName: ['', Validators.required],
    complaintTitle: ['', Validators.required],
    complaintDetails: ['', Validators.required],
    isFixed: ['', Validators.required],
  });

  get complaintId() {
    return this.tenantsComplaintsForm.controls.complaintId;
  }
  get tenantName() {
    return this.tenantsComplaintsForm.controls.tenantName;
  }
  get complaintTitle() {
    return this.tenantsComplaintsForm.controls.complaintTitle;
  }
  get complaintDetails() {
    return this.tenantsComplaintsForm.controls.complaintDetails;
  }
  get isFixed() {
    return this.tenantsComplaintsForm.controls.isFixed;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<TenantsComplaintsDialogComponent>
  ) {}

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;

    if (this.selectedRequestType === 'view') {
      this.tenantsComplaintsForm.disable();
    }
    if (this.selectedRequestType === 'update') {
      this.tenantsComplaintsForm.controls.complaintId.disable();
      this.tenantsComplaintsForm.controls.tenantName.disable();
      this.tenantsComplaintsForm.controls.complaintTitle.disable();
      this.tenantsComplaintsForm.controls.complaintDetails.disable();
    }

    this.patchValue();
  }

  patchValue() {
    const data = this.data;
    if (
      this.selectedRequestType === 'update' ||
      this.selectedRequestType === 'view'
    ) {
      this.tenantsComplaintsForm.patchValue({
        complaintId: data.item.complaintId,
        tenantName: data.item.tenantName,
        complaintTitle: data.item.complaintTitle,
        complaintDetails: data.item.complaintDetails,
        isFixed: data.item.isFixed,
      });
    }
  }

  saveData() {
    if (this.selectedRequestType === 'update') {
      this.updateTenantDetails();
    }
  }

  updateTenantDetails() {
    const updatedData = {
      complaintId: this.complaintId.value,
      tenantName: this.tenantName.value,
      complaintTitle: this.complaintTitle.value,
      complaintDetails: this.complaintDetails.value,
      isFixed: this.isFixed.value,
    };

    const actualComplaintId: string = this.complaintId.value || ''; // Use empty string as default value

    console.log('updatedData', updatedData);
    this.isAsyncCall = true;
    this.authService
      .updateTenantsComplaints(actualComplaintId)
      .subscribe((result) => {
        if (result) {
          this.updateSnackabr();
          this.dialogRef.close(true);
          this.isAsyncCall = false;
        } else {
          this.isAsyncCall = false;
        }
      });
  }

  updateSnackabr(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`DATA UPDATED SUCCESSFULLY`, 'X', config);
  }
}

type requestType = 'create' | 'update' | 'view';
