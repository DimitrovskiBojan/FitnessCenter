import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

export interface Products {
  items: Product[];
}

export interface Product {
  id: number;
  name: string;
  price: number;
  weight: string;
  taste: string;
  type: string;
  manufacturer: string;
  image: ArrayBuffer | string | null; // Assuming `image` can be null or a string representation
}
export interface Trainer {
  id: number; // Corresponds to Long in Java
  username: string;
  password: string;
  rating: number; // Corresponds to Long in Java
  name: string;
  surname: string;
  role: Role; // Assuming Role is an enum that you've defined in TypeScript
  image: string;
  credits: number;
}

export interface MealPlan {
  created_by: Trainer;
  description: string;
  id: string;
  price: number;
  purchasedBy: [];
  type: string;
  data: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  TRAINER = 'TRAINER',
  // Add other roles as necessary
}

export interface Client {
  username: string;
  name: string;
  surname: string;
  password: string;
}

export interface ClientFull {
  id: number;
  username: string;
  name: string;
  surname: string;
  password: string;
  role: Role;
  credits: number;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface TrainingTerm {
  id: number;
  startTime: any[]; // or Date if you're using a date object
  endTime: any[]; // or Date if you're using a date object
  price: string;
  date: string;
  trainer: Trainer;
  isReserved: boolean;
  reservedBy: Client;
}

export interface Order{
  id: number;
  address: string;
  number: string;
  product: Product;
}
