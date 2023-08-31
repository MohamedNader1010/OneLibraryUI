import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private _jwtHelperService: JwtHelperService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const role = this.extractRoleFromToken();
    if (role) {
      if (role === 'User') {
        return this._router.parseUrl('/orders');
      }
      return true;
    }
    return this._router.parseUrl('/login');
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
