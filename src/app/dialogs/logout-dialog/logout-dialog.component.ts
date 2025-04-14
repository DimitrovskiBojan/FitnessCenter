import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MealPlanBuyConfirmationComponent } from '../meal-plan-buy-confirmation/meal-plan-buy-confirmation.component';


@Component({
  selector: 'app-logout-dialog',
  standalone: true,
  imports: [],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.scss'
})
export class LogoutDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<MealPlanBuyConfirmationComponent>
  ) {}

  performLogout(){
    window.localStorage.clear()
    window.location.reload()
  }
  
  cancel(){
    this.dialogRef.close();
  }
}
