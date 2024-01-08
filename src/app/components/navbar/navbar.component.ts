import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { TenantDetailsComponent } from '../tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from '../tenant-payments/tenant-payments.component';
import { UsersComponent } from '../users/users.component';
import { TenantComplaintsComponent } from '../tenant-complaints/tenant-complaints.component';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { SidebarService } from '../../services/src/lib/authentication/sidebar.service';

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
            [routerLink]="['/admin', userId, 'property-details']"
            (click)="toggleSidebar()"
          >
            <div class="flex gap-10">
              <mat-icon class="color">home</mat-icon>
              <div class="color">Property Details</div>
            </div>
          </a>
          <a
            mat-list-item
            [routerLink]="['/admin', userId, 'tenant-complaints']"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">report</mat-icon>
              <div class="color">Tenant Complaints</div>
            </div>
          </a>
          <a
            mat-list-item
            [routerLink]="['/admin', userId, 'tenant-residency-info']"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">person</mat-icon>
              <div class="color">Tenant Residency Info</div>
            </div>
          </a>
          <a
            mat-list-item
            [routerLink]="['/admin', userId, 'tenant-payment']"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">payment</mat-icon>
              <div class="color">Tenant Payments</div>
            </div>
          </a>
          <a
            mat-list-item
            [routerLink]="['/admin', userId, 'tenants-details']"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">supervised_user_circle</mat-icon>
              <div class="color">Tenants Details</div>
            </div>
          </a>

          <!-- Logout Button -->
          <div class="logout-button">
            <button mat-raised-button color="warn" (click)="logout()">
              <mat-icon style="color:white">logout</mat-icon>
            </button>
          </div>
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
  background: linear-gradient(
    // to right,
    // #ff3f34,
    // #00d8d6
    //     ); 
  background: blue;
        display: flex;
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
  padding:40px 10px; 
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
    .color{
      color:white;
      font-weight:400
    }
    .logout-button {
      position: absolute;
      bottom: 20px;
      left: 20px;
      width: calc(100% - 40px); /* Adjust width as needed */
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
export class NavbarComponent {
  userId: any;

  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private sidebar: SidebarService
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('Id');
  }
  logout() {
    this.authService.logout();
    this.logoutSnackbar();
  }
  toggleSidebar() {
    this.sidebar.toggleSidebar(true); // Always open sidebar when a link is clicked
  }
  logoutSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`LOGGED OUT SUCCESSFULLY`, 'X', config);
  }
}
