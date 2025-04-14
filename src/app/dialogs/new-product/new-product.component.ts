import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.scss',
})
@Injectable({
  providedIn: 'root'
})
export class NewProductComponent {

  @Output() isCreated = new EventEmitter<string>();

  constructor(private productService: ProductService, private dialogRef: MatDialogRef<NewProductComponent>) {}

  readonly dialog = inject(MatDialog);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  show() {
    this.loadingSubject.next(true);
  }

  hide() {
    this.loadingSubject.next(false);
  }

  createProduct(event: Event) {
    this.show()
    event.preventDefault(); // Prevent the default form submit action

    const name: string = (document.getElementById('name') as HTMLInputElement)
      .value;
    const price: number = parseInt(
      (document.getElementById('price') as HTMLInputElement).value
    );
    const weight: string = (
      document.getElementById('weight') as HTMLInputElement
    ).value;
    const taste: string = (document.getElementById('taste') as HTMLInputElement)
      .value;
    const type: string = (document.getElementById('type') as HTMLInputElement)
      .value;
    const manufacturer: string = (
      document.getElementById('manufacturer') as HTMLInputElement
    ).value;

    //Get the file name selected by the user
    var imageName: string = '';
    const imageInput = document.getElementById('image') as HTMLInputElement;
    if (imageInput.files && imageInput.files[0]) {
      imageName = imageInput.files[0].name;
    } else {
      console.error('No file selected');
      return;
    }

    this.productService
      .createProduct(name, price, weight, taste, type, manufacturer, imageName)
      .subscribe(
        (response) => {
          console.log('Product created:', response);
          this.dialogRef.close()
          this.isCreated.emit("true")
          // Optionally reset the form or handle success state
        },
        (error) => {
          console.error('Error creating product:', error);
          // Handle error state or display a message to the user
        }
      );
      this.hide()
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData: FormData = new FormData();
      formData.append('image', file, file.name);
  
      this.productService.saveImage(formData).subscribe( // Pass formData instead of file
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
