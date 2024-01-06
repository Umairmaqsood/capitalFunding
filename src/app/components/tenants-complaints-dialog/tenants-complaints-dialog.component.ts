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
              formControlName="tenantId"
              placeholder="Tenant ID"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Tenant Name</mat-label>
            <mat-select formControlName="tenantId" placeholder="Tenant Name">
              <mat-option
                *ngFor="let tentName of tenantName"
                [value]="tentName.id"
              >
                {{ tentName.name }}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" placeholder="Title" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Details</mat-label>
            <textarea
              matInput
              formControlName="details"
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
            <button mat-raised-button color="primary" (click)="saveData()">
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
  tenantName: any[] = [];
  selectedRequestType!: requestType;
  tenantsComplaintsForm = this.formBuilder.group({
    id: ['', Validators.required],
    tenantId: ['', Validators.required],
    title: ['', Validators.required],
    details: ['', Validators.required],
    isFixed: ['', Validators.required],
  });

  get id() {
    return this.tenantsComplaintsForm.controls.id;
  }
  get tenantId() {
    return this.tenantsComplaintsForm.controls.tenantId;
  }
  get title() {
    return this.tenantsComplaintsForm.controls.title;
  }
  get details() {
    return this.tenantsComplaintsForm.controls.details;
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
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantsComplaintsForm.disable();
    }
    this.patchValue();
    this.getTenantNameDropDown();
  }

  getTenantNameDropDown() {
    this.isAsyncCall = true;
    this.authService.getDropDownPropertyName().subscribe((res) => {
      if (res) {
        console.log(res, 'respone of tenantnamedropdown');
        this.tenantName = res?.results;
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
      this.tenantsComplaintsForm.patchValue({
        id: data.item.id,
        tenantId: data.item.tenantId,
        title: data.item.title,
        details: data.item.details,
        isFixed: data.item.isFixed,
      });
    }
  }

  saveData() {
    if (this.selectedRequestType === 'create') {
      this.createTenantDetails();
    } else if (this.selectedRequestType === 'update') {
      this.updateTenantDetails();
    }
  }

  updateTenantDetails() {
    const updatedData = {
      id: this.id.value,
      tenantId: this.tenantId.value,
      title: this.title.value,
      details: this.details.value,
      isFixed: this.isFixed.value,
    };
    console.log('updatedData', updatedData);
    this.isAsyncCall = true;
    this.authService
      .updateTenantsComplaints(updatedData)
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
  createTenantDetails() {
    const createdData = {
      id: this.id.value,
      tenantId: this.tenantId.value,
      title: this.title.value,
      details: this.details.value,
      isFixed: this.isFixed.value,
    };
    this.isAsyncCall = true;
    this.authService
      .createTenantsComplaints(createdData)
      .subscribe((result) => {
        if (result) {
          this.createSnackabr();
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

  createSnackabr(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`DATA CREATED SUCCESSFULLY`, 'X', config);
  }
}

type requestType = 'create' | 'update' | 'view';
