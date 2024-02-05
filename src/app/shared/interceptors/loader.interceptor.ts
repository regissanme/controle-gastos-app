import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../loader.service';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService);
  loaderService.isLoading.next(true);

  return next(req).pipe(
    finalize(() => { loaderService.isLoading.next(false) })
  );
};
