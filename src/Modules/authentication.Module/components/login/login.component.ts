import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Auth} from '../../interfaces/IAuth';
import {AuthService} from './../../services/auth.service';
import {Response} from './../../../shared/interfaces/Iresponse';
import {AttendanceService} from './../../../attendance/services/attendance.service';
import {MatDialog} from '@angular/material/dialog';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	loginForm: FormGroup;
	hide = true;
	logging: boolean = false;
	returnUrl: string = '';
	constructor(
		private router: Router,
		private dialog: MatDialog,
		private route: ActivatedRoute,
		private _login: AuthService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _attendance: AttendanceService
	) {
		this.loginForm = this.fb.group({
			userName: ['', [Validators.required, Validators.maxLength(100)]],
			password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
		});
	}
	ngOnInit(): void {
		if (this.dialog.openDialogs.length) this.dialog.closeAll();
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
	}
	get userName(): FormControl {
		return this.loginForm.get('userName') as FormControl;
	}
	get password(): FormControl {
		return this.loginForm.get('password') as FormControl;
	}
	handleForgetPassword() {
		this.router.navigate(['auth/forgetPassword']);
	}
	handleSubmit() {
		if (this.loginForm.valid) {
			this.logging = true;
			this.subscriptions.push(
				this._login.login(this.loginForm.value).subscribe({
					next: (data) => {
						let auth: Auth = data.body;
						this._login.setLocalStorage(auth);
						this._login.username.next(auth.username);
						this._attendance.checkedIn.next(auth.isCheckedIn);
						this._login.isLogged = true;
					},
					error: (e) => {
						this.logging = false;
						this._login.isLogged = false;
						this._login.username.next(null);
						this._login.clearLocalStorage();
						let res: Response = e.error ?? e;
						this.toastr.error(res.message, 'unauthorized');
					},
					complete: () => {
						this.logging = false;
						this.toastr.success('loged in sucessfully', 'logged in');
						this.router.navigate([this.returnUrl]);
					},
				})
			);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
