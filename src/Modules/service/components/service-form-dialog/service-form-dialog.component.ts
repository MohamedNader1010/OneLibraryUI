import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: Service,
		translate: TranslateService,
		dialogService: DialogServiceService,
		matDialogg: MatDialog,
		private _service: ServicesService,
		private _material: MaterialService,
		private fb: FormBuilder,
		private _type: ServicesTypeService,
		private toastr: ToastrService,
		private matDialogRef: MatDialogRef<ServiceFormDialogComponent>
	) {
		super(matDialogRef, dialogService, translate, matDialogg);
		this.initiateFormControls();
	}

	get id(): FormControl {
		return this.Form.get('id') as FormControl;
	}

	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}

	get materialId(): FormControl {
		return this.Form.get('materialId') as FormControl;
	}

	get serviceTypeId(): FormControl {
		return this.Form.get('serviceTypeId') as FormControl;
	}

	private initiateFormControls() {
		this.Form = this.fb.group({
			id: [null],
			name: ['', [Validators.required, Validators.maxLength(100)]],
			materialId: ['', [Validators.required]],
			serviceTypeId: ['', [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.loadData();
	}

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
					this.ServiceTypeDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
				complete: () => {
					if (this.data) this.Form.patchValue(this.data);
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
