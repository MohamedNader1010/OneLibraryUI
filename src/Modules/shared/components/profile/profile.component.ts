import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {CustomValidators} from 'src/Modules/authentication.Module/customeValidators/CustomValidators';
import {User} from 'src/Modules/authentication.Module/interfaces/IUser';
import {Response} from '../../interfaces/Iresponse';
import {AuthService} from './../../../authentication.Module/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	passwordForm: FormGroup;
	hide = true;
	hideNew = true;
	hideConfirm = true;
	submitting: boolean = false;
	submittingPassword: boolean = false;
	IsEdit: boolean = false;
	updatePassword: boolean = false;
	userData!: User;
	constructor(private router: Router, private _auth: AuthService, private fb: FormBuilder, private toastr: ToastrService) {
		this.form = this.fb.group({
			id: [null],
			firstName: ['', [Validators.required, Validators.maxLength(100)]],
			lastName: ['', [Validators.required, Validators.maxLength(100)]],
			position: [''],
			title: ['', [Validators.required]],
			userName: ['', [Validators.required, Validators.maxLength(100)]],
			email: ['', [Validators.required, Validators.email]],
			phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
		});
		this.passwordForm = this.fb.group(
			{
				id: [null],
				oldPassword: ['', [Validators.required]],
				newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
				confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
			},
			{validators: CustomValidators.MatchValidator('newPassword', 'confirmPassword')}
		);
	}
	ngOnInit() {
		this.profileId.setValue(localStorage.getItem('uid'));
		this.PasswordId.setValue(localStorage.getItem('uid'));
		if (this.profileId.value) {
			this.form;
			this._auth.getUserById(this.profileId.value).subscribe({
				next: (res) => {
					this.userData = res.body;
					this.form.patchValue(this.userData);
				},
			});
		}
	}
	get profileId(): FormControl {
		return this.form.get('id') as FormControl;
	}
	get firstName(): FormControl {
		return this.form.get('firstName') as FormControl;
	}
	get lastName(): FormControl {
		return this.form.get('lastName') as FormControl;
	}
	get position(): FormControl {
		return this.form.get('position') as FormControl;
	}
	get title(): FormControl {
		return this.form.get('title') as FormControl;
	}
	get userName(): FormControl {
		return this.form.get('userName') as FormControl;
	}
	get email(): FormControl {
		return this.form.get('email') as FormControl;
	}
	get phone(): FormControl {
		return this.form.get('phoneNumber') as FormControl;
	}
	get PasswordId(): FormControl {
		return this.passwordForm.get('id') as FormControl;
	}
	get oldPassword(): FormControl {
		return this.passwordForm.get('oldPassword') as FormControl;
	}
	get newPassword(): FormControl {
		return this.passwordForm.get('newPassword') as FormControl;
	}
	get confirmPassword(): FormControl {
		return this.passwordForm.get('confirmPassword') as FormControl;
	}
	handleCancel() {
		this.IsEdit = false;
	}
	handleCancelPasswordEdit() {
		this.updatePassword = false;
	}
	handleEdit() {
		this.IsEdit = true;
	}
	handleEditPassword() {
		this.updatePassword = true;
	}
	handleSubmit() {
		if (this.form.valid) {
			this.submitting = true;
			this.subscriptions.push(
				this._auth.UpdateUser(this.profileId.value, this.form.value).subscribe({
					next: (data: Response) => {
						this.toastr.success(data.message);
						localStorage.setItem('uname', data.body.userName);
						this._auth.username.next(data.body.userName);
					},
					error: (e) => {
						let res: Response = e.error ?? e;
						this.toastr.error(res.message);
						this.submitting = false;
					},
					complete: () => {
						this.submitting = false;
						this.IsEdit = false;
					},
				})
			);
		}
	}
	handleSubmitNewPassword() {
		if (this.passwordForm.valid) {
			this.submittingPassword = true;
			this.subscriptions.push(
				this._auth.changePassword(this.PasswordId.value, this.passwordForm.value).subscribe({
					next: (data: Response) => {
						this.toastr.success(data.message);
					},
					error: (e) => {
						let res: Response = e.error ?? e;
						this.toastr.error(res.message);
						this.submittingPassword = false;
					},
					complete: () => {
						this.submittingPassword = false;
						this.updatePassword = false;
					},
				})
			);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
