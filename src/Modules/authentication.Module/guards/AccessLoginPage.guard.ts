import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
	providedIn: 'root',
})
export class AccessLoginPageGuard implements CanActivate, CanLoad, CanActivateChild {
	constructor(private _router: Router, private jwtHelper: JwtHelperService) {}
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
