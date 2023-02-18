import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, CanLoad, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthService} from '../services/auth.service';
import {lastValueFrom} from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanLoad, CanActivateChild {
	constructor(private _router: Router, private _auth: AuthService) {}
	jwtHelper = new JwtHelperService();
	async canActivateChild() {
		return this.Auth();
	}
	async canActivate() {
		return this.Auth();
	}
	async canLoad() {
		return this.Auth();
	}
	async Auth() {
		const token = localStorage.getItem('token');
		if (token && !this.jwtHelper.isTokenExpired(token)) return true;
		if (token) return true;
		const isRefreshSuccess = await this.refreshingTokens(token);
		if (!isRefreshSuccess) this._router.navigate(['/auth/login']);
		return isRefreshSuccess;
	}
	private async refreshingTokens(token: string | null): Promise<boolean> {
		const refreshToken: string | null = localStorage.getItem('refreshToken');
		if (!token || !refreshToken) return false;
		let isRefreshSuccess: boolean;
		try {
			const res = await lastValueFrom(this._auth.refreshToken());
			console.log('from login guard');
				localStorage.setItem('token', (<any>res).token);
				localStorage.setItem('refreshToken', (<any>res).refreshToken);
				localStorage.setItem('uname', (<any>res).username);
			if ((<any>res).expiresOn) localStorage.setItem('expiresOn', (<any>res).expiresOn.toString());
			isRefreshSuccess = true;
		} catch (ex) {
			isRefreshSuccess = false;
		}
		return isRefreshSuccess;
	}
}
