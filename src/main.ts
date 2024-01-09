import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// import { environment } from './environments/environment';
// import { AuthGuard, ErrorInterceptor, HttpConfigInterceptor } from '@berd/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app/app.component';
import { AUTH_ROUTE } from './app/authentication/route';
import { BehaviorSubject } from 'rxjs';
import { COMP_ROUTE, NavbarComponent } from './app/components';
import { USER_COMP } from './app/users-components';
import { UsersNavbarComponent } from './app/users-components/users-navbar/users-navbar.component';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// if (environment.production) {
//   enableProdMode();
// }
const routes: Routes = [
  {
    path: '',
    children: AUTH_ROUTE,
  },
  {
    path: 'admin/:userId',
    component: NavbarComponent,
    children: COMP_ROUTE,
  },
  {
    path: 'user/:userId',
    component: UsersNavbarComponent,
    children: USER_COMP,
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      RouterModule.forRoot(routes),
      BehaviorSubject,
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatSnackBarModule,
      MatDialogModule
    ),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
