import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Material} from 'src/Modules/material/interfaces/Imaterial';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ServiceType} from 'src/Modules/serviceType/interFaces/IserviceType';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {Service} from '../../interfaces/Iservice';
import {ServicesService} from '../../services/services.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Response} from './../../../shared/interfaces/Iresponse';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {TranslateService} from '@ngx-translate/core';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {ClientTypeService} from './../../../clientType/services/clientType.service';
import {ServicePricePerClientTypeService} from '../../../service-price-per-client-type/services/service-price-per-client-type.service';
@Component({
	selector: 'app-service-form-dialog',
	templateUrl: './service-form-dialog.component.html',
	styleUrls: ['./service-form-dialog.component.css'],
})
export class ServiceFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form!: FormGroup;
	isSubmitting: boolean = false;
	MaterialDataSource: Material[] = [];
	ServiceTypeDataSource: ServiceType[] = [];
	clientsTypesDataSource: ClientType[] = [];
	deletedServiceMaterials: number[] = [];
	deletedServicePrices: number[] = [];

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Service,
		translate: TranslateService,
		dialogService: DialogServiceService,
		private _service: ServicesService,
		private _clientType: ClientTypeService,
		private _material: MaterialService,
		private _servicePrice: ServicePricePerClientTypeService,
		private fb: FormBuilder,
		private _type: ServicesTypeService,
		private toastr: ToastrService,
		private matDialogRef: MatDialogRef<ServiceFormDialogComponent>
	) {
		super(matDialogRef, dialogService, translate);
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
		this.loadData();
	}

	getServiceMaterialId = (index: number): FormControl => this.serviceMaterials.at(index).get('id') as FormControl;
	getServiceMaterial = (index: number): FormControl => this.serviceMaterials.at(index).get('materialId') as FormControl;

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
					serviceTypeId: ['', [Validators.required]],
					serviceMaterials: this.fb.array([]),
					servicePricePerClientTypes: this.fb.array([]),
				});
				break;
			case 'servicePricePerClientTypes':
				formItem = this.fb.group({
					id: [null],
					// serviceId: [this.id.value],
					price: ['', [Validators.required]],
					clientTypeId: ['', [Validators.required]],
				});
				break;
			case 'serviceMaterials':
				formItem = this.fb.group({
					id: [null],
					// serviceId: [this.id.value],
					materialId: ['', [Validators.required]],
				});
				break;
		}
		return formItem;
	}

	handleNewServicePrice = () => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes'));

	handleDeleteServicePrice = (index: number) => {
		if (this.id) this.deletedServicePrices.push(this.getServicePriceId(index).value);
		this.servicePricePerClientTypes.removeAt(index);
	};

	handleNewServiceMaterial = () => this.serviceMaterials.push(this.createFormItem('serviceMaterials'));

	handleDeleteServiceMaterial = (index: number) => {
		if (this.id) this.deletedServiceMaterials.push(this.getServiceMaterialId(index).value);
		this.serviceMaterials.removeAt(index);
	};

	loadData() {
		this.getAllMaterials();
	}

	getAllMaterials = () =>
		this.subscriptions.push(
			this._material.getAll().subscribe({
				next: (data) => {
					this.MaterialDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
				complete: () => this.getAllServicesTypes(),
			})
		);

	getAllServicesTypes = () =>
		this.subscriptions.push(
			this._type.getAll().subscribe({
				next: (data) => {
					this.ServiceTypeDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
				complete: () => {
					this.getAllClientTypes();
				},
			})
		);

	getAllClientTypes = () =>
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.clientsTypesDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
				complete: () => {
					if (this.data) {
						this.data.serviceMaterials.forEach(() => this.serviceMaterials.push(this.createFormItem('serviceMaterials')));
						this.data.servicePricePerClientTypes.forEach(() => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes')));
						this.Form.patchValue(this.data);
					}
				},
			})
		);

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update();
			else this.add();
		}
	}

	update() {
		// if (this.deletedServiceMaterials.length)
		// 	this.subscriptions.push(
		// 		this._service.deleteServiceMaterials(this.deletedServiceMaterials).subscribe({
		// 			error: (e) => {
		// 				this.isSubmitting = false;
		// 				let res: Response = e.error ?? e;
		// 				this.toastr.error(res.message);
		// 			},
		// 		})
		// 	);
		// if (this.deletedServicePrices.length)
		// 	this.subscriptions.push(
		// 		this._servicePrice.deleteServicePrices(this.deletedServicePrices).subscribe({
		// 			error: (e) => {
		// 				this.isSubmitting = false;
		// 				let res: Response = e.error ?? e;
		// 				this.toastr.error(res.message);
		// 			},
		// 		})
		// 	);
		this.subscriptions.push(
			this._service.update(this.id.value, this.Form.value).subscribe({
				next: (res) => {
					this._service.dialogData = res.body;
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
					this._service.dialogData = res.body;
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
