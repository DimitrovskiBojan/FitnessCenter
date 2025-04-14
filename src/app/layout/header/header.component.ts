import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { LoginDialogComponent } from '../../dialogs/login-dialog/login-dialog.component';
import { CommonModule } from '@angular/common';
import { LogoutDialogComponent } from '../../dialogs/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, LoginDialogComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() togglePageEvent = new EventEmitter<string>(); // Emit a string
  @Output() toggleSpinnerEvent = new EventEmitter<boolean>(); // Emit a boolean

  page: string = 'home';
  isLogedIn: string = window.localStorage.getItem("loged_in") ?? "";
  role: string = window.localStorage.getItem("role") ?? ""
  username: string = window.localStorage.getItem("username")?.toUpperCase() ?? "logout";


  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(LoginDialogComponent);
  }

  logoutDialog(){
    this.dialog.open(LogoutDialogComponent)
  }


  toggleHomePage() {
    this.toggleSpinnerEvent.emit(true); // Emit true to show the spinner
    this.togglePageEvent.emit('home'); // Emit "home
    this.page = 'home'
    this.changeCarouselItem('one'); // Change to the first item
  }

  toggleSupplementsPage() {
    //this.toggleSpinnerEvent.emit(true); // Emit true to show the spinner
    this.page = 'supplements'
    this.togglePageEvent.emit('supplements'); // Emit "supplements"
    this.changeCarouselItem('thre'); // Change to the second item
    setTimeout(() => {
      window.scrollTo({
        top: 650,
        behavior: 'smooth'
      });
    }, 700);
  }

  toggleTrainersPage(){
    this.page = 'trainers'
    this.togglePageEvent.emit('trainers')
    this.changeCarouselItem("for")
    setTimeout(() => {
      window.scrollTo({
        top: 860,
        behavior: 'smooth'
      });
    }, 700);
  }

  toggleMealPlansPage(){
    this.toggleSpinnerEvent.emit(true)
    this.page = 'meal-plans'
    this.togglePageEvent.emit('meal-plans')
    this.changeCarouselItem('two');
    setTimeout(() => {
      window.scrollTo({
        top: 860,
        behavior: 'smooth'
      });
    }, 700);
  }

  goToProfile(){
    this.page = 'profile'
    this.togglePageEvent.emit('profile')
    this.changeCarouselItem('one')
    this.toggleSpinnerEvent.emit(true)
    setTimeout(() => {
      window.scrollTo({
        top: 650,
        behavior: 'smooth'
      });
    }, 700);
  }

  private changeCarouselItem(id: string) {
    const carousel = document.getElementById('carouselExample');
    if (carousel) {
      const carouselInstance = new bootstrap.Carousel(carousel);
      const itemIndex = Array.from(carousel.getElementsByClassName('carousel-item')).findIndex(item => item.id === id);
      carouselInstance.to(itemIndex);
    }
  }

  loadID(): void {
    const activeItems = document.getElementsByClassName('carousel-item active');
    if (activeItems.length > 0) {
      const activeItem = activeItems[0] as HTMLElement;
      console.log(activeItem.id);
    } else {
      console.log('No active carousel item found.');
    }
  }
}
