import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AccountInactiveComponent } from '../users-components/account-inactive/account-inactive.component';
import { VerifyEmailComponent } from '../users-components/verify-email/verify-email.component';

export const AUTH_ROUTE: Route[] = [
  {
    path: '',
    component: LoginComponent,
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: 'account-inactive',
    component: AccountInactiveComponent,
  },
];
