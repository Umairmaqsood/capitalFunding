import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PropertyDetailsComponent } from '../components/property-details/property-details.component';
import { TenantDetailsComponent } from '../components/tenant-details/tenant-details.component';
import { TenantComplaintsComponent } from '../components/tenant-complaints/tenant-complaints.component';
import { TenantPaymentsComponent } from '../components/tenant-payments/tenant-payments.component';
import { UsersComponent } from '../components/users/users.component';

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
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'property-details',
    component: PropertyDetailsComponent,
  },
  {
    path: 'tenant-complaints',
    component: TenantComplaintsComponent,
  },
  {
    path: 'tenant-residency-info',
    component: TenantDetailsComponent,
  },
  {
    path: 'tenant-payment',
    component: TenantPaymentsComponent,
  },
  {
    path: 'tenants-details',
    component: UsersComponent,
  },
];
