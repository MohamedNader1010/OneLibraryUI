import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Attendance} from '../../interfaces/attendance';
import {AttendanceService} from './../../services/attendance.service';
import {Response} from './../../../shared/interfaces/Iresponse';
import {Employee} from './../../../employee/interFaces/Iemployee';
import {EmployeeService} from './../../../employee/services/employee.service';
import {DatePipe} from '@angular/common';

@Component({
	selector: 'app-form.dialog',
	templateUrl: './form.dialog.html',
	styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	isSubmitting: boolean = false;
	EmployeesDataSource: Employee[] = [];
	constructor(
		public dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Attendance,
		private _attendance: AttendanceService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _employee: EmployeeService,
		private datePipe: DatePipe
	) {
		this.form = this.fb.group({
			id: [null],
			employeeId: [null, [Validators.required]],
			checkIn: [null, [Validators.required]],
			checkOut: [null],
			employee: [''],
		});
	}
	get id(): FormControl {
		return this.form.get('id') as FormControl;
	}
	get employeeId(): FormControl {
		return this.form.get('employeeId') as FormControl;
	}
	get checkIn(): FormControl {
		return this.form.get('checkIn') as FormControl;
	}
	get checkOut(): FormControl {
		return this.form.get('checkOut') as FormControl;
	}

	ngOnInit() {
		this.getAllEmployees();
	}

	getAllEmployees = () =>
		this.subscriptions.push(
			this._employee.getAll().subscribe({
				next: (data) => {
					this.EmployeesDataSource = data.body;
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					if (this.data) {
						this.form.patchValue({
							id: this.data.id,
							employeeId: this.data.employeeId,
							employee: this.data.employee,
							checkIn: this.datePipe.transform(this.data.checkIn, 'HH:mm'),
							checkOut: this.datePipe.transform(this.data.checkOut, 'HH:mm'),
						});
					}
				},
			})
		);

	onNoClick = () => this.dialogRef.close();

	setEmpId = (data: any) => this.employeeId.setValue(data);

	handleSubmit() {
		if (this.form.valid) this.id.value ? this.update() : this.add();
	}

	update() {
		this.subscriptions.push(
			this._attendance.update(this.id.value, this.form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._attendance.DialogData = res.body;
					this.dialogRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}

	add() {
		this.subscriptions.push(
			this._attendance.add(this.form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._attendance.DialogData = res.body;
					this.dialogRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
