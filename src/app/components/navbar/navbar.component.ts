import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <mat-toolbar color="warn">
      <button mat-icon-button (click)="drawer.toggle()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>RealEstate</span>
    </mat-toolbar>

    <mat-drawer-container class="app-container">
      <mat-drawer #drawer mode="side" opened="true">
        <!-- Side navigation links -->
        <mat-nav-list class="sidebar-list">
          <a mat-list-item> Home</a>
          <a mat-list-item>About</a>
          <a mat-list-item>Contact</a>
          <!-- Add more navigation links as needed -->
        </mat-nav-list>
      </mat-drawer>

      <mat-drawer-content class="content">
        <ng-container>
          <!-- <app-users-bio-data></app-users-bio-data> -->
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
})
export class NavbarComponent {}
