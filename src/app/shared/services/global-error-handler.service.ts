import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private notificationService: NotificationService
  ) { }

  handleError(err: HttpErrorResponse): void {
    let errorMessage = '';
    const errorFields = [] = [''];

    if (err instanceof HttpErrorResponse) {
      if (err.status === 0) {
        errorMessage = "Incapaz de conectar ao Servidor";
      }
    }

    if (err instanceof ErrorEvent) {
      errorMessage = "ErrorEvent recebido!";
    }

    if (err.error) {

      if (err.error?.fields) {
        err.error.fields.map((field: { errorMessage: string; }, index = 0) => errorFields[index] = field.errorMessage);
        errorMessage = `handler fields: ${errorFields}`;

      } else if (err.error?.title) {
        errorMessage = `handler title: ${err.error.title}`;
      }
    } else {
      errorMessage = `handler: ${err.message}`;
    }

    this.showError(errorMessage);
  }

  showError(message: string) {
    console.error(message);
    this.notificationService.error(message);
  }


}
