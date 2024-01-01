import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  ForgotPasswordComponent,
  LoginComponent,
  SignUpComponent,
} from './authentication';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LoginComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    PropertyDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Capital Funding';
}
