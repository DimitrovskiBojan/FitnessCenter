import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Order, Product } from '../../types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  getProducts(url: string): Observable<Product[]> {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  }

  createProduct(
    name: string,
    price: number,
    weight: string,
    taste: string,
    type: string,
    manufacturer: string,
    image: string
  ): Observable<any> {
    const url = 'http://localhost:8080/products/create';
    const body = { name, price, weight, taste, type, manufacturer, image };

    return this.apiService.post(url, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  saveImage(formData: FormData): Observable<any> {
    const url = 'http://localhost:8080/products/image';
    return this.apiService.postFormData(url, formData);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `http://localhost:8080/products/delete/${productId}`;
    return this.apiService.delete(url, {
      responseType: 'text' as 'json', // Expect plain text and treat it as JSON-compatible
    });
  }

  deleteOrder(orderId: number): Observable<any> {
    const url = `http://localhost:8080/orders/delete/${orderId}`;
    return this.apiService.delete(url, {
      responseType: 'text' as 'json', // Expect plain text and treat it as JSON-compatible
    });
  }

  buyProduct(
    clientid: string,
    price: any,
    productId: number,
    address: string,
    number: string
  ): Observable<any> {
    const url = 'http://localhost:8080/products/buyProduct';
    const formData = new FormData();
    formData.append('userId', clientid);
    formData.append('creditCost', price.toString());
    formData.append('productId', productId.toString());
    formData.append('address', address);
    formData.append('number', number);

    return this.apiService.postFormData(url, formData);
  }

  getOrders(): Observable<Order[]> {
    const url = 'http://localhost:8080/orders/findAll';

    return this.apiService.get(url, { responseType: 'json' });
  }
}
