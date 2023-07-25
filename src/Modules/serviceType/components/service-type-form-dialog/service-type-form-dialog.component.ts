import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ServiceType} from '../../interFaces/IserviceType';
import {ServicesTypeService} from '../../services/serviceType.service';
import {Response} from './../../../shared/interfaces/Iresponse';

@Component({
	selector: 'app-service-type-form-dialog',
	templateUrl: './service-type-form-dialog.component.html',
	styleUrls: ['./service-type-form-dialog.component.css'],
})
export class ServiceTypeFormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	isSubmitting: boolean = false;
	constructor(
		private matDialogRef: MatDialogRef<ServiceTypeFormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ServiceType,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _serviceType: ServicesTypeService
	) {
		this.Form = this.fb.group({
			id: [null],
			name: ['', [Validators.required, Validators.maxLength(100)]],
		});
	}
	get id(): FormControl {
		return this.Form.get('id') as FormControl;
	}

	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}

	ngOnInit(): void {
		if (this.data) this.Form.patchValue(this.data);
	}

	onNoClick = () => this.matDialogRef.close();

	handleSubmit() {
		if (this.Form.valid) this.id.value ? this.update() : this.add();
	}

	update() {
		this.subscriptions.push(
			this._serviceType.update(this.id.value, this.Form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._serviceType.DialogData = res.body;
					this.matDialogRef.close({data: res});
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
			this._serviceType.add(this.Form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._serviceType.DialogData = res.body;
					this.matDialogRef.close({data: res});
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
