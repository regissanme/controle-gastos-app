import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next: HttpHandlerFn) => {
  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        let errorMessage = `;( :: ${err.statusText}: ${err.message}`;

        // TODO: Mostrar erro para o usuário
        console.log("Error caught in interceptor: " + errorMessage);
        return throwError(() => err)
      }
      )
    );
};
