import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<any> {
    const url = 'http://localhost:8080/api/v1/auth/authenticate'; // Replace with your actual login endpoint
    const body = { username, password };

    return this.apiService.post(url, body, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.error('Error in login service:', error);
        return throwError(error);
      })
    );
  }

  addCredits(username: string, credits: number): Observable<any> {
    const url = 'http://localhost:8080/client/credits';
    
    // Create FormData to handle the username and credits
    const formData = new FormData();
    formData.append('username', username);
    formData.append('credits', credits.toString());
  
    return this.apiService.postFormData(url, formData);
  }

  registerClient(client: Client): Observable<any>{
    const url = 'http://localhost:8080/register/client';
    const body = client;

    return this.apiService.post(url, body, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.error('Error in login service:', error);
        return throwError(error);
      })
    );
  }

  registerTrainer(client: Client): Observable<any>{
    const url = 'http://localhost:8080/register/trainer';
    const body = client;

    return this.apiService.post(url, body, { responseType: 'json' }).pipe(
      catchError((error) => {
        console.error('Error in login service:', error);
        return throwError(error);
      })
    );
  }
}
