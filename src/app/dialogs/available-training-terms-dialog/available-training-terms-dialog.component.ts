import { Component, inject, Inject } from '@angular/core';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Trainer, TrainingTerm } from '../../../types';
import { TrainigTermService } from '../../services/trainig-term.service';
import { CommonModule } from '@angular/common';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-available-training-terms-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './available-training-terms-dialog.component.html',
  styleUrl: './available-training-terms-dialog.component.scss',
})
export class AvailableTrainingTermsDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Trainer,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    private trainingTermService: TrainigTermService
  ) {}

  readonly dialog = inject(MatDialog);

  trainingTerms: TrainingTerm[] = [];
  role: string = window.localStorage.getItem("role") ?? ''

  ngOnInit() {
    this.getTrainingTermsForTrainer();
    console.log(this.role)
  }

  getTrainingTermsForTrainer() {
    this.trainingTermService.getTrainingTermsForTrainer(this.data.id).subscribe(
      (response: TrainingTerm[]) => {
        this.trainingTerms = response;
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  reserveTerm(termId: number) {
    let clientId: string = window.localStorage.getItem('username') ?? '';

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      data: 'reserve-term',
    });

    dialogRef.componentInstance.isActionConfirmed.subscribe(
      (isConfirmed: string) => {
        if (isConfirmed == 'true') {
          this.trainingTermService.reserveTerm(termId, clientId).subscribe(
            (response) => {
              if (response.message == 'No enough credits') {
                window.alert('You do not have enough credits for this term');
                return;
              }
              this.getTrainingTermsForTrainer();
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          // Handle cancellation or error logic here
          console.log('Action was cancelled or failed');
        }
      }
    );
  }
}
