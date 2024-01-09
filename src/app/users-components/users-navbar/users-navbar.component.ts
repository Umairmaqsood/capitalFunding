import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
import { RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-users-navbar',
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
          <div class="nav-button">
            <a
              mat-list-item
              [routerLink]="['/user', userId, 'get-monthly-fair']"
              routerLinkActive="active"
            >
              <div class="flex gap-10">
                <mat-icon class="color">home</mat-icon>
                <div class="color">Get Monthly Fair</div>
              </div>
            </a>
          </div>

          <div class="nav-button">
            <a
              mat-list-item
              [routerLink]="['/user', userId, 'get-payment-history']"
              routerLinkActive="active"
            >
              <div class="flex gap-10">
                <mat-icon class="color">receipt</mat-icon>
                <div class="color">Get Payments History</div>
              </div>
            </a>
          </div>

          <div class="nav-button">
            <a
              mat-list-item
              [routerLink]="['/user', userId, 'create-complaint']"
              routerLinkActive="active"
            >
              <div class="flex gap-10">
                <mat-icon class="color">create</mat-icon>
                <div class="color">Create Complaint</div>
              </div>
            </a>
          </div>

          <div class="nav-button">
            <a
              mat-list-item
              [routerLink]="['/user', userId, 'get-users-complaint']"
              routerLinkActive="active"
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
  
        font-size: 16px;
        cursor: pointer;
        transition: background 0.3s ease;
      }
  
      .nav-button a:hover {
        background: linear-gradient(to right, #4f93ce, #00619b);
      }
   
  ,`,
  ],
  //   styles: [
  //     `/* Adjusting drawer width for different screen sizes */
  // .navbar-left {
  //   display: flex;
  //   align-items: center;
  // }

  // .name {
  //   margin-left: 16px;
  // }

  // .navbar-right {
  //   margin-left: auto;
  // }

  // .mat-drawer {
  //   width: 250px;
  //   // background: linear-gradient(
  //   //   to right,
  //   //         #f44336,
  //   //         #009688
  //   //       ); /* Apply a gradient with blue and red */

  //         background: blue;
  //         display: flex;
  //       }
  // /* Media query for smaller screens */
  // @media screen and (max-width: 768px) {
  //   .mat-drawer {
  //     width: 200px;
  //   }
  // }

  // /* Set a fixed height and enable scrolling for the main content */
  // .content {
  //   height: calc(100vh - 64px); /* Adjust this height based on your toolbar's height */
  //   overflow-y: auto;
  // }

  // .sidebar-list {
  //   padding:50px 10px;
  // }

  // /* Styling for the links inside the sidebar navigation list */
  // .mat-nav-list a {
  //   color: white;
  // }

  // .mat-nav-list a:hover {
  //   background-color: black; /* Change background color on hover */
  // }
  //  /* Gradient for mat-toolbar */
  //  mat-toolbar {
  //   background: linear-gradient(
  //           to right,
  //           red,
  //           blue
  //         ); /* Apply a gradient with blue and red */
  //         display: flex;

  //     }
  //     .color{
  //       color:white;
  //       font-weight:400
  //     }
  //     .logout-button {
  //       position: absolute;
  //       bottom: 20px;
  //       left: 20px;
  //       width: calc(100% - 40px); /* Adjust width as needed */
  //     }

  // ,`,
  //   ],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class UsersNavbarComponent {
  userId: any;
  nameFromLocalStorage: string = '';
  greeting: string = '';
  icon: string = '';
  constructor(
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
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
