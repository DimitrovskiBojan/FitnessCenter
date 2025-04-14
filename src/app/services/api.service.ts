import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { asapScheduler, Observable } from 'rxjs';
import { Options } from '../../types';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private token: string = window.localStorage.getItem('token') as string;
  get<T>(url: string, options?: Options): Observable<T> {
    const defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      }),
      params: new HttpParams(),
    };

    // Merge default options with the provided options
    const mergedOptions = { ...defaultOptions, ...options };

    return this.httpClient.get<T>(url, mergedOptions) as Observable<T>;
  }

  post<T>(url: string, body: any, options?: Options): Observable<T> {
    const defaultOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: new HttpParams(),
    };
    const mergedOptions = { ...defaultOptions, ...options };

    return this.httpClient.post<T>(url, body, mergedOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log full error for debugging
        console.error('Error details:', error);

        // Return a more informative error if needed
        if (error.status === 201) {
          return of(error.error as T);
        } else {
          // Use error.message if available, otherwise fallback to a generic message
          const errorMessage =
            error.error?.error || error.message || 'An unknown error occurred';
          return throwError(() => new Error(errorMessage));
        }
      })
    );
  }

  postFormData<T>(url: string, body: any, options?: Options): Observable<T> {
    // Initialize headers
    
    let headers = new HttpHeaders();
    console.log(body)
    // Check for the token and add it to the headers if it exists
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }

    // Determine the content type based on the body type
    if (body instanceof FormData) {
      // No need to set 'Content-Type' header for FormData
      headers = headers.delete('Content-Type');
    } else {
      headers = headers.set('Content-Type', 'application/json');
    }

    // Set default options
    const defaultOptions = {
      headers,
      params: new HttpParams(),
    };

    // Merge default options with the passed options
    const mergedOptions = { ...defaultOptions, ...options };

    // Make the POST request
    return this.httpClient.post<T>(url, body, mergedOptions) as Observable<T>;
  }

  delete<T>(url: string, options?: Options): Observable<T> {
    // Initialize headers
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    // Check for the token and add it to the headers if it exists
    if (this.token) {
      headers = headers.set('Authorization', `Bearer ${this.token}`);
    }
  
    // Set default options
    const defaultOptions = {
      headers,
      params: new HttpParams(),
    };
  
    // Merge default options with the passed options
    const mergedOptions = { ...defaultOptions, ...options };
  
    // Make the DELETE request
    return this.httpClient.delete<T>(url, mergedOptions) as Observable<T>;
  }
  
}
