import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Product, Trainer } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainerServiceService {

  constructor(private apiService: ApiService) {}


  saveImage(formData: FormData): Observable<any> {
    const url = 'http://localhost:8080/trainer/image';
    return this.apiService.postFormData(url, formData);
  }  

  getTrainer(id: string): Observable<Trainer> {

    const url: string  = "http://localhost:8080/trainer/" + id;

    console.log(url)

    return this.apiService.get(url);
  }

  getAllTrainers(): Observable<any[]>{
    const url = "http://localhost:8080/trainer/getAll"
    return this.apiService.get(url, {
      responseType: 'json'
    })
  }
}
