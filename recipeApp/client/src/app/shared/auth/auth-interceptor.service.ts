import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req:any, next:any) {
        const authService = this.injector.get(AuthService);
        const authRequest = req.clone({
            // tslint:disable-next-line:max-line-length
            headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
            .set('Refresh', 'Bearer ' + authService.refreshToken)
        });

        return next.handle(authRequest).pipe( tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
           return;
          }
          authService.refresh();
        }
      }));
    }
}