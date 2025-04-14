import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { SuplementsComponent } from '../layout/suplements/suplements.component';
import { SpinnerComponent } from '../dialogs/spinner/spinner.component';
import { HomePageComponent } from '../layout/home-page/home-page.component';
import { MealPlansComponent } from '../layout/meal-plans/meal-plans.component';
import { ProfileComponent } from '../layout/profile/profile.component';
import { TrainersPageComponent } from "../layout/trainers-page/trainers-page.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    SuplementsComponent,
    SpinnerComponent,
    HomePageComponent,
    MealPlansComponent,
    ProfileComponent,
    TrainersPageComponent
],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  isLoading = false; // Initialize spinner visibility
  page = '';

  constructor() {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  ngOnInit(): void {
    this.onTogglePage("home")
  }

  onTogglePage(page: string) {
    this.page = page;
    console.log(this.page);
  }

  onToggleSpinner(showSpinner: boolean) {
    this.isLoading = showSpinner;
    setTimeout(() => {
      this.isLoading = false;
    }, 600);
  }
}
