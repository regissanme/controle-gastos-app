import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService);
  loaderService.isLoading$.next(true);

  return next(req).pipe(
    tap(v => console.log("Initiated loading..............")),
    finalize(() => { loaderService.isLoading$.next(false), console.log("Finalize loading.............") })
  );
};
