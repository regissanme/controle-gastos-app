import { ApplicationConfig, ErrorHandler, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import localePtBr from '@angular/common/locales/pt';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
registerLocaleData(localePtBr);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),

    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ]

};
