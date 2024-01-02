import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

@Component({
  selector: 'app-users-tenants-data-dialog',
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
          <h2>Create User's Data</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'update'">
          <h2>Update User's Data</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'view'">
          <h2>View User's Data</h2>
        </ng-container>

        <form [formGroup]="usersDetailsForm">
          <mat-form-field appearance="outline" class="full">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" placeholder="ID" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Name" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Email</mat-label>
            <input matInput formControlName="email" placeholder="Email" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Gender</mat-label>
            <mat-select formControlName="gender">
              <mat-option value="male">Male</mat-option>
              <mat-option value="female">Female</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Role</mat-label>
            <mat-select formControlName="role">
              <mat-option value="admin">Admin</mat-option>
              <mat-option value="user">User</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Is Active</mat-label>
            <mat-select formControlName="isActive">
              <mat-option [value]="true">true</mat-option>
              <mat-option [value]="false">false</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Is Email Verified</mat-label>
            <mat-select formControlName="isEmailVerified">
              <mat-option [value]="true">true</mat-option>
              <mat-option [value]="false">false</mat-option>
            </mat-select>
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
export class UsersTenantsDataDialogComponent {
  isAsyncCall = false;

  selectedRequestType!: requestType;
  usersDetailsForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    gender: ['', Validators.required],
    role: ['', Validators.required],
    isActive: ['', Validators.required],
    isEmailVerified: ['', Validators.required],
  });

  get id() {
    return this.usersDetailsForm.controls.id;
  }
  get name() {
    return this.usersDetailsForm.controls.name;
  }
  get email() {
    return this.usersDetailsForm.controls.email;
  }
  get gender() {
    return this.usersDetailsForm.controls.gender;
  }
  get isActive() {
    return this.usersDetailsForm.controls.isActive;
  }
  get isEmailVerified() {
    return this.usersDetailsForm.controls.isEmailVerified;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    console.log(data, 'data');
  }

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.usersDetailsForm.disable();
    }
    this.patchValue();
  }

  patchValue() {
    const data = this.data;
    if (
      this.selectedRequestType === 'update' ||
      this.selectedRequestType === 'view'
    ) {
      this.usersDetailsForm.patchValue({
        id: data.item.id,
        name: data.item.name,
        email: data.item.email,
        gender: data.item.gender,
        role: data.item.role,
        isActive: data.item.isActive,
        isEmailVerified: data.item.isEmailVerified,
      });
    }
  }
}

type requestType = 'create' | 'update' | 'view';
