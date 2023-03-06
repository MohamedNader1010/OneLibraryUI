import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {CustomValidators} from '../../customeValidators/CustomValidators';
import {AuthService} from '../../services/auth.service';
import {Response} from './../../../shared/interfaces/Iresponse';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	hide = true;
	hideConfirm = true;
	logging: boolean = false;
	constructor(private route: ActivatedRoute, private router: Router, private _login: AuthService, private fb: FormBuilder, private toastr: ToastrService) {
		this.form = this.fb.group(
			{
				newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
				confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
				email: [null],
				token: [null],
			},
			{validators: CustomValidators.MatchValidator('newPassword', 'confirmPassword')}
		);
	}
	get confirmPassword(): FormControl {
		return this.form.get('confirmPassword') as FormControl;
	}
	get newPassword(): FormControl {
		return this.form.get('newPassword') as FormControl;
	}
	get email(): FormControl {
		return this.form.get('email') as FormControl;
	}
	get token(): FormControl {
		return this.form.get('token') as FormControl;
	}
	ngOnInit(): void {
		this.subscriptions.push(
			this.route.queryParams.subscribe((res: any) => {
				this.email.setValue(res.email);
				this.token.setValue(res.token);
			})
		);
	}
	handleLogin() {
		this.router.navigate(['auth/login']);
	}
	handleSubmit() {
		if (this.form.valid) {
			this.logging = true;
			this._login.resetPassword(this.form.value).subscribe({
				next: (data: Response) => {
					this._login.clearLocalStorage();
					this.toastr.success(data.message, 'logged in sucessfully');
				},
				error: (e) => {
					this.logging = false;
					this.toastr.error(e.error.message, 'unauthorized');
				},
				complete: () => {
					this.logging = false;
					this.router.navigate(['auth/login']);
				},
			});
		}
	}
	ngOnDestroy = () => this.subscriptions.forEach((sub) => sub.unsubscribe());
}
