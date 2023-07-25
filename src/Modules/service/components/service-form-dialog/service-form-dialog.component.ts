import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subscription, map, forkJoin} from 'rxjs';
import {Material} from 'src/Modules/material/interfaces/Imaterial';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ServiceType} from 'src/Modules/serviceType/interFaces/IserviceType';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {Service} from '../../interfaces/Iservice';
import {ServicesService} from '../../services/services.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Response} from './../../../shared/interfaces/Iresponse';
import {ClientTypeService} from './../../../clientType/services/clientType.service';
import {ClientType} from './../../../clientType/interFaces/IclientType';
@Component({
	selector: 'app-service-form-dialog',
	templateUrl: './service-form-dialog.component.html',
	styleUrls: ['./service-form-dialog.component.css'],
})
export class ServiceFormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form!: FormGroup;
	isSubmitting: boolean = false;
	MaterialDataSource: Material[] = [];
	ServiceTypeDataSource: ServiceType[] = [];
	clientsTypesDataSource: ClientType[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Service,
		private _service: ServicesService,
		private _clientType: ClientTypeService,
		private _material: MaterialService,
		private fb: FormBuilder,
		private _serviceType: ServicesTypeService,
		private toastr: ToastrService,
		private matDialogRef: MatDialogRef<ServiceFormDialogComponent>
	) {
		this.Form = this.createFormItem('init');
	}

	get id(): FormControl {
		return this.Form.get('id') as FormControl;
	}

	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}

	get serviceTypeId(): FormControl {
		return this.Form.get('serviceTypeId') as FormControl;
	}

	get serviceMaterials(): FormArray {
		return this.Form.get('serviceMaterials') as FormArray;
	}

	get servicePricePerClientTypes(): FormArray {
		return this.Form.get('servicePricePerClientTypes') as FormArray;
	}

	ngOnInit(): void {
		this.forkJoins();
	}

	getServiceMaterialId = (index: number): FormControl => this.serviceMaterials.at(index).get('id') as FormControl;
	getServiceMaterial = (index: number): FormControl => this.serviceMaterials.at(index).get('materialId') as FormControl;
	getServiceMaterialQuantity = (index: number): FormControl => this.serviceMaterials.at(index).get('quantity') as FormControl;

	getServicePriceId = (index: number): FormControl => this.servicePricePerClientTypes.at(index).get('id') as FormControl;
	getServicePrice = (index: number): FormControl => this.servicePricePerClientTypes.at(index).get('price') as FormControl;
	getServicePriceClientTypeId = (index: number): FormControl => this.servicePricePerClientTypes.at(index).get('clientTypeId') as FormControl;

	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					id: [null],
					name: ['', [Validators.required, Validators.maxLength(100)]],
					serviceTypeId: [null, [Validators.required]],
					serviceMaterials: this.fb.array([]),
					servicePricePerClientTypes: this.fb.array([]),
				});
				break;
			case 'servicePricePerClientTypes':
				formItem = this.fb.group({
					id: [null],
					price: [null, [Validators.required]],
					clientTypeId: [null, [Validators.required]],
				});
				break;
			case 'serviceMaterials':
				formItem = this.fb.group({
					id: [null],
					materialId: [null, [Validators.required]],
					quantity: [1, [Validators.required]],
				});
				break;
		}
		return formItem;
	}

	handleNewServicePrice = () => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes'));

	handleDeleteServicePrice = (index: number) => this.servicePricePerClientTypes.removeAt(index);

	handleNewServiceMaterial = () => this.serviceMaterials.push(this.createFormItem('serviceMaterials'));

	handleDeleteServiceMaterial = (index: number) => this.serviceMaterials.removeAt(index);

	private forkJoins() {
		let services = [this._material.getAll(), this._serviceType.getAll(), this._clientType.getAll()];
		return forkJoin(services)
			.pipe(
				map(([materialResponse, serviceTypeResponse, clientTypeResponse]) => {
					return {
						materials: materialResponse,
						clientsTypes: clientTypeResponse,
						servicesTypes: serviceTypeResponse,
					};
				})
			)
			.subscribe({
				next: (response) => {
					this.MaterialDataSource = response.materials.body;
					this.ServiceTypeDataSource = response.servicesTypes.body;
					this.clientsTypesDataSource = response.clientsTypes.body;
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					if (this.data) {
						this.data.serviceMaterials.forEach(() => this.serviceMaterials.push(this.createFormItem('serviceMaterials')));
						this.data.servicePricePerClientTypes.forEach(() => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes')));
						this.Form.patchValue(this.data);
					}
				},
			});
	}

	setServiceTypeId = (data: any) => this.serviceTypeId.setValue(data);
	setServiceMaterialId = (index: number, data: any) => this.getServiceMaterial(index).setValue(data);
	setServicePriceClientTypeId = (index: number, data: any) => this.getServicePriceClientTypeId(index).setValue(data);

	onNoClick = () => this.matDialogRef.close();

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update();
			else this.add();
		}
	}

	update() {
		this.subscriptions.push(
			this._service.update(this.id.value, this.Form.value).subscribe({
				next: (res) => {
					this._service.DialogData = res.body;
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
			this._service.add(this.Form.value).subscribe({
				next: (res) => {
					this._service.DialogData = res.body;
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
