import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SuplementsComponent } from './layout/suplements/suplements.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'suplements',
        component : SuplementsComponent
    }
];
