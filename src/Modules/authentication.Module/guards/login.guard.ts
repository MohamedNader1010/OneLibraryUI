import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, CanLoad, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
	providedIn: "root",
})
export class LoginGuard implements CanActivate, CanLoad, CanActivateChild {
	constructor(private _router: Router, private data: AuthService) { }
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
		var expiresOn: string | null = localStorage.getItem("expiresOn") ?? "";
		if (!this.data.isLogged || expiresOn == null || new Date(expiresOn) < new Date()) {

			this._router.navigate(["/auth/login"]);
			console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEe");
			return false;
		}
		return true;
	}
}
