import {Component} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../../customeValidators/confirmPassword";
import {AuthService} from "../../services/auth.service";

@Component({
	selector: "app-register",
	templateUrl: "./register.component.html",
	styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
	registerForm: FormGroup;
	hide = true;
	constructor(private router: Router, private _login: AuthService, private fb: FormBuilder) {
		this.registerForm = this.fb.group(
			{
				name: ["", [Validators.required, Validators.maxLength(100)]],
				phone: ["", [Validators.required, Validators.pattern("01[0125][0-9]{8}")]],
				password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
				confirmPassword: ["", [Validators.required, Validators.maxLength(100)]],
			},
			{validators: CustomValidators.MatchValidator("password", "confirmPassword")}
		);
	}
	get name(): FormControl {
		return this.registerForm.get("name") as FormControl;
	}
	get phone(): FormControl {
		return this.registerForm.get("phone") as FormControl;
	}
	get confirmPassword(): FormControl {
		return this.registerForm.get("confirmPassword") as FormControl;
	}
	get password(): FormControl {
		return this.registerForm.get("password") as FormControl;
	}
	handleLogin() {
		this.router.navigate(["auth/login"]);
	}
	handleSubmit() {
		if (this.registerForm.valid) {
			this.router.navigate(["auth/login"]);
			// this._login.login(this.registerForm.value).subscribe({
			// 	next: (data: any) => {
			// 		// this.toastr.success("loged in successfully", "logged in");
			// 		this.router.navigate(["dashboard"]);
			// 		localStorage.setItem("token", data.token);
			// 		localStorage.setItem("expires", data.expiresOn);
			// 		localStorage.setItem("uname", data.name);
			// 	},
			// 	error: (e) => {
			// 		this._login.isLogged = false;
			// 		// this.toastr.error(e.error.message, "unauthorized");
			// 	},
			// });
		}
	}
}
