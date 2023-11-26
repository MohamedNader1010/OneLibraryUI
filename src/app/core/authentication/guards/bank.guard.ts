import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class BankGuard {
  constructor(private _jwtHelperService: JwtHelperService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const role = this.extractRoleFromToken();
    if (!role) return this._router.parseUrl('/login');
    if (role === 'User') {
      return this._router.parseUrl('/orders');
    }
    if (role === 'AdminWithoutBank') {
      this._router.navigate(['']);
    }
    return true;
  }

  private extractRoleFromToken() {
    let token = localStorage.getItem('token')?.toString();
    if (token) {
      const decodedToken = this._jwtHelperService.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role;
    }
    return undefined;
  }
}
