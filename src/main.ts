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
import { COMP_ROUTE } from './app/components';
import { USER_COMP } from './app/users-components';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));

// if (environment.production) {
//   enableProdMode();
// }
const routes: Routes = [
  {
    path: 'auth',
    children: AUTH_ROUTE,
  },
  {
    path: '',
    children: COMP_ROUTE,
  },
  {
    path: '',
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
