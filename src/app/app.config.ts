import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { GlobalErrorHandlerService } from './shared/global-error-handler.service';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    // provideHttpClient(withInterceptors([errorInterceptorInterceptor])),
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    }
  ]
  // TODO: add locale to pt-br
};
