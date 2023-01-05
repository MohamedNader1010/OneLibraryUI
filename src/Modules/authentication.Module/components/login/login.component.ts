import {Component, OnDestroy} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "./../../services/auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnDestroy {
	subscriptions: Subscription[] = [];
	loginForm: FormGroup;
	hide = true;
	constructor(private router: Router, private _login: AuthService, private fb: FormBuilder) {
		this.loginForm = this.fb.group({
			email: ["", [Validators.required, Validators.maxLength(100), Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
		});
	}
	get email(): FormControl {
		return this.loginForm.get("email") as FormControl;
	}
	get password(): FormControl {
		return this.loginForm.get("password") as FormControl;
	}
	handleRegister() {
		this.router.navigate(["auth/register"]);
	}
	handleSubmit() {
		if (this.loginForm.valid) {
			localStorage.setItem("Securitytoken", "testtesttest");
			localStorage.setItem("expiresOn", new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString());
			localStorage.setItem("userName", "test");
			this.router.navigate([""]);
			// this.subscriptions.push(
			// 	this._login.login(this.loginForm.value).subscribe({
			// 		next: (data: any) => {
			// 			this.toastr.success("loged in successfully", "logged in");
			// 			this.router.navigate([""]);
			// 			localStorage.setItem("token", data.token);
			// 			localStorage.setItem("expires", data.expiresOn);
			// 			localStorage.setItem("uname", data.name);
			// 		},
			// 		error: (e) => {
			// 			this._login.isLogged = false;
			// 			this.toastr.error(e.error.message, "unauthorized");
			// 		},
			// 	})
			// );
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
