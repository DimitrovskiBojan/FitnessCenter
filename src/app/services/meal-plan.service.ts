import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MealPlanService {
  constructor(private apiService: ApiService) {}

  // Method to get meal plans
  getMealPlans(): Observable<any[]> {
    const url = 'http://localhost:8080/mealPlans';
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }
  getMealPlansForTrainer(trainerId: number): Observable<any[]> {
    const url = `http://localhost:8080/mealPlans/getForTrainer/${trainerId}`;
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

  // Method to create a new meal plan
  createMealPlan(
    price: number,
    type: string,
    description: string,
    createdBy: number,
    file: File
  ): Observable<any> {
    const url = 'http://localhost:8080/mealPlans/create';

    // Create FormData instance to handle file upload
    const formData = new FormData();
    formData.append('price', price.toString());
    formData.append('type', type);
    formData.append('description', description);
    formData.append('created_by', createdBy.toString());
    formData.append('data', file);

    return this.apiService.postFormData(url, formData);
  }

  buyPlan(usernameClient: string, planId: number): Observable<any> {
    const url = 'http://localhost:8080/mealPlans/buyPlan'; // Fixed double slash

    const formData = new FormData();
    formData.append('clientUsername', usernameClient);
    formData.append('planId', planId.toString());

    console.log(formData);
    return this.apiService.postFormData(url, formData);
  }
}
