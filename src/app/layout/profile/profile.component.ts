import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TrainerServiceService } from '../../services/trainer-service.service';
import { MealPlanService } from '../../services/meal-plan.service';
import {
  Client,
  ClientFull,
  MealPlan,
  Order,
  Role,
  Trainer,
  TrainingTerm,
} from '../../../types';
import { NewMealPlanDialogComponent } from '../../dialogs/new-meal-plan-dialog/new-meal-plan-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ClientServiceService } from '../../services/client-service.service';
import { MealPlanDescriptionComponent } from '../../dialogs/meal-plan-description/meal-plan-description.component';
import { TrainigTermService } from '../../services/trainig-term.service';
import { NewTermDialogComponent } from '../../dialogs/new-term-dialog/new-term-dialog.component';
import { DeleteConfirmationDialogComponent } from '../../dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Output() togglePageEvent = new EventEmitter<string>(); // Emit a string
  @Output() toggleSpinnerEvent = new EventEmitter<boolean>(); // Emit a boolean

  constructor(
    private trainerService: TrainerServiceService,
    private mealPlanService: MealPlanService,
    private clientService: ClientServiceService,
    private trainingTermService: TrainigTermService,
    private productService: ProductService
  ) {}
  readonly dialog = inject(MatDialog);

  mealPlans: MealPlan[] = [];
  trainingTerms: TrainingTerm[] = [];

  userId: any = window.localStorage.getItem('id');
  role: string = '';

  trainer: Trainer = {  
    id: 1,
    username: '',
    password: '',
    rating: 0,
    name: '',
    surname: '',
    role: Role.TRAINER,
    image: '',
    credits: 0,
  };

  client: ClientFull = {
    id: 0,
    username: '',
    name: '',
    surname: '',
    password: '',
    role: Role.CLIENT, // Adjust this according to your Role enum
    credits: 0,
  };

  orders: Order[] = [];

  ngOnInit() {
    this.role = window.localStorage.getItem('role') || ''; // Initialize it
    if (this.role == 'TRAINER') {
      this.getTrainerInfo();
    } else if (this.role == 'CLIENT') {
      this.getClientInfo();
      this.getMealPlansClient();
    } else {
      this.getOrders();
    }
  }

  getTrainerInfo() {
    let trainerId: string = window.localStorage.getItem('id') as string;
    this.trainerService.getTrainer(trainerId).subscribe(
      (response) => {
        console.log(response);
        this.trainer = response;
        this.getTrainingTermsForTrainer();
        this.getMealPlansTrainer();
      },
      (error) => {
        console.error('Error fetching trainer:', error); // Handle errors here
      }
    );
  }

  getClientInfo() {
    let clientId: string = window.localStorage.getItem('id') as string;
    this.clientService.getClient(clientId).subscribe(
      (response) => {
        this.client = response;
        this.getTrainingTermsForClient();
      },
      (error) => {
        console.error('Error fetching client:', error);
      }
    );
  }

  getOrders() {
    this.productService.getOrders().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onLeave(id: number) {
    const element = document.getElementById(id.toString());
    const elementToShow = document.getElementById(id.toString() + 'name');
    if (element && elementToShow) {
      setTimeout(() => {
        element.style.display = 'block'; // or any other style you want to change
        elementToShow.style.display = 'none';
      }, 1500);
    }
  }
  onHover(id: number) {
    const element = document.getElementById(id.toString());
    const elementToShow = document.getElementById(id.toString() + 'name');
    if (element && elementToShow) {
      element.style.display = 'none'; // or any other style you want to change
      elementToShow.style.display = 'block';
    }
  }

  maxLengthOfDescription(description: string): string {
    if (description.length > 33) {
      return description.substring(0, 29) + '...';
    }
    return description;
  }

  getMealPlansTrainer() {
    this.mealPlanService.getMealPlansForTrainer(this.trainer.id).subscribe(
      (response: MealPlan[]) => {
        this.mealPlans = response
        console.log('Meal plans');
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  getMealPlansClient() {
    console.log('Client id: ' + this.client.id);
    this.mealPlanService.getMealPlans().subscribe(
      (response: MealPlan[]) => {
        this.mealPlans = response.filter((mealplan) =>
          mealplan.purchasedBy.some(
            (client: ClientFull) => client.id === this.client.id
          )
        );
        console.log('Meal plans:', this.mealPlans);
        console.log('All Meal Plans:', response);
      },
      (error) => {
        console.log('Error fetching meal plans:', error);
      }
    );
  }
  formatDate(dateArray: any[]) {
    const [year, month, day, hour, minute] = dateArray;

    // Pad month and day with leading zeros if necessary
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const formattedHour = String(hour).padStart(2, '0');
    const formattedMinute = String(minute).padStart(2, '0');

    return `${formattedDay}.${formattedMonth}.${year} ${formattedHour}:${formattedMinute}`;
  }

  getTrainingTermsForTrainer() {
    this.trainingTermService
      .getAllTrainingTermsForTrainer(this.trainer.id)
      .subscribe(
        (response: TrainingTerm[]) => {
          this.trainingTerms = response;
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
  }

  cancelTerm(termId: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: 'cancel-term',
    });

    dialogRef.componentInstance.isActionConfirmed.subscribe(
      (isConfirmed: string) => {
        if (isConfirmed == 'true') {
          // Handle successful deletion logic here
          this.trainingTermService.cancelTerm(termId).subscribe(
            (response) => {
              this.getTrainingTermsForClient();
            },
            (error) => {
              console.error(error);
            }
          );
          console.log('Deleted successfully term' + termId);
        } else {
          // Handle cancellation or error logic here
          console.log('Action was cancelled or failed');
        }
      }
    );
  }

  getTrainingTermsForClient() {
    this.trainingTermService
      .getTrainingTermsForClient(this.client.id)
      .subscribe(
        (response: TrainingTerm[]) => {
          this.trainingTerms = response;
          console.log(response + 'asdasdasd');
        },
        (error) => {
          console.error(error);
        }
      );
  }

  goToTrainersPage() {
    this.togglePageEvent.emit('trainers');
  }

  download(fileName: string) {
    const url = `http://localhost:8080/mealPlans/download/${fileName}`;
    window.location.href = url;
  }

  descriptionDialog(mealPlan: MealPlan) {
    const dialogRef = this.dialog.open(MealPlanDescriptionComponent, {
      data: mealPlan,
    });
  }

  sortMealPlanPurchasedBy(username: string): MealPlan[] | null {
    // Check if mealPlans are already set
    if (!this.mealPlans || this.mealPlans.length === 0) {
      console.log('No meal plans available.');
      return null;
    }

    // Filter to find meal plans purchased by the specified username
    const purchasedPlans = this.mealPlans.filter((mealplan) =>
      mealplan.purchasedBy.some(
        (purchaser: Client) => purchaser.username === username
      )
    );

    console.log('Meal plans purchased by', username, ':', purchasedPlans);
    return purchasedPlans;
  }
  openDialog() {
    const dialogRef = this.dialog.open(NewMealPlanDialogComponent);

    dialogRef.componentInstance.isCreated.subscribe(
      (isCreated: string) => {
        console.log(isCreated)
        if(isCreated == "true"){

          this.getMealPlansTrainer()
        }
      }
    )
  }
  openDialogNewPlan() {
    const dialogRef = this.dialog.open(NewTermDialogComponent);

    dialogRef.componentInstance.isCreated.subscribe(
      (isCreated: string) => {
        if(isCreated == "true"){
          this.getTrainingTermsForTrainer()
        }
      }
    )
  }

  deleteTermDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: {id:id, for:"delete-term"},
    });

    // Subscribe to the afterClosed observable to handle the emitted event
    dialogRef.componentInstance.isActionConfirmed.subscribe(
      (isConfirmed: string) => {
        if (isConfirmed == 'true') {
          // Handle successful deletion logic here
          console.log('Deleted successfully');
          this.trainingTermService.deleteById(id).subscribe(
            (response) => {
              console.log(response);
              this.getTrainingTermsForTrainer();
            },
            (error) => {
              console.log(error);
            }
          );
        } else {
          // Handle cancellation or error logic here
          console.log('Action was cancelled or failed');
        }
      }
    );
  }

  onFileSelected(event: any) {
    const id = this.userId; // Assuming userId is defined elsewhere in your component

    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);
      formData.append('id', id.toString()); // Add the id to the formData

      this.trainerService.saveImage(formData).subscribe(
        (response) => {
          console.log('Image saved ', response);
          // Provide feedback to the user, reset form, etc.
          // Optionally reload or update the UI as needed
        },
        (error) => {
          console.error('Error saving image', error);
          // Provide error feedback to the user
        }
      );
    }
  }
}
