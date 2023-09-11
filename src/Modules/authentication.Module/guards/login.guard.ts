import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard  {
  constructor(private _router: Router, private _authService: AuthService) {}
  jwtHelper = new JwtHelperService();
  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.Auth(state);
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.Auth(state);
  }
  async canLoad() {
    return this.Auth();
  }
  async Auth(state: RouterStateSnapshot | null = null) {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) return true;
    if (token) return true;
    const isRefreshSuccess = await this.refreshingTokens(token);
    if (!isRefreshSuccess) {
      return this._router.createUrlTree(['/auth/login', { returnUrl: state?.url }]);
      // this._router.navigate(['/auth/login']);
    }
    return isRefreshSuccess;
  }
  private async refreshingTokens(token: string | null): Promise<boolean> {
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    if (!token || !refreshToken) return false;
    let isRefreshSuccess: boolean = false;
    try {
      const res = await lastValueFrom(this._authService.refreshToken());
      if (res) this._authService.setLocalStorage(res.body);
      isRefreshSuccess = true;
    } catch (ex) {
      isRefreshSuccess = false;
      this._authService.clearLocalStorage();
      this._authService.username.next(null);
    }
    return isRefreshSuccess;
  }
}
