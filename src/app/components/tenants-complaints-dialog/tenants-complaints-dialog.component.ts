import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-tenants-complaints-dialog',
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
          <h2>Create Tenant Complaint</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'update'">
          <h2>Update Tenant Complaint</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'view'">
          <h2>View Tenant Complaint</h2>
        </ng-container>

        <form [formGroup]="tenantsComplaintsForm">
          <mat-form-field appearance="outline" class="full">
            <mat-label>ID</mat-label>
            <input matInput formControlName="id" placeholder="ID" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Tenant ID</mat-label>
            <input
              matInput
              formControlName="tenantId"
              placeholder="Tenant ID"
            />
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
            <button mat-raised-button color="primary">Submit</button>
          </div>
        </form>
      </div>
    </mat-card>
  `,
  styles: ['.full{width:100%}'],
})
export class TenantsComplaintsDialogComponent {
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
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    // Disable fields for viewing
    if (this.selectedRequestType === 'view') {
      this.tenantsComplaintsForm.disable();
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
        id: data.item.id,
        tenantId: data.item.tenantId,
        title: data.item.title,
        details: data.item.details,
        isFixed: data.item.isFixed,
      });
    }
  }
}

type requestType = 'create' | 'update' | 'view';
