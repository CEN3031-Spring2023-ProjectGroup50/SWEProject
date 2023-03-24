import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, tap, catchError, switchMap, throwError, Subject } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    authService = this.injector.get(AuthService);  
    private isRefreshing = false;

    tokenRefreshedSource = new Subject<void>();
    tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = this.addHeader(req);

        return next.handle(req).pipe(
          catchError((error) => {
            return this.handleError(error, req, next);
          })
        ) as Observable<HttpEvent<any>>;
    }

    private handleError(error: any, request?: HttpRequest<any>, next?: HttpHandler): any {
      if (error.status === 401 && request && next) {
        if (request.url.includes("refresh")) {
          return throwError(() => error);
        }

        return this.refreshToken().pipe(
          switchMap(() => {
            //change headers to new tokens
            request = this.addHeader(request!);
            return next.handle(request);
          }),
          catchError((error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              this.authService.logout();
            }
            else {
              return this.handleError(error);
            }

            return throwError(() => error);
          })
        );
      }
      else if (error.status === 403) {
        this.authService.logout();
      }

      return throwError(() => error);
    }

    private addHeader(request: HttpRequest<any>) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + this.authService.token,
        'Refresh': 'Bearer ' + this.authService.refreshToken
      });

      if (headers) {
        return request.clone({ headers });
      }

      return request;
    }

    private refreshToken(): Observable<any> {
      if (this.isRefreshing) {
        return new Observable(observer => {
          this.tokenRefreshed$.subscribe(() => {
            observer.next();
            observer.complete();
          });
        });
      }
      else {
        this.isRefreshing = true;

        return this.authService.refresh().pipe(
          tap(() => {
            this.isRefreshing = false;
            this.tokenRefreshedSource.next();
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.authService.logout();
            return throwError(() => error);
          })
        );
      }
    }
}