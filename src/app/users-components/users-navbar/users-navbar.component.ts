import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-navbar',
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
            routerLink="/get-monthly-fair"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">home</mat-icon>

              <div class="color">Get Monthly Fair</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/get-payment-history"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">report</mat-icon>
              <div class="color">Get Payments History</div>
            </div>
          </a>

          <a
            mat-list-item
            routerLink="/create-complaint"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">report</mat-icon>
              <div class="color">Create Complaint</div>
            </div>
          </a>

          <a
            mat-list-item
            routerLink="/get-users-complaint"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">report</mat-icon>
              <div class="color">Get Users Complaint</div>
            </div>
          </a>

          <!-- <a
            mat-list-item
            routerLink="/tenant-residency-info"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">person</mat-icon>
              <div class="color">Tenant Residency Info</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenant-payment"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">payment</mat-icon>
              <div class="color">Tenant Payments</div>
            </div>
          </a>
          <a
            mat-list-item
            routerLink="/tenants-details"
            routerLinkActive="active"
          >
            <div class="flex gap-10">
              <mat-icon class="color">supervised_user_circle</mat-icon>
              <div class="color">Tenants Details</div>
            </div>
          </a> -->

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
    to right,
          #f44336,
          #009688
        ); /* Apply a gradient with blue and red */
        display: flex;}
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
  padding:50px 10px; 
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
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class UsersNavbarComponent {
  constructor(
    // private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {}
  logout() {
    // this.authService.logout();
    this.logoutSnackbar();
  }
  logoutSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`LOGGED OUT SUCCESSFULLY`, 'X', config);
  }
}
