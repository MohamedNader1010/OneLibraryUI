import {Injectable} from "@angular/core";
import {CanActivate, CanActivateChild, CanLoad, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class AccessLoginPageGuard implements CanActivate, CanLoad, CanActivateChild {
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
		let expiresOn: string = localStorage.getItem("expiresOn") ?? "";
		let isLogged: boolean = !!localStorage.getItem("Securitytoken");
		if (isLogged && expiresOn != "" && new Date(expiresOn) > new Date()) {
			this._router.navigate([""]);
			return false;
		}
		return true;
	}
}
