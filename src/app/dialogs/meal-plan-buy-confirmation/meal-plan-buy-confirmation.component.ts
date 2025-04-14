import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MealPlanService } from '../../services/meal-plan.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import 'animate.css';

@Component({
  selector: 'app-meal-plan-buy-confirmation',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports
  templateUrl: './meal-plan-buy-confirmation.component.html',
  styleUrls: ['./meal-plan-buy-confirmation.component.scss'],
})
export class MealPlanBuyConfirmationComponent {
  successful: boolean = false;  // Track purchase success

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mealPlanService: MealPlanService,
    private dialogRef: MatDialogRef<MealPlanBuyConfirmationComponent>
  ) {}

  buyMealPlan() {
    this.mealPlanService.buyPlan(window.localStorage.getItem("username") ?? "", this.data.id).subscribe({
      next: (response) => {
        if(response.message == "No enough credits"){
          window.alert(response.message)
        }else{
          console.log("Success", response);
          this.successful = true;  // Update successful status
        }
      },
      error: (error) => {
        console.error("Error", error);
        console.log(error.error.message); 
      }
    });
  }

  cancel() {
    this.dialogRef.close();  // Close dialog without action
  }
}
