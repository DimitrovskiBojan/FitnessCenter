import { Component, inject } from '@angular/core';
import { MealPlanService } from '../../services/meal-plan.service';
import { MealPlan } from '../../../types';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MealPlanDescriptionComponent } from '../../dialogs/meal-plan-description/meal-plan-description.component';
import { MealPlanBuyConfirmationComponent } from '../../dialogs/meal-plan-buy-confirmation/meal-plan-buy-confirmation.component';

@Component({
  selector: 'app-meal-plans',
  standalone: true,
  imports: [TableModule, CommonModule],
  templateUrl: './meal-plans.component.html',
  styleUrl: './meal-plans.component.scss'
})
export class MealPlansComponent {

  readonly dialog = inject(MatDialog);

  constructor(private mealPlanService: MealPlanService){}

  mealPlans : MealPlan [] = []

  role : string  = window.localStorage.getItem("role") ?? "CLIENT"

  ngOnInit(){
    this.getMealPlans()
  }

  getMealPlans(){
    this.mealPlanService.getMealPlans().subscribe(
      (response: MealPlan[]) => {
        this.mealPlans = response
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  buyDialog(price : number, id : string){
    this.dialog.open(MealPlanBuyConfirmationComponent, {data: {price , id}})
  }

  download(fileName: string) {
    const url = `http://localhost:8080/mealPlans/download/${fileName}`;
    window.location.href = url;
  }


  maxLengthOfDescription(description: string): string {
    if (description.length > 50) {
      return description.substring(0, 50) + '...';
    }
    return description;
  }

  descriptionDialog(mealPlan: MealPlan){
    const dialogRef = this.dialog.open(MealPlanDescriptionComponent, { data: mealPlan });
  }

}
