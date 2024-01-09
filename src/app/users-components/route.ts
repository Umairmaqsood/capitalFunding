import { Route } from '@angular/router';
import { UsersNavbarComponent } from './users-navbar/users-navbar.component';
import { UsersGetMonthlyFairComponent } from './users-get-monthly-fair/users-get-monthly-fair.component';
import { UsersGetPaymentHistoryComponent } from './users-get-payment-history/users-get-payment-history.component';
import { GetUsersComplaintsComponent } from './get-users-complaints/get-users-complaints.component';
import { CreateUsersComplaintsComponent } from './create-users-complaints/create-users-complaints.component';

export const USER_COMP: Route[] = [
  {
    path: 'get-monthly-fair',
    component: UsersGetMonthlyFairComponent,
  },
  {
    path: 'get-payment-history',
    component: UsersGetPaymentHistoryComponent,
  },
  {
    path: 'create-complaint',
    component: CreateUsersComplaintsComponent,
  },
  {
    path: 'get-users-complaint',
    component: GetUsersComplaintsComponent,
  },
];
