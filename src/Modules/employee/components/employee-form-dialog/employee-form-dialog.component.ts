import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {EmployeeService} from '../../services/employee.service';
import {ToastrService} from 'ngx-toastr';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {Employee} from '../../interFaces/Iemployee';

@Component({
	selector: 'app-employee-form-dialog',
	templateUrl: './employee-form-dialog.component.html',
	styleUrls: ['./employee-form-dialog.component.css'],
})
export class EmployeeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	controllerName: string = 'employees';
	isLoading = false;
	constructor(
		private _employee: EmployeeService,
		private fb: FormBuilder,
		public override toastr: ToastrService,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Employee,
		matDialogRef: MatDialogRef<EmployeeFormDialogComponent>
	) {
		super(matDialogRef, translate, _employee, toastr);
		this.initiateFormControls();
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

	private initiateFormControls() {
		this.Form = this.fb.group({
			id: [null],
			firstName: ['', [Validators.required, Validators.maxLength(50)]],
			lastName: ['', [Validators.required, Validators.maxLength(50)]],
			userName: ['', [Validators.required, Validators.maxLength(50)]],
			email: [
				'',
				{
					validators: [Validators.required, Validators.email, Validators.pattern(`^.+@.+\..+$`)],
				},
			],
			phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
		});
	}
	ngOnInit(): void {
		if (this.data) {
			this.splitName();
			this.Form.patchValue(this.data);
		}
	}
	// this method is splitting the name into firstName and lastname as the name is come from API
	// in this form for eg: Mohamed Nader , firstName = Mohamed , lastName = Nader,
	// this is used in editMode because I want to fill the dialog form with data.
	private splitName() {
		this.data.firstName = this.data.name.substring(0, this.data.name.indexOf(' '));
		this.data.lastName = this.data.name.substring(this.data.name.indexOf(' ') + 1);
	}
	handleSubmit() {
		if (this.Form.valid) {
			if (this.data) this.update(this.data.id, this.Form.value);
			else this.add(this.Form.value);
		}
	}
}
