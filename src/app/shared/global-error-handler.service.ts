import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error: any): void {
    let errorMessage = '';

    if (error instanceof ErrorEvent) {
      errorMessage = `Error Event: ;( :: ${error.error.message}`;
    } else {
      errorMessage = `Error: ;( :: ${error.status}: ${error.message}`;
    }
    // Todo: Mostrar erro ao usuário
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
