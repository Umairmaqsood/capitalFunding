import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../material/src/public-api';

@Component({
  selector: 'app-account-inactive',
  imports: [CommonModule, MaterialModule],
  standalone: true,
  template: `
    <div class="container">
      <div class="content">
        <div class="card-wrapper">
          <mat-card class="message-card">
            <div>
              <h1 class="blink" style="color: red; font-weight: bold;">
                Your Account is Inactive
              </h1>
              <h2 style="font-weight: bold;">
                Please Contact the Admin for Further Support
              </h2>
            </div>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: `
    .container {
      background: linear-gradient(to right, blue, red);
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .content {
      flex: 1;
      overflow: auto;
      background-color: transparent; /* Set container background as transparent */
    }

    .card-wrapper {
      display: flex;
      justify-content: center;
    }

    .message-card {
      padding: 60px 50px;
      color: black !important;
      border-radius: 10px;
      width: 380px;
     
      background-color: white !important; /* Set card background as transparent */
      box-shadow: none; /* Remove default box shadow */
    }

    @keyframes blink-animation {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }

    .blink {
      animation: blink-animation 1.5s infinite alternate;
    }
  `,
})
export class AccountInactiveComponent {}
