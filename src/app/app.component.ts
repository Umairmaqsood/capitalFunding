import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent,
} from './authentication';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsersNavbarComponent } from './users-components/users-navbar/users-navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    PropertyDetailsComponent,
    NavbarComponent,
    UsersNavbarComponent,
  ],
})
export class AppComponent {
  title = 'Capital Funding';
}
