import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/src/public-api';
import { AsyncSpinnerComponent } from '../../components';

@Component({
  selector: 'app-create-users-complaints',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AsyncSpinnerComponent,
  ],
  template: `
    <div>
      <mat-card
        style=" padding: 20px 40px; 
         display:block; margin:20px auto;border-radius: 10px;width:600px"
      >
        <h1 style="text-align:center; font-weight:bold">Create Complaint</h1>

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

          <!-- <mat-form-field appearance="outline" class="full">
            <mat-label>Tenant Name</mat-label>
            <mat-select formControlName="tenantNames" placeholder="Tenant Name">
              <mat-option
                *ngFor="let tentName of tenantName"
                [value]="tentName.id"
              >
                {{ tentName.name }}
              </mat-option>
            </mat-select>
          </mat-form-field> -->

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

          <!-- <mat-form-field appearance="outline" class="full">
            <mat-label>Is Fixed</mat-label>
            <mat-select formControlName="isFixed">
              <mat-option [value]="true">true</mat-option>
              <mat-option [value]="false">false</mat-option>
            </mat-select>
          </mat-form-field> -->

          <div style="margin-top: 20px;">
            <button
              mat-raised-button
              color="primary"
              (click)="createTenantDetails()"
            >
              Submit
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: ['.full{width:100%}'],
})
export class CreateUsersComplaintsComponent {
  isAsyncCall = false;
  // tenantName: any[] = [];
  tenantIdData: any[] = [];
  userId: any;

  tenantsComplaintsForm = this.formBuilder.group({
    tenantId: ['', Validators.required],
    // tenantNames: ['', Validators.required],
    title: ['', Validators.required],
    details: ['', Validators.required],
    // isFixed: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.tenantsComplaintsForm.controls.tenantId.disable();
    this.userId = localStorage.getItem('Id');
    // this.getTenantNameDropDown();
    this.getTenantId();
  }

  page = 1;
  pageSize = 10;

  get tenantId() {
    return this.tenantsComplaintsForm.controls.tenantId;
  }

  get title() {
    return this.tenantsComplaintsForm.controls.title;
  }
  get details() {
    return this.tenantsComplaintsForm.controls.details;
  }

  getTenantId() {
    this.isAsyncCall = true;
    this.authService.getTenantId(this.userId).subscribe((res) => {
      if (res) {
        console.log(res, 'respone of tenantid');
        this.tenantIdData = res?.results;
        this.isAsyncCall = false;
      }
    });
  }

  createTenantDetails() {
    const createdData = {
      tenantId: this.tenantId.value,
      title: this.title.value,
      details: this.details.value,
    };
    this.isAsyncCall = true;
    this.authService
      .createTenantsComplaints(createdData)
      .subscribe((result) => {
        if (result) {
          this.createSnackabr();
          // this.dialogRef.close(true);
          this.isAsyncCall = false;
        } else {
          this.isAsyncCall = false;
        }
      });
  }

  createSnackabr(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`DATA CREATED SUCCESSFULLY`, 'X', config);
  }

  error(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackBar.open(`AN ERROR OCCURED!`, 'X', config);
  }
}
