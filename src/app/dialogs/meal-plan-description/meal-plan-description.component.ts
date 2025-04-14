import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meal-plan-description',
  standalone: true,
  imports: [],
  templateUrl: './meal-plan-description.component.html',
  styleUrl: './meal-plan-description.component.scss',
})
export class MealPlanDescriptionComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(){
    console.log(this.data.description)
  }
  
}
