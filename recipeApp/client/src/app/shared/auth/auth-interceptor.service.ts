import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req:any, next:any) {
        const authService = this.injector.get(AuthService);
        const authRequest = req.clone({
            // tslint:disable-next-line:max-line-length
            headers: req.headers.set('Authorization', 'Bearer ' + authService.token)
        });

        return next.handle(authRequest);
    }
}