import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { StorageService } from '../../core/auth/storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.role = this.storageService.getUser().role;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    if (username && password) {

      this.authService.login(username, password).subscribe({
        next: data => {
          console.log('Received data: ' + JSON.stringify(data));
          this.storageService.setUser(data);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.role = this.storageService.getUser().role;
          // this.reloadPage();
        },
        error: err => {
          this.handleError(err);
          this.isLoginFailed = true;
          throw new HttpErrorResponse(err);
        }
      });
    }
  }

  handleError(err: HttpErrorResponse) {
    // console.log(JSON.stringify(err));

    const errorFields = [] = [''];

    if (err.status === 403) {
      this.errorMessage = 'Email ou senha inválido(s)!';
    } else {
      if (err.error) {
        if (err.error?.fields) {
          err.error.fields.map((field: { errorMessage: string; }, index = 0) => errorFields[index] = field.errorMessage);
          this.errorMessage = `${errorFields}`;

        } else if (err.error?.title) {
          this.errorMessage = `${err.error.title}`;
        }
      } else {

        this.errorMessage = `${err.status} - ${err.message}`;
      }
    }

  }

}

