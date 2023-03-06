import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Auth} from '../../interfaces/IAuth';
import {AuthService} from '../../services/auth.service';
import {Response} from './../../../shared/interfaces/Iresponse';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
	form: FormGroup;
	hide = true;
	logging: boolean = false;
	constructor(private router: Router, private _login: AuthService, private fb: FormBuilder, private toastr: ToastrService) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email, Validators.pattern(`^.+@.+\..+$`)]],
		});
	}
	get email(): FormControl {
		return this.form.get('email') as FormControl;
	}
	handleLogin() {
		this.router.navigate(['auth/login']);
	}
	handleSubmit() {
		if (this.form.valid) {
			this.logging = true;
			this._login.forgetPassword(this.email.value).subscribe({
				next: (data: Response) => {
					this.toastr.success(data.message, 'check your email');
				},
				error: (e) => {
					this.logging = false;
					this.toastr.error(e.error.message, 'unauthorized');
				},
				complete: () => {
					this.logging = false;
					this.router.navigate(['']);
				},
			});
		}
	}
}
