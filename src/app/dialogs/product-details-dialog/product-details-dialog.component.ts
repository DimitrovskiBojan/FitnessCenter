import { Component, EventEmitter, inject, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { BuySupplementComponent } from '../buy-supplement/buy-supplement.component';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'app-product-details-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details-dialog.component.html',
  styleUrl: './product-details-dialog.component.scss',
})
export class ProductDetailsDialogComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>
  ) {}

  @Output() deleteEvent = new EventEmitter<void>();

  role: string = window.localStorage.getItem('role') ?? '';

  ngOnInit() {
    console.log(this.data);
  }
  deleteProduct() {

    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {data: 'delete-product'})

    
    dialogRef.componentInstance.isActionConfirmed.subscribe((isConfirmed: string) => {
      if (isConfirmed == "true") {
        // Handle successful deletion logic here
        console.log('Deleted successfully');
        this.productService.deleteProduct(this.data.id).subscribe({
          next: (response: string) => {
            console.log(response); // This will log "Product Deleted"
            this.dialogRef.close({ deleted: true });
            this.deleteEvent.emit();
          },
          error: (err) => {
            console.error('Failed to delete product', err);
          },
        });
      } else {
        // Handle cancellation or error logic here
        console.log('Action was cancelled or failed');
      }
    })

  }

  buyDialog() {
    this.dialog.open(BuySupplementComponent, {data: this.data})
    this.dialogRef.close();
  }
}
