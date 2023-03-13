import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, tap, catchError, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.authService.token,
          'Refresh': 'Bearer ' + this.authService.refreshToken
        });

        req = req.clone({headers});

        return next.handle(req).pipe(
          catchError((error) => {
            if (
              error instanceof HttpErrorResponse &&
              req.url.includes('server/account') &&
              error.status === 401
            ) {
              console.log("error caught");
              return this.handle401Error(req, next);
            }
    
            return throwError(() => error);
          })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
  
        if (this.authService.isAuthenticated && this.authService.refreshToken) {
          return this.authService.refresh().pipe(
            switchMap(() => {
              this.isRefreshing = false;
  
              return next.handle(request);
            }),
            catchError((error) => {
              this.isRefreshing = false;
  
              if (error instanceof HttpErrorResponse && error.status === 401) {
                this.authService.logout();
              }
  
              return throwError(() => error);
            })
          );
        }
      }
  
      return next.handle(request);
    }
}