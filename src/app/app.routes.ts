import { Routes } from '@angular/router';
import { LoginComponent } from './authentication';
import { ForgotPasswordComponent } from './authentication';
import { SignUpComponent } from './authentication';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';
import { UsersComponent } from './components/users/users.component';
import { TenantComplaintsComponent } from './components/tenant-complaints/tenant-complaints.component';
import { TenantDetailsComponent } from './components/tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from './components/tenant-payments/tenant-payments.component';

export const routes: Routes = [
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
    path: 'tenant-details',
    component: TenantDetailsComponent,
  },
  {
    path: 'tenant-payment',
    component: TenantPaymentsComponent,
  },
  {
    path: 'users-details',
    component: UsersComponent,
  },
];

export default routes; // Exporting the routes variable
