import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LoginServiceService } from '../../services/login-service.service';
import { CommonModule } from '@angular/common';
import { Client } from '../../../types';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginDialogComponent {
  constructor(private loginService: LoginServiceService) {}

  problemWithLogin: boolean = false;
  register: string = 'no';
  selectedRole: string = 'client';

  showRegister() {
    this.register = 'yes';
  }
  hideRegister() {
    this.register = 'no';
  }

  performLogin() {
    let username = document.getElementById('username') as HTMLInputElement;
    let password = document.getElementById('password') as HTMLInputElement;

    this.loginService.login(username.value, password.value).subscribe(
      (response) => {
        window.localStorage.setItem('token', response.token);
        window.localStorage.setItem('role', response.role);
        window.localStorage.setItem('id', response.id);
        window.localStorage.setItem('username', response.username);
        window.localStorage.setItem('loged_in', 'true');
        window.location.reload();
      },
      (error) => {
        this.problemWithLogin = true;
        console.log('error error');
        console.error(error);
      }
    );
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.performLogin();
    }
  }

  performRegister() {
    let username = (
      document.getElementById('username-register') as HTMLInputElement
    ).value;
    let password = (
      document.getElementById('password-register') as HTMLInputElement
    ).value;
    let name = (document.getElementById('name') as HTMLInputElement).value;
    let surname = (document.getElementById('surname') as HTMLInputElement)
      .value;

    let client: Client = { username, password, name, surname };
    if (this.isValidPassword(password)) {
      if (this.selectedRole == 'client') {
        this.loginService.registerClient(client).subscribe(
          (response) => {
            console.log('Success response:', response);
            this.loginService.login(username, password).subscribe(
              (response) => {
                this.loginService.login(username, password).subscribe(
                  (response) => {
                    window.localStorage.setItem('token', response.token);
                    window.localStorage.setItem('role', response.role);
                    window.localStorage.setItem('id', response.id);
                    window.localStorage.setItem('username', response.username);
                    window.localStorage.setItem('loged_in', 'true');
                    window.location.reload();
                  },
                  (error) => {
                    this.problemWithLogin = true;
                    console.log('error error');
                    console.error(error);
                  }
                );
              },
              (error) => {
                console.log('error error');
                console.error(error);
              }
            );
          },
          (error) => {
            console.log('Full error object:', error);
            console.log('Error status:', error.status);
            console.log('Error response:', error.message);

            if (error.message === 'Username already exists') {
              alert(
                'The username already exists. Please choose a different username.'
              );
            } else {
              console.error('An error occurred during registration:', error);
              alert('An error occurred. Please try again.');
            }
          }
        );
      } else {
        this.loginService.registerTrainer(client).subscribe(
          (response) => {
            this.loginService.login(username, password).subscribe(
              (response) => {
                this.loginService.login(username, password).subscribe(
                  (response) => {
                    window.localStorage.setItem('token', response.token);
                    window.localStorage.setItem('role', response.role);
                    window.localStorage.setItem('id', response.id);
                    window.localStorage.setItem('username', response.username);
                    window.localStorage.setItem('loged_in', 'true');
                    window.location.reload();
                  },
                  (error) => {
                    this.problemWithLogin = true;
                    console.log('error error');
                    console.error(error);
                  }
                );
              },
              (error) => {
                console.log('error error');
                console.error(error);
              }
            );
          },
          (error) => {
            console.log('Full error object:', error);
            console.log('Error status:', error.status);
            console.log('Error response:', error.message);

            if (error.message === 'Username already exists') {
              alert(
                'The username already exists. Please choose a different username.'
              );
            } else {
              console.error('An error occurred during registration:', error);
              alert('An error occurred. Please try again.');
            }
          }
        );
      }
    }
    else{
      window.alert("Your password is weak. It must be at least 8 characters long and include at least one number and one special character.")
    }
  }
  isValidPassword(password: string): boolean {
    // Regular expression to check the password conditions
    const hasMinLength = password.length > 8;
    const hasNumber = /\d/.test(password); // Checks for at least one digit
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Checks for at least one special character

    // Returns true if all conditions are met
    return hasMinLength && hasNumber && hasSpecialCharacter;
  }
}
