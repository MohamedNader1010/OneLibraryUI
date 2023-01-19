import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Auth} from '../../interfaces/IAuth';
import {AuthService} from './../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {
	subscriptions: Subscription[] = [];
	loginForm: FormGroup;
	hide = true;
	constructor(private router: Router, private _login: AuthService, private fb: FormBuilder, private toastr: ToastrService) {
		this.loginForm = this.fb.group({
			userName: ['', [Validators.required, Validators.maxLength(100)]],
			password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
		});
	}
	get userName(): FormControl {
		return this.loginForm.get('userName') as FormControl;
	}
	get password(): FormControl {
		return this.loginForm.get('password') as FormControl;
	}
	handleRegister() {
		this.router.navigate(['auth/register']);
	}
	handleSubmit() {
		if (this.loginForm.valid) {
			this.subscriptions.push(
				this._login.login(this.loginForm.value).subscribe({
					next: (data: Auth) => {
						this.toastr.success('loged in successfully', 'logged in');
						localStorage.setItem('token', data.token);
						localStorage.setItem('refreshToken', data.refreshToken);
						localStorage.setItem('uname', data.username);
						this.router.navigate(['']);
					},
					error: (e) => {
						this._login.isLogged = false;
						this.toastr.error(e.error, 'unauthorized');
					},
				})
			);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
