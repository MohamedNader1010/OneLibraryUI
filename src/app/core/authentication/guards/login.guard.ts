import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private _router: Router, private _authService: AuthService) {}
  jwtHelper = new JwtHelperService();
  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.Auth();
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.Auth();
  }
  async canLoad() {
    return this.Auth();
  }
  async Auth() {
    const token = localStorage.getItem('token');
    if (token) return true;
    let returnUrl = this._router.routerState.snapshot.url;
    if (returnUrl) {
      this._router.navigate(['/auth/login'], {
        queryParams: { returnUrl },
      });
    } else {
      this._router.navigate(['/auth/login']);
    }
    return false;
  }
}
