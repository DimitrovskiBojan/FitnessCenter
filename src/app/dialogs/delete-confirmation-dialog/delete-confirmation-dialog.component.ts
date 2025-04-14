import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrainigTermService } from '../../services/trainig-term.service';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {

  @Output() isActionConfirmed = new EventEmitter<string>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private trainingTermService: TrainigTermService,
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  ngOnInit(){
    console.log(this.data);
  }

  cancel() {
    this.dialogRef.close();
    this.isActionConfirmed.emit("false")
  }
  deleteTerm() {
    this.isActionConfirmed.emit("true")
    this.dialogRef.close();
  }
}
