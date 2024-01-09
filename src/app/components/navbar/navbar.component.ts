import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { PropertyDetailsComponent } from '../property-details/property-details.component';
import { TenantDetailsComponent } from '../tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from '../tenant-payments/tenant-payments.component';
import { UsersComponent } from '../users/users.component';
import { TenantComplaintsComponent } from '../tenant-complaints/tenant-complaints.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
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

      <div class="navbar-left name">
        <span>CAPITAL FUND</span>
      </div>

      <div class="navbar-right">
        <span class="name">{{ greeting }}, {{ nameFromLocalStorage }}</span>
        <mat-icon style="padding: 0 12px;">{{ icon }}</mat-icon>
      </div>
    </mat-toolbar>

    <mat-drawer-container class="app-container">
      <mat-drawer #drawer mode="side" opened="true">
        <!-- Side navigation links -->
        <mat-nav-list class="sidebar-list">
          <div class="nav-button" [routerLinkActive]="['active-link']">
            <a
              mat-list-item
              [routerLink]="['/admin', userId, 'property-details']"
            >
              <div class="flex gap-10">
                <mat-icon class="color">home</mat-icon>
                <div class="color">Property Details</div>
              </div>
            </a>
          </div>

          <div class="nav-button" [routerLinkActive]="['active-link']">
            <a
              mat-list-item
              [routerLink]="['/admin', userId, 'tenants-details']"
            >
              <div class="flex gap-10">
                <mat-icon class="color">supervised_user_circle</mat-icon>
                <div class="color">Tenants Details</div>
              </div>
            </a>
          </div>

          <div class="nav-button" [routerLinkActive]="['active-link']">
            <a
              mat-list-item
              [routerLink]="['/admin', userId, 'tenant-residency-info']"
            >
              <div class="flex gap-10">
                <mat-icon class="color">person</mat-icon>
                <div class="color">Tenant Residency Info</div>
              </div>
            </a>
          </div>

          <div class="nav-button" [routerLinkActive]="['active-link']">
            <a
              mat-list-item
              [routerLink]="['/admin', userId, 'tenant-payment']"
            >
              <div class="flex gap-10">
                <mat-icon class="color">payment</mat-icon>
                <div class="color">Tenant Payments</div>
              </div>
            </a>
          </div>

          <div class="nav-button" [routerLinkActive]="['active-link']">
            <a
              mat-list-item
              [routerLink]="['/admin', userId, 'tenant-complaints']"
            >
              <div class="flex gap-10">
                <mat-icon class="color">report</mat-icon>
                <div class="color">Get Users Complaint</div>
              </div>
            </a>
          </div>

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
    `
.navbar-left {
  display: flex;
  align-items: center;
}

.name {
  margin-left: 16px;
}

.navbar-right {
  margin-left: auto;
}

    
.mat-drawer {
      width: 250px;
      background: linear-gradient(to right, #005377, #002544);
      display: flex;
      flex-direction: column;
      transition: background 0.3s ease; 
    }

    .mat-drawer:hover {
      background: linear-gradient(to right, #005377, #002544);
    }

    @media screen and (max-width: 768px) {
      .mat-drawer {
        width: 200px;
      }
    }

    .content {
      height: calc(100vh - 64px);
      overflow-y: auto;
    }

    .sidebar-list {
      padding: 40px 10px;
      flex-grow: 1; 
    }

    .mat-nav-list a {
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      padding: 10px;
      text-decoration: none;
      transition: background 0.3s ease; 
    }

    .mat-nav-list a:hover {
      background: linear-gradient(to right, #005377, #002544);
    }

    .mat-nav-list a mat-icon {
      margin-right: 10px;
      font-size: 24px;
    }

    mat-toolbar {
      background: linear-gradient(to right, #4f93ce, #00619b);
      display: flex;
    }

    .color {
      color: white;
      font-weight: 400;
    }

    .logout-button {
      position: absolute;
      bottom: 20px;
      left: 20px;
      width: calc(100% - 40px);
      text-align: center;
    }

    .logout-button button {
      background: linear-gradient(to right, #4f93ce, #00619b);
      color: white;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .logout-button button:hover {
      background: linear-gradient(to right, #005377, #002544);
    }

    //=================================================================

    .nav-button {
      text-align: center;
    }

    .nav-button {
      background: linear-gradient(to right, #005377, #002544);
      color: white;
      border: none;
      border-radius:8px;
      font-size: 16px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .nav-button a:hover {
      border-radius:8px;
      background: linear-gradient(to right, #4f93ce, #00619b);
    }
 
.nav-button.active-link {
  background: linear-gradient(to right, #4a7baf, #003e66);}

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
  nameFromLocalStorage: string = '';
  greeting: string = '';
  icon: string = '';

  sidebarOpen = false;

  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar,
    private sidebarService: SidebarService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    this.nameFromLocalStorage = localStorage.getItem('Name') || '';

    const currentTime = new Date().getHours();
    this.setGreetingAndIcon(currentTime);
  }

  setGreetingAndIcon(currentTime: number): void {
    if (currentTime >= 5 && currentTime < 12) {
      this.greeting = 'Good Morning';
      this.icon = 'wb_sunny';
    } else if (currentTime >= 12 && currentTime < 18) {
      this.greeting = 'Good Afternoon';
      this.icon = 'wb_cloudy';
    } else {
      this.greeting = 'Good Evening';
      this.icon = 'nights_stay';
    }
  }

  logout() {
    this.authService.logout();
    this.logoutSnackbar();
  }

  logoutSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`LOGGED OUT SUCCESSFULLY`, 'X', config);
  }
}
