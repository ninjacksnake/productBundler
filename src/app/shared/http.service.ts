import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/api/v1';
  private refresshUrl = 'http://localhost:3000/api/v1/auth/refresh';

  refresh_token = localStorage.getItem('refresh_token');
  access_token = localStorage.getItem('access_token');

  headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.access_token,
  });

  constructor(
    private http: HttpClient,
    private matSnack: MatSnackBar,
    private router: Router
  ) {}

  refresh(): Observable<any> {
    return this.http
      .post(this.refresshUrl, { refresh_token: this.refresh_token })
      .pipe(
        map((response: any) => {
          localStorage.setItem('access_token', response.access_token);

          this.access_token = response.access_token;
          this.headers = new HttpHeaders({
            Authorization: 'Bearer ' + this.access_token,
          });
          return response;
        }),
        catchError((error: any) => {
          this.matSnack.open('Failed to refresh token', 'Close', {
            duration: 2000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['mat-snackbar-error'],
          });
          return error;
        })
      );
  }

  get(url: string): Observable<any> {
 // console.log(url);
    return this.http
      .get(this.apiUrl + url, {
        headers: this.headers,
      })
      .pipe(
        catchError((error: any) => {
          if (error.status === 401) {
            this.matSnack.open('Session expired, refreshing....', 'Close', {
              duration: 1500,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['mat-snackbar-error'],
            });
            
            // Return the refresh observable and handle the response
            return this.refresh().pipe(
              switchMap((response: any) => {
                if (!response?.access_token) {
                  this.router.navigate(['/login']);
                  return throwError(() => new Error('No access token received'));
                }
                // Retry the original request with new token
                return this.http.get(this.apiUrl + url, {
                  headers: this.headers,
                });
              }),
              catchError((refreshError) => {
                this.router.navigate(['/login']);
                return throwError(() => refreshError);
              })
            );
          }
          // For other errors, just pass them through
          return throwError(() => error);
        })
      );
  }

  post(url: string, body: any): Observable<any> {

    const response = this.http.post(this.apiUrl + url, body, {
      headers: this.headers,
    });

    return response;
  }

  put(url: string, body: any): Observable<any> {
    const response = this.http.put(this.apiUrl + url, body, {
      headers: this.headers,
    });
    return response;
  }

  delete(url: string): Observable<any> {
    const response = this.http.delete(this.apiUrl + url, {
      headers: this.headers,
    });

    return response;
  }
}
