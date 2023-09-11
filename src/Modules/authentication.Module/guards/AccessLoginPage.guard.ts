import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AccessLoginPageGuard  {
  constructor(private _router: Router) {}
  canActivateChild() {
    return this.Auth();
  }
  canActivate() {
    return this.Auth();
  }
  canLoad() {
    return this.Auth();
  }
  Auth() {
    let refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}
