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
  private backendUrl = 'http://localhost:5180/api';

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

          // Extract and store specific data from the token in localStorage
          localStorage.setItem('userEmail', decodedToken.email || '');
          localStorage.setItem('Id', decodedToken.Id || '');
          localStorage.setItem('Name', decodedToken.Name || '');

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
    return this.http.post<any>(this.backendUrl + '/register', data);
  }

  mailVerify(email: string) {
    return this.http.get<any>(this.backendUrl + `/resendEmail?email=${email}`);
  }

  verifyEmail(email: string, otp: string) {
    const data = {
      email,
      otp,
    };

    return this.http.post<any>(this.backendUrl + '/verifyEmail', data);
  }

  createpropertyDetails(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

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

  createTenantsComplaints(complaintData: any, file: File) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      const formData = new FormData();
      formData.append('tenantId', complaintData.tenantId);
      formData.append('title', complaintData.title);
      formData.append('details', complaintData.details);
      formData.append('file', file);

      return this.http.post<any>(this.backendUrl + '/newComplaint', formData, {
        headers,
      });
    } else {
      console.error('Token not available');

      return of(null);
    }
  }

  updateTenantsComplaints(data: any) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.post<any>(this.backendUrl + `/updateComplain`, data, {
        headers,
      });
    } else {
      console.error('Token not available');
      return of(null);
    }
  }

  deleteTenantsComplaints(complainId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/removeComplain?complainId=${complainId}`,

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

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getAllComplains?page=${page}&pageSize=${pageSize}`,
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
  deleteUsersInfo(Id: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/deleteTenantInfo?Id=${Id}`,

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

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/dropDownTenantName`,

        { headers }
      );
    } else {
      return of(null);
    }
  }
  getDropDownUserName() {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

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

  getMontlyFair(userId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getMonthlyFair?userId=${userId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getPaymentHistory(userId: string, page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl +
          `/paymentsHistory?userId=${userId}&page=${page}&pageSize=${pageSize}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getUsersComplaints(userId: string, page: number, pageSize: number) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl +
          `/getComplaints?userId=${userId}&page=${page}&pageSize=${pageSize}`,

        { headers }
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getTenantId(userId: string) {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<any>(
        this.backendUrl + `/getTenantId?userId=${userId}`,

        { headers } // Pass the headers in the request options
      );
    } else {
      console.error('Token not available');

      return of(null); // You can return an observable with a null value
    }
  }

  getImage(complaintId: string): Observable<Blob | null> {
    const currentUser = localStorage.getItem('currentUser');
    const results = currentUser ? JSON.parse(currentUser) : null;

    if (results && results.results) {
      const headers = new HttpHeaders({
        Authorization: `Bearer ${results.results}`,
      });

      return this.http.get<Blob>(
        `${this.backendUrl}/getComplaintImage?complaintId=${complaintId}`,
        { headers, responseType: 'blob' as 'json' }
      );
    } else {
      console.error('Authorization token not available');
      return of(null);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('');
  }
}
