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
        <ng-container *ngIf="!isAsyncCall">
          <h1 style="text-align:center; font-weight:bold">Create Complaint</h1>

          <form [formGroup]="tenantsComplaintsForm">
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
                style="height: 100px;"
                matInput
                formControlName="details"
                placeholder="Details"
              ></textarea>
            </mat-form-field>

            <div style="margin-top: 20px;">
              <button
                mat-raised-button
                color="primary"
                (click)="createTenantDetails()"
                [disabled]="!tenantsComplaintsForm.valid"
              >
                Submit
              </button>
            </div>
          </form>
        </ng-container>
        <app-async-spinner *ngIf="isAsyncCall"></app-async-spinner>
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
    title: ['', Validators.required],
    details: ['', Validators.required],
  });
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.tenantsComplaintsForm.controls.tenantId.disable();
    this.userId = localStorage.getItem('Id');

    if (this.userId) {
      console.log(this.userId, 'getting UserId');
      this.tenantsComplaintsForm.patchValue({
        tenantId: this.userId,
      });
      this.getTenantId();
    } else {
      console.log('UserId is null or undefined.');
    }
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
          this.isAsyncCall = false;

          this.tenantsComplaintsForm.reset({
            tenantId: this.tenantId.value,
          });
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
