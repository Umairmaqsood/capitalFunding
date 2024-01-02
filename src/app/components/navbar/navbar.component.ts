import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { TenantDetailsComponent } from '../tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from '../tenant-payments/tenant-payments.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <mat-toolbar color="warn">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>CAPITAL FUND</span>
    </mat-toolbar>

    <mat-drawer-container class="app-container">
      <mat-drawer #drawer mode="side" opened="true">
        <!-- Side navigation links -->
        <mat-nav-list class="sidebar-list">
          <a
            mat-list-item
            routerLink="/property-details"
            routerLinkActive="active"
          >
            <mat-icon>home</mat-icon>
            Property Details
          </a>
          <a
            mat-list-item
            routerLink="/tenant-complaints"
            routerLinkActive="active"
          >
            <mat-icon>report</mat-icon>
            Tenant Complaints
          </a>
          <a
            mat-list-item
            routerLink="/tenant-details"
            routerLinkActive="active"
          >
            <mat-icon>person</mat-icon>
            Tenant Residency Info
          </a>
          <a
            mat-list-item
            routerLink="/tenant-payment"
            routerLinkActive="active"
          >
            <mat-icon>payment</mat-icon>
            Tenant Payments
          </a>
          <a
            mat-list-item
            routerLink="/users-details"
            routerLinkActive="active"
          >
            <mat-icon>supervised_user_circle</mat-icon>
            Tenants Details
          </a>
          <!-- Add more navigation links as needed -->
        </mat-nav-list>
      </mat-drawer>

      <mat-drawer-content class="content">
        <ng-container>
          <!-- <app-property-details></app-property-details> -->
          <!-- <app-tenant-payments></app-tenant-payments> -->
          <app-tenant-details></app-tenant-details>
        </ng-container>
        <!-- <router-outlet></router-outlet> -->
      </mat-drawer-content>
    </mat-drawer-container>
  `,
  styles: [
    `/* Adjusting drawer width for different screen sizes */
.mat-drawer {
  width: 250px;
}
/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .mat-drawer {
    width: 200px;
  }
}

/* Set a fixed height and enable scrolling for the main content */
.content {
  height: calc(100vh - 64px); /* Adjust this height based on your toolbar's height */
  overflow-y: auto;
}

.sidebar-list {
  // background-color: #1a1a1a;
  padding: 16px; 
}

/* Styling for the links inside the sidebar navigation list */
.mat-nav-list a {
  color: white; 
}

.mat-nav-list a:hover {
  background-color: darkgreen; /* Change background color on hover */
}
,`,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PropertyDetailsComponent,
    TenantDetailsComponent,
    TenantPaymentsComponent,
  ],
})
export class NavbarComponent {}
