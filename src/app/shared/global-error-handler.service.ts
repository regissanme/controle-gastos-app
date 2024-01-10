import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(err: HttpErrorResponse): void {
    let errorMessage = '';
    const errorFields = [] = [''];

    if (err instanceof ErrorEvent) {
      console.log("ErrorEvent recebido!");
    }

    if (err.error) {

      if (err.error?.fields) {
        err.error.fields.map((field: { errorMessage: string; }, index = 0) => errorFields[index] = field.errorMessage);
        errorMessage = `handler fields: ${errorFields}`;

      } else if (err.error?.title) {
        errorMessage = `handler title: ${err.error.title}`;
      }
    } else {
      // console.log("handler json: ", JSON.stringify(err));
      errorMessage = `handler: ${err.message}`;
    }


    // TODO: Mostrar erro ao usuário
    console.error(errorMessage);
  }

  // HttpErrorResponse = {
  //   "headers": {
  //     ...
  //   },
  //   "status": 0,
  //   "statusText": "...",
  //   "url": "http://...",
  //   "ok": false,
  //   "name": "HttpErrorResponse",
  //   "message": "Http failure response for ...: 0 Unknown Error",
  //   "error": { "isTrusted": true }
  // }

}
