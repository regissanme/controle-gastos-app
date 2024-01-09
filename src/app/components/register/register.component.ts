import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../core/auth/storage.service';
import { UserService } from '../../core/auth/user.service';
import { Register } from '../shared/models/register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  form: Register = {
    name: '',
    birthdate: '',
    username: '',
    password: ''
  };
  confirmPassword = '';

  errorMessage = '';
  isRegistered = false;
  isRegisterFailed = false;

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) { }


  onSubmit(): void {
    const user: Register = this.form;

    if (user && this.passwordCheck()) {

      this.userService.register(user).subscribe({
        next: data => {
          console.log('Received data: ' + JSON.stringify(data));
          this.storageService.setUser(data);
          this.isRegistered = true;
          this.isRegisterFailed = false;
        },
        error: err => {
          this.handleError(err);
          throw new Error(err);
        }
      });
    }
  }

  passwordCheck(): boolean {
    return this.confirmPassword === this.form.password;
  }

  handleError(err: HttpErrorResponse) {
    console.log(JSON.stringify(err));

    this.isRegistered = false;
    this.isRegisterFailed = true;

    const errorFields = [] = [''];
    if (err.error.fields) {
      err.error.fields.map((field: { errorMessage: string; }, index = 0) => errorFields[index] = field.errorMessage);
      this.errorMessage = `${errorFields}`;

    } if (err.error.title) {
      this.errorMessage = `${err.error.title}`;
    } else {
      this.errorMessage = `${err.message}`;
    }


  }

}
