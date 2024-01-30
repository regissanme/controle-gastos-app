import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = localStorage.getItem('token') ?? '';
  if (token && token != '') {
    if (!authService.isTokenExpired()) {
      req = req.clone({
        setHeaders: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
    }
  }

  return next(req);
};
