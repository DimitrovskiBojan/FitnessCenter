import { Component, inject, Inject } from '@angular/core';
import { TrainerServiceService } from '../../services/trainer-service.service';
import { Trainer } from '../../../types';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AvailableTrainingTermsDialogComponent } from '../../dialogs/available-training-terms-dialog/available-training-terms-dialog.component';

@Component({
  selector: 'app-trainers-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trainers-page.component.html',
  styleUrls: ['./trainers-page.component.scss'], // Note: it should be styleUrls, not styleUrl
})
export class TrainersPageComponent {
  trainers: Trainer[] = [];

  constructor(private trainerService: TrainerServiceService) {}

  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.getAllTrainers();
  }

  getAllTrainers() {
    this.trainerService.getAllTrainers().subscribe(
      (response: Trainer[]) => {
        this.trainers = response; // Set the trainers array with the response
      },
      (error) => {
        console.error(error);
      }
    );
  }

  viewAvailableTerms(trainer : Trainer) {
    this.dialog.open(AvailableTrainingTermsDialogComponent, {data: trainer})
  }
}
