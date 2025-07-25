import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AsyncSpinnerButtonComponent } from '../../components/async-spinner-button/async-spinner-button.component';
import { MaterialModule } from '../../material/src/public-api';
import { AuthenticationService } from '../../services/src/lib/authentication/authentications.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  template: `
    <!-- signup.component.html -->

    <div class="container">
      <div class="center">
        <mat-card class="signup-card" *ngIf="resetPasswordStep === 1">
          <h1
            style="text-align: center !important; font-weight:bold; margin-top:10px"
          >
            Sign Up
          </h1>

          <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
            <!-- Name -->
            <mat-form-field appearance="outline">
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" />
              <mat-error *ngIf="form['name'].errors?.['required']"
                >Name is <strong>required</strong></mat-error
              >
            </mat-form-field>

            <!-- Email -->
            <mat-form-field appearance="outline">
              <mat-label>Enter your email</mat-label>
              <input matInput formControlName="email" required />
              <mat-error *ngIf="form['email'].errors?.['required']"
                >Email is <strong>required</strong></mat-error
              >
              <mat-error *ngIf="form['email'].errors?.['email']"
                >Email is <strong>not valid</strong></mat-error
              >
            </mat-form-field>

            <!-- Password -->

            <mat-form-field appearance="outline">
              <mat-icon matPrefix
                ><svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.75 0.5C13.6959 0.499758 12.6565 0.746425 11.7149 1.22023C10.7734 1.69404 9.95589 2.38181 9.328 3.22844C8.7001 4.07506 8.27925 5.057 8.09917 6.09555C7.91909 7.13411 7.98479 8.20041 8.291 9.209L0.5 17V21.5H5L12.791 13.709C13.7194 13.9908 14.6977 14.0692 15.6591 13.9387C16.6206 13.8083 17.5426 13.4721 18.3624 12.953C19.1821 12.434 19.8804 11.7444 20.4095 10.9311C20.9386 10.1178 21.2862 9.20001 21.4285 8.24025C21.5709 7.28049 21.5046 6.30132 21.2343 5.36948C20.964 4.43764 20.496 3.57502 19.8622 2.84042C19.2283 2.10582 18.4436 1.51649 17.5614 1.11261C16.6792 0.708724 15.7203 0.499775 14.75 0.5ZM14.75 12.5C14.2336 12.4997 13.7201 12.4234 13.226 12.2735L12.3657 12.0125L11.7305 12.6478L9.34475 15.0335L8.3105 14L7.25 15.0605L8.28425 16.0947L7.09475 17.2843L6.0605 16.25L5 17.3105L6.03425 18.3447L4.379 20H2V17.621L9.3515 10.2695L9.9875 9.63425L9.7265 8.774C9.40594 7.71724 9.42676 6.58631 9.78601 5.54207C10.1453 4.49784 10.8247 3.59347 11.7275 2.95762C12.6304 2.32177 13.7108 1.98681 14.815 2.0004C15.9192 2.01398 16.9911 2.37542 17.878 3.03329C18.765 3.69116 19.4219 4.61197 19.7554 5.66473C20.0888 6.71749 20.0818 7.84859 19.7354 8.89714C19.3889 9.94569 18.7206 10.8583 17.8256 11.5051C16.9305 12.152 15.8543 12.5001 14.75 12.5Z"
                    fill="#9A9A9A"
                  />
                </svg>
              </mat-icon>
              <mat-label>Password</mat-label>
              <input
                formControlName="password"
                matInput
                [type]="hide1 ? 'password' : 'text'"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hide1 = !hide1"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide1"
              >
                <mat-icon>{{
                  hide1 ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
              <mat-error *ngIf="form['password'].errors?.['required']"
                >Password is <strong>required</strong>
              </mat-error>
              <mat-error *ngIf="form['password'].errors?.['invalidPassword']">
                Password atleast should 8+ chars, 1 uppercase, 1 lowercase, 1
                special character, 1 number.
              </mat-error>
            </mat-form-field>

            <!-- Confirm Password -->

            <mat-form-field appearance="outline">
              <mat-icon matPrefix
                ><svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.75 0.5C13.6959 0.499758 12.6565 0.746425 11.7149 1.22023C10.7734 1.69404 9.95589 2.38181 9.328 3.22844C8.7001 4.07506 8.27925 5.057 8.09917 6.09555C7.91909 7.13411 7.98479 8.20041 8.291 9.209L0.5 17V21.5H5L12.791 13.709C13.7194 13.9908 14.6977 14.0692 15.6591 13.9387C16.6206 13.8083 17.5426 13.4721 18.3624 12.953C19.1821 12.434 19.8804 11.7444 20.4095 10.9311C20.9386 10.1178 21.2862 9.20001 21.4285 8.24025C21.5709 7.28049 21.5046 6.30132 21.2343 5.36948C20.964 4.43764 20.496 3.57502 19.8622 2.84042C19.2283 2.10582 18.4436 1.51649 17.5614 1.11261C16.6792 0.708724 15.7203 0.499775 14.75 0.5ZM14.75 12.5C14.2336 12.4997 13.7201 12.4234 13.226 12.2735L12.3657 12.0125L11.7305 12.6478L9.34475 15.0335L8.3105 14L7.25 15.0605L8.28425 16.0947L7.09475 17.2843L6.0605 16.25L5 17.3105L6.03425 18.3447L4.379 20H2V17.621L9.3515 10.2695L9.9875 9.63425L9.7265 8.774C9.40594 7.71724 9.42676 6.58631 9.78601 5.54207C10.1453 4.49784 10.8247 3.59347 11.7275 2.95762C12.6304 2.32177 13.7108 1.98681 14.815 2.0004C15.9192 2.01398 16.9911 2.37542 17.878 3.03329C18.765 3.69116 19.4219 4.61197 19.7554 5.66473C20.0888 6.71749 20.0818 7.84859 19.7354 8.89714C19.3889 9.94569 18.7206 10.8583 17.8256 11.5051C16.9305 12.152 15.8543 12.5001 14.75 12.5Z"
                    fill="#9A9A9A"
                  />
                </svg>
              </mat-icon>
              <mat-label>Confirm Password</mat-label>
              <input
                formControlName="confirmpassword"
                matInput
                [type]="hide2 ? 'password' : 'text'"
              />
              <button
                mat-icon-button
                matSuffix
                (click)="hide2 = !hide2"
                [attr.aria-label]="'Hide password'"
                [attr.aria-pressed]="hide2"
              >
                <mat-icon>{{
                  hide2 ? 'visibility_off' : 'visibility'
                }}</mat-icon>
              </button>
              <mat-error *ngIf="form['confirmpassword'].errors?.['required']"
                >Confirm Password field is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <div
              class="flex gap-10"
              style="align-items: center; justify-content:space-between; "
            ></div>
            <div
              style="color: red;"
              *ngIf="
                form['password'].valid &&
                signupForm.hasError('passwordsMismatch')
              "
            >
              Passwords do not match
            </div>

            <!-- Gender -->
            <mat-form-field appearance="outline">
              <mat-label>Gender</mat-label>
              <mat-select formControlName="gender" required>
                <mat-option value="male">Male</mat-option>
                <mat-option value="female">Female</mat-option>
                <mat-option value="others">Others</mat-option>
              </mat-select>
              <mat-error *ngIf="form['gender']?.errors?.['required']">
                Gender is <strong>required</strong>
              </mat-error>
            </mat-form-field>

            <mat-card-actions class="jc-center">
              <app-async-spinner-button
                style="width:50%;color:white;align:center;"
                [isAsyncCall]="isAsyncCall"
                [disabled]="signupForm.invalid"
                [ngStyle]="{
                  'background-color': signupForm.invalid ? '#2aaa8a' : '#2aaa8a'
                }"
                >Sign Up</app-async-spinner-button
              >
            </mat-card-actions>
          </form>
          <div>
            <h6 style="text-align:center;">
              Already have an account,
              <button mat-button>
                <a style="cursor: pointer;color: red;" (click)="login()"
                  >Log in</a
                >
              </button>
            </h6>
          </div>
        </mat-card>

        <mat-card class="reset" *ngIf="resetPasswordStep === 2">
          <mat-card-header>
            <mat-card-title>Enter OTP</mat-card-title>
          </mat-card-header>
          <form class="example-container" [formGroup]="otpFormGroup">
            <mat-form-field appearance="outline" class="full">
              <mat-label>Enter OTP</mat-label>
              <input matInput type="text" formControlName="otp" required />
            </mat-form-field>
            <mat-card-actions>
              <button
                type="submit"
                (click)="onSubmitOtp()"
                mat-raised-button
                style="background-color:#2aaa8a"
              >
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
      .signup-card {
        padding: 5px 30px;
        border-radius: 10px;
        width: 100%;
        max-width: 400px; /* Adjust as needed */
        text-align: center;
        margin: auto;
      }

      .reset {
        padding: 50px 70px;
        border-radius: 10px;
        width: 100%;
        max-width: 400px; /* Adjust as needed */
        text-align: center;
        margin: auto;
      }
      .container {
        background: linear-gradient(
          to right,
          blue,
          red
        ); /* Apply a gradient with blue and red */
        height: 100vh; /* Set height to cover the entire viewport */
        display: flex;
        justify-content: center;
      }

      .center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 0px;
        text-align: left;
      }

      button[type='submit'] {
        width: 100%;
        color: white;
        text-align: center;
      }

      h6 {
        text-align: center;
        color: #9a9a9a;
      }

      .jc-center {
        justify-content: center;
      }
      .full {
        width: 100%;
      }
    `,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AsyncSpinnerButtonComponent,
  ],
})
export class SignUpComponent {
  resetPasswordStep = 1;
  hide1 = true;
  hide2 = true;
  hasSpecialCharacter = new RegExp(/[ [!@#$%^&*()_+-=[]{};':"|,.<>/);
  hasNumber = new RegExp(/\d/);
  userTypes: any[] = [];
  userTypeId: any = '';
  signupForm!: FormGroup;
  isAsyncCall = false;
  storedEmail: string = ''; // Store email value here

  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    // private toastr: ToastrService,
    private authService: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
    let MOBILE_PATTERN = /^[0-9]{10,10}$/;
    this.signupForm = this.formBuilder.group(
      {
        name: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],

        gender: ['', Validators.required],

        password: [
          '',
          Validators.compose([Validators.required, this.patternValidator()]),
        ],
        confirmpassword: ['', Validators.required],
        // location: ['', Validators.required],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  otpFormGroup!: FormGroup;

  ngOnInit() {
    this.otpFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
    });
  }

  get otp() {
    return this.otpFormGroup.controls['otp'];
  }
  get email() {
    return this.otpFormGroup.controls['email'];
  }

  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[@$!%*?&]).{8,}$'
      );
      const valid = regex.test(control.value);
      console.log('valid', valid);
      return valid ? null : { invalidPassword: true };
    };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      console.log('Invalid Email');
    }

    const userObj: any = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      name: this.signupForm.value.name,
      gender: this.signupForm.value.gender,
    };

    console.log(userObj, 'userobj');

    this.storedEmail = this.signupForm.value.email;

    this.isAsyncCall = true;
    this.authService.signup(userObj).subscribe(
      (res: any) => {
        if (res) {
          this.successSnackbarRegistered();
          this.resetPasswordStep = 2;
          this.isAsyncCall = false;
        }
      },
      (error: any) => {
        if (error.status === 400) {
          this.errorSnackbar();
          this.isAsyncCall = false;
        } else {
          this.error();
          this.isAsyncCall = false;
        }
      }
    );
  }

  onSubmitOtp(): void {
    const otp = this.otpFormGroup.get('otp')?.value;

    if (this.storedEmail && otp) {
      this.isAsyncCall = true;
      this.authService.verifyEmail(this.storedEmail, otp).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['']);
            this.otpVerify();
            this.isAsyncCall = false;
            // Do something with the response if needed
          }
        },
        (error) => {
          console.error('Error while verifying OTP:', error);
          this.invalidotp();
          this.isAsyncCall = false;
          // Handle the error, show a message, etc.
        }
      );
    } else {
      console.error('OTP or Email is not valid');
    }
  }

  get form() {
    return this.signupForm.controls;
  }
  passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmpassword')?.value;

    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    } else {
      return null;
    }
  }
  login() {
    this.router.navigateByUrl('');
  }

  successSnackbarRegistered(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(
      `ACCOUNT CREATED SUCCESSFULLY. 6 DIGITS OTP HAS BEEN SEND TO YOUR EMAIL.`,
      'X',
      config
    );
  }

  errorSnackbarRegistered(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`USER IS ALREADY REGISTERED, ERROR`, 'X', config);
  }

  errorSnackbar(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`USER IS ALREADY REGISTERED, ERROR`, 'X', config);
  }
  error(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`AN ERROR OCCURED. PLEASE TRY AGAIN LATER`, 'X', config);
  }
  invalidotp(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`INVALID OTP`, 'X', config);
  }
  otpVerify(): void {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    this.snackbar.open(`OTP VERIFIED SUCCESSFULLY`, 'X', config);
  }
}
