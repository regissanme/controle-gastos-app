import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { StorageService } from '../../core/auth/storage.service';

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

  form: any = {
    name: null,
    birthdate: null,
    username: null,
    password: null
  };
  confirmPassword = '';

  errorMessage = '';
  isRegisterFailed = false;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) { }


  onSubmit(): void {
    const { name, birthdate, username, password } = this.form;

    if (name && username && password) {

      this.authService.login(username, password).subscribe({
        next: data => {
          console.log('Received data: ' + JSON.stringify(data));
          this.storageService.setUser(data);
          this.isRegisterFailed = false;
        },
        error: err => {
          console.log(JSON.stringify(err));
          this.errorMessage = err.message + ": " + err.message;
          this.isRegisterFailed = true;
          throw new Error(err.message);
        }
      });
    }
  }

  passwordCheck(): boolean {
    return this.confirmPassword === this.form.password;
  }

}
