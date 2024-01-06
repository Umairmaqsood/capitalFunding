import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { TenantDetailsComponent } from '../tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from '../tenant-payments/tenant-payments.component';
import { UsersComponent } from '../users/users.component';
import { TenantComplaintsComponent } from '../tenant-complaints/tenant-complaints.component';
import { RouterModule } from '@angular/router';

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
            <div class="flex gap-10">
              <mat-icon>home</mat-icon>

              <div>Property Details</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenant-complaints"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon>report</mat-icon>
              <div>Tenant Complaints</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenant-residency-info"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon>person</mat-icon>
              <div>Tenant Residency Info</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenant-payment"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon>payment</mat-icon>
              <div>Tenant Payments</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenants-details"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon>supervised_user_circle</mat-icon>
              <div>Tenants Details</div>
            </div>
          </a>
          <!-- Add more navigation links as needed -->
        </mat-nav-list>
      </mat-drawer>

      <mat-drawer-content class="content">
        <ng-container></ng-container>
        <router-outlet></router-outlet>
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
  padding: 10px; 
}

/* Styling for the links inside the sidebar navigation list */
.mat-nav-list a {
  color: white; 
}

.mat-nav-list a:hover {
  background-color: darkgreen; /* Change background color on hover */
}
 /* Gradient for mat-toolbar */
 mat-toolbar {
  background: linear-gradient(
          to right,
          red,
          blue
        ); /* Apply a gradient with blue and red */
        display: flex;
       
    }
,`,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PropertyDetailsComponent,
    TenantDetailsComponent,
    TenantPaymentsComponent,
    UsersComponent,
    TenantComplaintsComponent,
    RouterModule,
  ],
})
export class NavbarComponent {}
