import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { GlobalErrorHandlerService } from './shared/global-error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    // provideHttpClient(withInterceptors([errorInterceptorInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ]
};
