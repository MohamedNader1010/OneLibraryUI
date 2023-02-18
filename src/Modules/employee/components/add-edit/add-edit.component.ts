import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {ToastrService} from 'ngx-toastr';
import {EmailValidator} from 'src/Modules/authentication.Module/customeValidators/CustomValidators';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: string;
	controllerName: string = 'employees';
	isSubmitted: boolean = false;
	constructor(private router: Router, private route: ActivatedRoute, private _employee: EmployeeService, private fb: FormBuilder, private toastr: ToastrService) {
		this.Form = this.fb.group({
			firstName: ['', [Validators.required, Validators.maxLength(50)]],
			lastName: ['', [Validators.required, Validators.maxLength(50)]],
			userName: ['', [Validators.required, Validators.maxLength(50)]],
			email: [
				'',
				{
					validators: [Validators.required, Validators.email, Validators.pattern(`^.+@.+\..+$`)]
					// asyncValidators: [EmailValidator(_employee, 'email')],
					// updateOn: 'blur',
				},
			],
			phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
		});
	}
	get firstName(): FormControl {
		return this.Form.get('firstName') as FormControl;
	}
	get lastName(): FormControl {
		return this.Form.get('lastName') as FormControl;
	}
	get userName(): FormControl {
		return this.Form.get('userName') as FormControl;
	}
	get email(): FormControl {
		return this.Form.get('email') as FormControl;
	}
	get phoneNumber(): FormControl {
		return this.Form.get('phoneNumber') as FormControl;
	}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
	}
	getSingle = (id: string) =>
		this.subscriptions.push(
			this._employee.getOne(id).subscribe({
				next: (data) => {
					this.Form.patchValue(data.body);
				},
				error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
			})
		);
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._employee.update(this.id, this.Form.value).subscribe({
						next: () => {
							this.isSubmitted = true;
							this.back();
						},
						error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
					})
				);
			else
				this.subscriptions.push(
					this._employee.add(this.Form.value).subscribe({
						next: () => {
							this.isSubmitted = true;
							this.back();
						},
						error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
					})
				);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
