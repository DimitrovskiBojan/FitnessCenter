import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { Product } from '../../../types';
import { ProductService } from '../../services/product.service';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { NewProductComponent } from '../../dialogs/new-product/new-product.component';
import { ProductDetailsDialogComponent } from '../../dialogs/product-details-dialog/product-details-dialog.component';

@Component({
  selector: 'app-suplements',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    InputTextModule,
    FormsModule,
    LoginDialogComponent,
    NewProductComponent,
    ProductDetailsDialogComponent,
  ],
  templateUrl: './suplements.component.html',
  styleUrls: ['./suplements.component.scss'], // Ensure it's 'styleUrls' not 'styleUrl'
})
export class SuplementsComponent {
  readonly dialog = inject(MatDialog);

  value: string | undefined;
  products: Product[] = [];
  productsPomForSearch: Product[] = [];
  role: string = window.localStorage.getItem("role") || "CLIENT";

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const url = 'http://localhost:8080/products';
    this.productService.getProducts(url).subscribe(
      (data: Product[]) => {
        this.products = data;
        this.productsPomForSearch = data;
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterByName(searchString: string) {
    this.products = this.productsPomForSearch;
    this.products = this.products.filter((product) =>
      product.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewProductComponent);

    dialogRef.componentInstance.isCreated.subscribe(
      (isCreated: string) => {
        if(isCreated == "true"){
          this.loadProducts();
        }
      }
    )
  }

  openProductDialog(product: any) {
    const dialogRef = this.dialog.open(ProductDetailsDialogComponent, { data: product });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.deleted) {
        console.log('Product was deleted, reloading products...');
        this.loadProducts(); // Reload the products
      } else {
        console.log('Dialog closed without deletion');
      }
    });
  }
  
}
