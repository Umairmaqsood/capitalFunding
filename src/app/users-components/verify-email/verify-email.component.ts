import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/src/public-api';
import {
  AsyncSpinnerButtonComponent,
  AsyncSpinnerComponent,
} from '../../components';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-verify-email',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AsyncSpinnerComponent,
    AsyncSpinnerButtonComponent,
  ],
  template: `
    <div class="container">
      <div class="content">
        <mat-card *ngIf="resetPasswordStep === 1" class="login">
          <mat-card-header>
            <mat-card-title>Verify Email</mat-card-title>
          </mat-card-header>
          <form [formGroup]="otpFormGroup" class="example-container">
            <mat-form-field appearance="outline">
              <mat-icon matPrefix
                ><svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.1212 15.8969C16.679 14.8496 16.0374 13.8984 15.2321 13.0961C14.4292 12.2915 13.4781 11.65 12.4313 11.207C12.4219 11.2023 12.4126 11.2 12.4032 11.1953C13.8633 10.1406 14.8126 8.42266 14.8126 6.48438C14.8126 3.27344 12.211 0.671875 9.00006 0.671875C5.78912 0.671875 3.18756 3.27344 3.18756 6.48438C3.18756 8.42266 4.13678 10.1406 5.59693 11.1977C5.58756 11.2023 5.57818 11.2047 5.56881 11.2094C4.51881 11.6523 3.57662 12.2875 2.76803 13.0984C1.96344 13.9013 1.32194 14.8524 0.878965 15.8992C0.443782 16.924 0.209079 18.0228 0.187559 19.1359C0.186933 19.161 0.191321 19.1858 0.200463 19.2091C0.209605 19.2324 0.223317 19.2537 0.240791 19.2716C0.258264 19.2895 0.279146 19.3037 0.302206 19.3134C0.325265 19.3231 0.350036 19.3281 0.375059 19.3281H1.78131C1.88443 19.3281 1.96646 19.2461 1.96881 19.1453C2.01568 17.3359 2.74225 15.6414 4.02662 14.357C5.35553 13.0281 7.12037 12.2969 9.00006 12.2969C10.8797 12.2969 12.6446 13.0281 13.9735 14.357C15.2579 15.6414 15.9844 17.3359 16.0313 19.1453C16.0337 19.2484 16.1157 19.3281 16.2188 19.3281H17.6251C17.6501 19.3281 17.6749 19.3231 17.6979 19.3134C17.721 19.3037 17.7419 19.2895 17.7593 19.2716C17.7768 19.2537 17.7905 19.2324 17.7997 19.2091C17.8088 19.1858 17.8132 19.161 17.8126 19.1359C17.7891 18.0156 17.5571 16.9258 17.1212 15.8969ZM9.00006 10.5156C7.92428 10.5156 6.91178 10.0961 6.15006 9.33438C5.38834 8.57266 4.96881 7.56016 4.96881 6.48438C4.96881 5.40859 5.38834 4.39609 6.15006 3.63437C6.91178 2.87266 7.92428 2.45312 9.00006 2.45312C10.0758 2.45312 11.0883 2.87266 11.8501 3.63437C12.6118 4.39609 13.0313 5.40859 13.0313 6.48438C13.0313 7.56016 12.6118 8.57266 11.8501 9.33438C11.0883 10.0961 10.0758 10.5156 9.00006 10.5156Z"
                    fill="#9A9A9A"
                  />
                </svg>
              </mat-icon>
              <mat-label>Enter your email</mat-label>
              <input matInput type="email" formControlName="email" required />
            </mat-form-field>
            <mat-card-actions>
              <app-async-spinner-button
                [isAsyncCall]="isAsyncCall"
                (click)="onSubmitEmail()"
                >Send OTP</app-async-spinner-button
              >
            </mat-card-actions>
          </form>
        </mat-card>

        <mat-card *ngIf="resetPasswordStep === 2" class="login">
          <mat-card-header>
            <mat-card-title>Enter OTP</mat-card-title>
          </mat-card-header>
          <form
            [formGroup]="otpFormGroup"
            (ngSubmit)="onSubmitOtp()"
            class="example-container"
          >
            <mat-form-field appearance="outline">
              <mat-label>Enter OTP</mat-label>
              <input matInput type="text" formControlName="otp" required />
            </mat-form-field>
            <mat-card-actions>
              <button type="submit" mat-raised-button class="mat-btn">
                Verify OTP
              </button>
            </mat-card-actions>
          </form>
        </mat-card>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        background: linear-gradient(
          to right,
          blue,
          red
        ); /* Apply a gradient with blue and red */
        height: 100vh; /* Set height to cover the entire viewport */
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .content {
        flex: 1;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .login {
        max-width: 400px;
        width: 100%;
        margin: 20px;
      }

      .example-container {
        padding: 20px;
      }

      mat-card {
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .mat-btn {
        background-color: #2aaa8a !important;
      }

      mat-card-title {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 15px;
      }

      mat-form-field {
        width: 100%;
      }

      mat-card-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
      }

      button {
        margin-left: 10px;
      }
    `,
  ],
})
export class VerifyEmailComponent {
  hide1 = true;
  hide2 = true;
  resetPasswordStep = 1;
  isAsyncCall = false;

  otpFormGroup!: FormGroup;
  passwordFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authensService: AuthenticationService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.otpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
    });
  }

  onSubmitEmail() {
    if (this.otpFormGroup && this.otpFormGroup.get('email')) {
      const emailControl = this.otpFormGroup.get('email');
      if (emailControl && emailControl.valid) {
        const email: string = emailControl.value;
        this.isAsyncCall = true;
        this.authensService.mailVerify(email).subscribe(
          (res: any) => {
            if (res) {
              this.resetPasswordStep = 2;
              this.otpSendToEmail();
              this.isAsyncCall = false;
            }
          },

          (error: any) => {
            if (error.status === 400) {
              this.emailNotFound400();
              this.isAsyncCall = false;
            } else {
              this.error();
              this.isAsyncCall = false;
            }
          }
        );
      }
    }
  }

  onSubmitOtp() {
    if (
      this.otpFormGroup &&
      this.otpFormGroup.get('email') &&
      this.otpFormGroup.get('otp')
    ) {
      const emailControl = this.otpFormGroup.get('email');
      const otpControl = this.otpFormGroup.get('otp');

      if (
        emailControl &&
        otpControl &&
        emailControl.valid &&
        otpControl.valid
      ) {
        const email: string = emailControl.value;
        const otp: string = otpControl.value;
        this.isAsyncCall = true;
        this.authensService.verifyEmail(email, otp).subscribe(
          (res: any) => {
            if (res) {
              this.isAsyncCall = false;
              this.otpVerified();
              this.router.navigateByUrl('');
            }
          },
          (error) => {
            if (error.status === 400) {
              this.otpSnackBarError();
              this.isAsyncCall = false;
            } else {
              this.error();
              this.isAsyncCall = false;
            }
          }
        );
      }
    }
  }

  otpSnackBarError() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`INCORRECT OTP. PLEASE ENTER A VALID ONE`, 'X', config);
  }
  otpVerified() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`OTP VERIFIED SUCCESSFULLY`, 'X', config);
  }

  error() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`AN ERROR OCCURED. PLEASE TRY AGAIN LATER`, 'X', config);
  }

  otpSendToEmail() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(
      `6-DIGITS OTP HAS BEEN SENT TO YOUR REGISTERED EMAIL`,
      'X',
      config
    );
  }

  emailNotFound400() {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(
      `EMAIL NOT FOUND, PLEASE ENTER A VALID ONE`,
      'X',
      config
    );
  }
}
