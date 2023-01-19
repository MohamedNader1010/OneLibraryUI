import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';
import {Auth} from './../interfaces/IAuth';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad, CanActivateChild {
	constructor(private _router: Router, private _auth: AuthService) {}
	jwtHelper = new JwtHelperService();
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
		const token = localStorage.getItem('token');
		if (token && !this.jwtHelper.isTokenExpired(token)) return true;
		const isRefreshSuccess = this.tryRefreshingTokens();
		if (!isRefreshSuccess) this._router.navigate(['/auth/login']);
		return isRefreshSuccess;
	}
	private tryRefreshingTokens(): boolean {
		const refreshToken = localStorage.getItem('refreshToken');
		const token = localStorage.getItem('token');
		let isRefreshSuccess: boolean = false;
		if (!token || !refreshToken) return false;
		this._auth.refreshToken(refreshToken).subscribe({
			next: (res: Auth) => {
				localStorage.setItem('token', res.token);
				localStorage.setItem('refreshToken', res.refreshToken);
				localStorage.setItem('uname', res.username);
				isRefreshSuccess = true;
			},
			error: (_) => {
				isRefreshSuccess = false;
			},
		});
		return isRefreshSuccess;
	}
}
