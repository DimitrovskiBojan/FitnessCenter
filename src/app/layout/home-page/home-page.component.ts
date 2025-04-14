import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TrainerServiceService } from '../../services/trainer-service.service';
import { MealPlan, Order, Role, Trainer } from '../../../types';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NewMealPlanDialogComponent } from '../../dialogs/new-meal-plan-dialog/new-meal-plan-dialog.component';
import { TableModule } from 'primeng/table';
import { MealPlanService } from '../../services/meal-plan.service';
import { FormsModule } from '@angular/forms';
import { LoginServiceService } from '../../services/login-service.service';
import { SuccessDialogComponent } from '../../dialogs/success-dialog/success-dialog.component';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';
import { ProductService } from '../../services/product.service';
import { ProductDetailsDialogComponent } from '../../dialogs/product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  @Output() togglePageEvent = new EventEmitter<string>(); // Emit a string
  @Output() toggleSpinnerEvent = new EventEmitter<boolean>(); // Emit a boolean

  constructor(
    private trainerService: TrainerServiceService,
    private mealPlanService: MealPlanService,
    private loginService: LoginServiceService,
    private productService: ProductService
  ) {}

  readonly dialog = inject(MatDialog);

  mealPlans: MealPlan[] = [];

  isLogedIn: string = window.localStorage.getItem('loged_in') ?? 'false';

  credits: number = 0;
  username: string = '';
  role: string = '';
  userId: any = window.localStorage.getItem('id');
  trainer: Trainer = {
    id: 0,
    username: '',
    password: '',
    rating: 0,
    name: '',
    surname: '',
    role: Role.TRAINER,
    image: '',
    credits: 0,
  };

  orders: Order[] = [];

  ngOnInit() {
    this.role = window.localStorage.getItem('role') || ''; // Initialize it
    this.getOrders();
  }

  getOrders() {
    this.productService.getOrders().subscribe(
      (response) => {
        this.orders = response;
        console.log(this.orders);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  toggleSupplementsPage() {
    console.log(this.isLogedIn);
    if (this.isLogedIn == 'true') {
      //this.toggleSpinnerEvent.emit(true); // Emit true to show the spinner
      //this.page = 'supplements'
      this.togglePageEvent.emit('supplements'); // Emit "supplements"
      this.changeCarouselItem('thre'); // Change to the second item
      setTimeout(() => {
        window.scrollTo({
          top: 550,
          behavior: 'smooth',
        });
      }, 100);
    } else {
      this.dialog.open(LoginDialogComponent);
    }
  }
  toggleMealPlansPage() {
    if (this.isLogedIn == 'true') {
      this.togglePageEvent.emit('meal-plans'); // Emit "supplements"
      this.changeCarouselItem('two'); // Change to the second item
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
      setTimeout(() => {
        window.scrollTo({
          top: 860,
          behavior: 'smooth',
        });
      }, 600);
    } else {
      this.dialog.open(LoginDialogComponent);
    }
  }

  toggleTrainersPage() {
    if (this.isLogedIn == 'true') {
      this.toggleSpinnerEvent.emit(true);
      this.togglePageEvent.emit('trainers'); // Emit "supplements"
      this.changeCarouselItem('for'); // Change to the second item
      window.scrollTo({
        top: 0,
        behavior: 'instant',
      });
      setTimeout(() => {
        window.scrollTo({
          top: 860,
          behavior: 'smooth',
        });
      }, 600);
    } else {
      this.dialog.open(LoginDialogComponent);
    }
  }

  submitCredits() {
    this.loginService.addCredits(this.username, this.credits).subscribe({
      next: (response) => {
        console.log('Credits added successfully:', response);
        this.dialog.open(SuccessDialogComponent, {
          data: { username: this.username, credits: this.credits },
        });
        this.username = '';
        this.credits = 0;
        // Optionally, show a success message to the user or refresh data
      },
      error: (error) => {
        console.error('Error adding credits:', error);
        console.log(error.error.message);
        window.alert(error.error.message);
        // Handle the error, display an error message to the user
      },
    });
  }

  private changeCarouselItem(id: string) {
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
      const carouselInstance = new bootstrap.Carousel(carousel);
      const itemIndex = Array.from(
        carousel.getElementsByClassName('carousel-item')
      ).findIndex((item) => item.id === id);
      carouselInstance.to(itemIndex);
    }
  }

  getTrainerInfo() {
    let trainerId: string = window.localStorage.getItem('id') as string;
    this.trainerService.getTrainer(trainerId).subscribe(
      (response) => {
        this.trainer = response;
        window.localStorage.setItem('name', response.name);
        console.log(response); // This will log the trainer data
      },
      (error) => {
        console.error('Error fetching trainer:', error); // Handle errors here
      }
    );
  }
  maxLengthOfDescription(description: string): string {
    if (description.length > 33) {
      return description.substring(0, 29) + '...';
    }
    return description;
  }

  getMealPlans() {
    this.mealPlanService.getMealPlans().subscribe(
      (response: MealPlan[]) => {
        this.mealPlans = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  openDialog() {
    this.dialog.open(NewMealPlanDialogComponent);
  }

  openProductDialog(product: any) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, {
      data: product,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.deleted) {
        console.log('Product was deleted, reloading products...');
        this.getOrders(); // Reload the products
      } else {
        console.log('Dialog closed without deletion');
      }
    });
  }

  deleteOrder(id: number) {
    this.productService.deleteOrder(id).subscribe({
      next: (response: string) => {
        console.log(response);
        this.getOrders();
      },
      error: (err) => {
        console.error('Failed to delete product', err);
      },
    });
  }

  onFileSelected(event: any) {
    let id = this.userId; // Assuming userId is defined elsewhere in your component

    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);
      formData.append('id', id.toString()); // Add the id to the formData

      window.location.reload();

      this.trainerService.saveImage(formData).subscribe(
        (response) => {
          console.log('Image saved ', response);
          // Optionally reset the form or handle success state
        },
        (error) => {
          console.error('Error saving image', error);
          // Handle error state or display a message to the user
        }
      );
    }
  }
}
