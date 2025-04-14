import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrainigTermService {
  

  constructor(private apiService: ApiService) {}

  getTrainingTermsForTrainer(trainerId : number): Observable<any[]>{
    const url = `http://localhost:8080/trainingTerms/forTrainer/${trainerId}`

    return this.apiService.get(url);
  }
  getAllTrainingTermsForTrainer(trainerId : number): Observable<any[]>{
    const url = `http://localhost:8080/trainingTerms/forTrainerAll/${trainerId}`

    return this.apiService.get(url);
  }

  getTrainingTermsForClient(clientId : number): Observable<any[]>{
    const url = `http://localhost:8080/trainingTerms/forClient/${clientId}`

    return this.apiService.get(url);
  }

  cancelTerm(id: any): Observable<any[]> {
    const url = `http://localhost:8080/trainingTerms/cancelTerm/${id}`

    return this.apiService.get(url)
    
  }

  createTrainingTerm(price: string, date: string, startDate: string, endDate: string, trainerId: string): Observable<any> {
    
    const url = "http://localhost:8080/trainingTerms/addNew"
    const formDate = new FormData()

    formDate.append('price', price)
    formDate.append('date', date)
    formDate.append('startTime', startDate)
    formDate.append('endTime', endDate)
    formDate.append('trainerId', trainerId)

    return this.apiService.postFormData(url, formDate);
  }

  deleteById(id: number): Observable<any>{
    
    const url = `http://localhost:8080/trainingTerms/delete/${id}`;

    return this.apiService.delete(url, {
      responseType: 'text' as 'json'
    });
  }

  reserveTerm(termId: number, clientUsername: string): Observable<any> {
    const url = "http://localhost:8080/trainingTerms/reserve"
    const formDate = new FormData()
    console.log(termId +"asd" + clientUsername)

    formDate.append('termId', termId.toString())
    formDate.append('clientUsername', clientUsername)

    
    return this.apiService.postFormData(url, formDate);
  }

}


