import {formatCurrency} from '@angular/common';
import {Component, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CustomValidators} from '../../customeValidators/confirmPassword';
import {Register} from '../../interfaces/IRegister';
import {AuthService} from '../../services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
	subscriptions: Subscription[] = [];
	registerForm: FormGroup;
	hide = true;
	constructor(private router: Router, private _auth: AuthService, private fb: FormBuilder) {
		this.registerForm = this.fb.group(
			{
				username: ['', [Validators.required, Validators.maxLength(100)]],
				// phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
				password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
				confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
			},
			{validators: CustomValidators.MatchValidator('password', 'confirmPassword')}
		);
	}
	get username(): FormControl {
		return this.registerForm.get('username') as FormControl;
	}
	// get phone(): FormControl {
	// 	return this.registerForm.get('phoneNumber') as FormControl;
	// }
	get confirmPassword(): FormControl {
		return this.registerForm.get('confirmPassword') as FormControl;
	}
	get password(): FormControl {
		return this.registerForm.get('password') as FormControl;
	}
	handleLogin() {
		this.router.navigate(['auth/login']);
	}
	handleSubmit() {
		if (this.registerForm.valid) {
			let register: Register = {
				username: this.registerForm.value['username'],
				password: this.registerForm.value['password'],
			};
			this.subscriptions.push(
				this._auth.register(register).subscribe({
					next: (data: any) => {
						// this.toastr.success("loged in successfully", "logged in");
						localStorage.setItem('token', data.token);
						localStorage.setItem('refreshToken', data.refreshToken);
						localStorage.setItem('uname', data.username);
						this.router.navigate(['']);
					},
					error: (e) => {
						console.log(e);
						// this.toastr.error(e.error.message, "unauthorized");
					},
				})
			);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
