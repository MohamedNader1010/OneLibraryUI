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
    let token = localStorage.getItem('token');
    if (token) {
      this._router.navigate(['']);
      return false;
    }
    return true;
  }
}
