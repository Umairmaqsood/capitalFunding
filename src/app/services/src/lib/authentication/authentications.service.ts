import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, range } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequestData } from '../../../../authentication';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private backendUrl = 'https://localhost:7139/api';

  // Behavior Subject to hold current user information
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Retrieving stored user from localStorage and initializing the Behavior Subject
    const storedUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.currentUserSubject.next(storedUser);
  }

  // Getters for current user value and data
  public get currentUserValue(): any {
    return this.currentUserSubject?.value;
  }
  public get currentUserData(): any {
    return this.currentUserSubject?.value?.user;
  }

  login(loginData: LoginRequestData) {
    return this.http.post<any>(`${this.backendUrl}/login`, loginData).pipe(
      map((loginResponse: any) => {
        if (loginResponse && loginResponse.results) {
          // Decode the received token
          const decodedToken: any = jwtDecode(loginResponse.results);

          console.log('decodedtoken', decodedToken);

          // Extract and store specific data from the token in localStorage
          localStorage.setItem('userEmail', decodedToken.email || '');

          // Store the entire response in 'currentUser' (if required)
          localStorage.setItem('currentUser', JSON.stringify(loginResponse));

          // Update the currentUserSubject (if needed)
          this.currentUserSubject.next(loginResponse);

          return loginResponse;
        } else {
          // Handle the case when there is no userToken in the response
          return null;
        }
      })
    );
  }

  signup(data: any) {
    return this.http.post<any>(this.backendUrl + '/register', { data });
  }

  createpropertyDetails(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/addNewProperty',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  updatepropertyDetails(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/updateProperty',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  deletepropertyDetails(propertyId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deleteProperty?propertyId=${propertyId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getPropertyDetails(page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllProperties?page=${page}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  createTenantsComplaints(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/newComplaint',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  updateTenantsComplaints(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/updateProperty',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  deleteTenantsComplaints(propertyId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deleteProperty?propertyId=${propertyId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getTenantsComplaints(page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllProperties?page=${page}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  createTenantsResidency(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/addNewContract',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  updateTenantsResidency(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/updateContract',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  deleteTenantsResidency(recordId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deleteContract?recordId=${recordId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getTenantsResidency(page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllContract?page=${page}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  createTenantsPaymentsInfo(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/addNewPayment',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  updateTenantsPaymentsInfo(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/updatePayments',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  deleteTenantsPaymentsInfo(recordId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deletePayment?recordId=${recordId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getTenantsPaymentsInfo(page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllPayments?page=${page}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  createUsersInfo(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/addNewTenant',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  updateUsersInfo(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(
        this.backendUrl + '/updateTenantInfo',
        data,
        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  deleteUsersInfo(recordId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deleteTenants?recordId=${recordId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getUsersInfo(page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllTenants?page=${page}&pageSize=${pageSize}`,
        {
          headers,
        }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getDropDownTenantName() {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/dropDownTenantName`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  getDropDownUserName() {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/dropDownUserName`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }
  getDropDownPropertyName() {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    console.log(results, 'tokenresult');

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/dropDownPropertyName`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth');
  }
}
