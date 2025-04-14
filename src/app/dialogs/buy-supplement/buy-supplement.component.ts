import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { ClientServiceService } from '../../services/client-service.service';
import { LoginServiceService } from '../../services/login-service.service';

@Component({
  selector: 'app-buy-supplement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-supplement.component.html',
  styleUrl: './buy-supplement.component.scss',
})
export class BuySupplementComponent {
  readonly dialog = inject(MatDialog);
  successfulBuy: boolean = false;
  successfulAddress: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private loginService: LoginServiceService,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>
  ) {}

  ngOnInit() {
    console.log(this.data.price);
  }
  buySupplement() {
    this.successfulBuy = true;
  }
  cancel() {
    this.dialogRef.close();
  }
  submitAddress() {
    const address = (document.getElementById('address') as HTMLInputElement)
      .value;
    const number = (document.getElementById('phoneNumber') as HTMLInputElement).value; 
    console.log(number  + " " + address)
    if (address !== '' && number != '') {
      const clientid: string = window.localStorage.getItem('id') || '';

      this.productService.buyProduct(clientid, this.data.price, this.data.id, address, number).subscribe(
        (response) => {

          if(response.message == "Not enough credits"){
            window.alert(response.message)
          }else{
            console.log("Success", response);
            this.successfulAddress = true;  // Update successful status
          }
        },
        (error) => {
          //console.log(error);
        }
      )
    }
    else{
      window.alert("Enter address and phone number")
    }
  }
}
