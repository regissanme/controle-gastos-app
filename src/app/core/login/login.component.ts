import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';


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
  isLoginFailed = false; // Para mostrar a mensagem de erro ao usuário
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }



  ngOnInit(): void {

  }

  onSubmit(): void {
    const { username, password } = this.form;

    if (username && password) {

      this.authService.login(username, password).subscribe({
        next: data => {
          this.isLoginFailed = false;
          this.navigateToDashboard();
        },
        error: err => {
          this.handleError(err);
          // throw new HttpErrorResponse(err);
        }
      });
    }
  }

  handleError(err: HttpErrorResponse) {

    this.isLoginFailed = true;
    const errorFields = [] = [''];

    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        this.errorMessage = "Incapaz de conectar ao Servidor";
      }
    }

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

  navigateToDashboard() {
    this.router.navigate(['/app']);
  }

}

