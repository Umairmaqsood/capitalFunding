import { Component, ElementRef, ViewChild } from '@angular/core';
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
         display:block; margin:20px auto;border-radius: 10px;width:500px;background-color:#eaf3ff"
      >
        <ng-container *ngIf="!isAsyncCall">
          <h1 style="text-align:center; font-weight:bold">Create Complaint</h1>

          <!-- Your component template -->
          <div class="centered-container">
            <div style="margin-left: 50px;margin-bottom:5%;">
              <h2 class="preview-header">Preview</h2>
              <div class="icon-preview-container">
                <img
                  [src]="selectedImage || 'assets/samplepic.jpg'"
                  alt="Selected Image Preview"
                  class="icon-preview"
                />
              </div>
            </div>
            <div>
              <button mat-raised-button (click)="fileInput.click()">
                Upload Picture
              </button>
              <input
                #fileInput
                style="display: none"
                type="file"
                name="icon"
                (change)="onFileSelected($event)"
                accept="image/*"
              />
            </div>
          </div>

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
  styles: [
    `
      .centered-container {
        display: flex;
        gap: 30px;
        align-items: center;
        text-align: center;
        padding: 20px;

        border-radius: 8px;

        height: 180px;
        justify-content: center;
      }

      .full {
        width: 100%;
      }
      .icon-preview-container {
        width: 130px;
        height: 130px;
        border-radius: 50%;
        overflow: hidden;
        margin-top: 20px;
        border: 1px solid #ddd;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px auto;
        background-color: #fff;
      }
      .icon-preview {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
      .preview-header {
        font-size: 20px;
        margin-top: 10px;
        font-weight: bold;
      }
    `,
  ],
})
export class CreateUsersComplaintsComponent {
  isAsyncCall = false;
  // tenantName: any[] = [];
  tenantIdData: any[] = [];
  userId: any;
  selectedImage!: string;
  @ViewChild('fileInput') fileInputRef!: ElementRef;

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
      this.getTenantId();
    } else {
      console.log('UserId is null or undefined.');
    }
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

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files ? inputElement.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          this.selectedImage = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  getTenantId() {
    this.isAsyncCall = true;
    this.authService.getTenantId(this.userId).subscribe((res) => {
      if (res) {
        const id = res?.results;
        console.log('patch', id);
        this.tenantsComplaintsForm.patchValue({
          tenantId: id,
        });
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
    this.authService.createTenantsComplaints(createdData).subscribe(
      (result) => {
        if (result) {
          this.createSnackabr();
          this.isAsyncCall = false;

          this.tenantsComplaintsForm.reset({
            tenantId: this.tenantId.value,
          });
        }
      },
      (error: any) => {
        this.isAsyncCall = false;
      }
    );
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
