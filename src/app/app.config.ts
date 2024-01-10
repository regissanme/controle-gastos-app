import { ApplicationConfig, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { GlobalErrorHandlerService } from './shared/global-error-handler.service';
import { errorInterceptorInterceptor } from './core/interceptor/error-interceptor.interceptor';

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
