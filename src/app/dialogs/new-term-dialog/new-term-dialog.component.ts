import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrainigTermService } from '../../services/trainig-term.service';
import { CalendarModule } from 'primeng/calendar';
import { StyleClassModule } from 'primeng/styleclass';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-term-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, CalendarModule, StyleClassModule],
  templateUrl: './new-term-dialog.component.html',
  styleUrl: './new-term-dialog.component.scss',
})
export class NewTermDialogComponent {
  
  @Output() isCreated = new EventEmitter<string>();

  constructor(private trainingTermsService: TrainigTermService, private dialogRef: MatDialogRef<NewTermDialogComponent>){}

  date: Date | undefined;
  numberOfInputs : number = 1

  tarinerId: string = window.localStorage.getItem('id') ?? ''

  onSubmit(form: any):void {
    console.log(form.value)
    if(form.valid) {
      const {price, date, startTime, endTime} = form.value
      this.trainingTermsService.createTrainingTerm(price,date,startTime,endTime,this.tarinerId)
        .subscribe({
          next: (response) => {
            console.log('Training Term Created', response);
            this.isCreated.emit("true")
            this.dialogRef.close()
          },
          error: (err) => {
            console.error("Error creating meal plan" , err)
          }
        })
    }else{
      alert("Fill the fealds")
    }
  }
}
