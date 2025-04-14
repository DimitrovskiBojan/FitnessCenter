import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MealPlanService } from '../../services/meal-plan.service';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-meal-plan-dialog',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './new-meal-plan-dialog.component.html',
  styleUrls: ['./new-meal-plan-dialog.component.scss']
})
export class NewMealPlanDialogComponent {

  @Output() isCreated = new EventEmitter<string>();


  file: File | null = null;

  constructor(private mealPlanService: MealPlanService, private dialogRef: MatDialogRef<NewMealPlanDialogComponent>) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0] as File;
  }

  onSubmit(form: any): void {
    if (form.valid && this.file) {
      const created_by = Number(window.localStorage.getItem("id"))
      const { price, type, description} = form.value;
      this.mealPlanService.createMealPlan(price, type, description, created_by, this.file)
        .subscribe({
          next: (response) => {
            console.log('Meal Plan Created', response);
            this.isCreated.emit("true")
            this.dialogRef.close();
          },
          error: (err) => {
            console.error('Error creating meal plan', err);
            // Handle error, e.g., display an error message
          }
        });
    } else {
      alert("Fill the fields")
    }
  }
}
