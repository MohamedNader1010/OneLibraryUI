import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ServicePricePerClientTypeService} from '../../services/service-price-per-client-type.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {Subscription} from 'rxjs';
import {ServicePricePerClientType} from '../../Interfaces/ServicePricePerClientType';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {Service} from 'src/Modules/service/interfaces/Iservice';
import {ToastrService} from 'ngx-toastr';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';

@Component({
	selector: 'app-service-type-per-client-form-dialog',
	templateUrl: './service-type-per-client-form-dialog.component.html',
	styleUrls: ['./service-type-per-client-form-dialog.component.css'],
})
export class ServiceTypePerClientFormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	public form: FormGroup;
	isSubmitting: boolean = false;
	public servicesDataSource: Service[] = [];
	public clientsTypeDataSource: ClientType[] = [];
	constructor(
		private matDialogRef: MatDialogRef<ServiceTypePerClientFormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ServicePricePerClientType,
		private _servicePricePerClientType: ServicePricePerClientTypeService,
		private _service: ServicesService,
		private fb: FormBuilder,
		private _clientType: ClientTypeService,
		private toastr: ToastrService
	) {
		this.form = fb.group({
			id: [null],
			price: [0, [Validators.required]],
			serviceId: [null, [Validators.required]],
			clientTypeId: [null, [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.getAllClientTypes();
	}
	get id(): FormControl {
		return this.form.get('id') as FormControl;
	}
	get price(): FormControl {
		return this.form.get('price') as FormControl;
	}
	get serviceId(): FormControl {
		return this.form.get('serviceId') as FormControl;
	}
	get clientTypeId(): FormControl {
		return this.form.get('clientTypeId') as FormControl;
	}

	getAllClientTypes() {
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.clientsTypeDataSource = data.body;
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.getAllServices();
				},
			})
		);
	}

	getAllServices() {
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => {
					this.servicesDataSource = data.body;
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					if (this.data) this.form.patchValue(this.data);
				},
			})
		);
	}

	onNoClick = () => this.matDialogRef.close();

	setServiceId = (data: any) => this.serviceId.setValue(data);
	setClientTypeId = (data: any) => this.clientTypeId.setValue(data);

	handleSubmit() {
		if (this.form.valid) this.id.value ? this.update() : this.add();
	}

	update() {
		this.subscriptions.push(
			this._servicePricePerClientType.update(this.id.value, this.form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._servicePricePerClientType.dialogData = res.body;
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
			this._servicePricePerClientType.add(this.form.value).subscribe({
				next: (res) => {
					this.isSubmitting = true;
					this._servicePricePerClientType.dialogData = res.body;
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
