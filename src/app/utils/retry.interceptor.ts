import { HttpInterceptorFn } from '@angular/common/http';
import { interval, retry } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: 3,
      delay: (_, retryCount) => interval(retryCount * 1000),
    })
  );
};
