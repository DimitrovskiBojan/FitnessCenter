import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Client, ClientFull } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ClientServiceService {
  constructor(private apiService: ApiService) {}

  getClients(): Observable<any[]> {
    const url = 'http://localhost:8080/mealPlans';
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

  getClient(id: string): Observable<ClientFull> {
    const url: string = 'http://localhost:8080/client/' + id;

    return this.apiService.get(url);
  }
}
