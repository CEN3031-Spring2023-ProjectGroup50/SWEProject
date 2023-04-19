import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Symbol_observable from 'symbol-observable';
import { CanActivateViaAuthGuard } from './can-activate-via-auth.guard';
import { Router } from '@angular/router';

@Injectable()
export class NegateAuthGuard implements CanActivate {
    constructor(private router: Router, private authGuard: CanActivateViaAuthGuard) {
    }

    canActivate() {
        if (this.authGuard.canActivate()) {
            this.router.navigate(['/home']);
            return false;
          }
          return true;
    }
}