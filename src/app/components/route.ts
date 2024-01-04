import { Route } from '@angular/router';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { TenantComplaintsComponent } from './tenant-complaints/tenant-complaints.component';
import { TenantDetailsComponent } from './tenant-details/tenant-details.component';
import { TenantPaymentsComponent } from './tenant-payments/tenant-payments.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';

export const COMP_ROUTE: Route[] = [
  {
    path: '',
    component: NavbarComponent,
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
