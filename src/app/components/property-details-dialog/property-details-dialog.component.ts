import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncSpinnerComponent } from '../async-spinner/async-spinner.component';

@Component({
  selector: 'app-property-details-dialog',
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
          <h2>Create Property Details</h2>
        </ng-container>
        <ng-container *ngIf="selectedRequestType === 'update'">
          <h2>Update Property Details</h2>
        </ng-container>

        <ng-container *ngIf="selectedRequestType === 'view'">
          <h2>View Property Details</h2>
        </ng-container>

        <form [formGroup]="propertyDetailsForm">
          <mat-form-field appearance="outline" class="full">
            <mat-label>Property Name</mat-label>
            <input
              matInput
              formControlName="propertyName"
              placeholder="Property Name"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Address</mat-label>
            <input matInput formControlName="address" placeholder="Address" />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Type of Property</mat-label>
            <input
              matInput
              formControlName="typeofProperty"
              placeholder="Type of Property"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Number of Bedrooms</mat-label>
            <input
              matInput
              type="number"
              min="0"
              formControlName="numberofBedrooms"
              placeholder="Number of Bedrooms"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Number of Bathrooms</mat-label>
            <input
              matInput
              type="number"
              min="0"
              formControlName="numberofBathrooms"
              placeholder="Number of Bathrooms"
            />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Is Available</mat-label>
            <mat-select formControlName="isAvailable">
              <mat-option [value]="true">true</mat-option>
              <mat-option [value]="false">false</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Description</mat-label>
            <textarea
              matInput
              formControlName="description"
              placeholder="Description"
            ></textarea>
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
export class PropertyDetailsDialogComponent implements OnInit {
  isAsyncCall = false;

  selectedRequestType!: requestType;
  propertyDetailsForm = this.formBuilder.group({
    id: [''],
    propertyName: ['', Validators.required],
    address: ['', Validators.required],
    typeofProperty: ['', Validators.required],
    numberofBedrooms: ['', Validators.min(0)],
    numberofBathrooms: ['', Validators.min(0)],
    isAvailable: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    console.log(data, 'data');
  }
  ngOnInit(): void {
    this.selectedRequestType = this.data.requestType;
    if (this.selectedRequestType === 'view') {
      this.propertyDetailsForm.controls.id.disable();
      this.propertyDetailsForm.controls.propertyName.disable();

      this.propertyDetailsForm.controls.address.disable();

      this.propertyDetailsForm.controls.typeofProperty.disable();

      this.propertyDetailsForm.controls.numberofBedrooms.disable();

      this.propertyDetailsForm.controls.numberofBathrooms.disable();

      this.propertyDetailsForm.controls.isAvailable.disable();

      this.propertyDetailsForm.controls.description.disable();
    }
    this.patchValue();
  }

  get id() {
    return this.propertyDetailsForm.controls.id;
  }
  get propertyName() {
    return this.propertyDetailsForm.controls.propertyName;
  }
  get address() {
    return this.propertyDetailsForm.controls.address;
  }
  get typeofProperty() {
    return this.propertyDetailsForm.controls.typeofProperty;
  }
  get numberofBedrooms() {
    return this.propertyDetailsForm.controls.numberofBedrooms;
  }
  get numberofBathrooms() {
    return this.propertyDetailsForm.controls.numberofBathrooms;
  }
  get isAvailable() {
    return this.propertyDetailsForm.controls.isAvailable;
  }
  get description() {
    return this.propertyDetailsForm.controls.description;
  }

  saveData() {
    if (this.selectedRequestType === 'create') {
      this.createPropertyDetails();
    } else if (this.selectedRequestType === 'update') {
      this.updatePropertyDetails();
    }
  }

  patchValue() {
    const data = this.data;
    if (
      this.selectedRequestType === 'update' ||
      this.selectedRequestType === 'view'
    ) {
      this.propertyDetailsForm.patchValue({
        id: data.item.id,
        propertyName: data.item.propertyName,
        address: data.item.address,
        typeofProperty: data.item.typeofProperty,
        numberofBedrooms: data.item.numberofBedrooms,
        numberofBathrooms: data.item.numberofBathrooms,
        isAvailable: data.item.isAvailable,
        description: data.item.description,
      });
    }
  }

  updatePropertyDetails() {
    const updatedData = {
      id: this.id.value,
      propertyName: this.propertyName.value,
      address: this.address.value,
      typeofProperty: this.typeofProperty.value,
      numberofBedrooms: this.numberofBedrooms.value,
      numberofBathrooms: this.numberofBathrooms.value,
      isAvailable: this.isAvailable.value,
      description: this.description.value,
    };
    console.log(updatedData, 'updateddata');
  }

  createPropertyDetails() {
    const createdData = {
      propertyName: this.propertyName.value,
      address: this.address.value,
      typeofProperty: this.typeofProperty.value,
      numberofBedrooms: this.numberofBedrooms.value,
      numberofBathrooms: this.numberofBathrooms.value,
      isAvailable: this.isAvailable.value,
      description: this.description.value,
    };
    console.log(createdData, 'createddata');
  }
}

type requestType = 'create' | 'update' | 'view';
