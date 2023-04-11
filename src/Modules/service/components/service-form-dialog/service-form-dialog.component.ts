import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Material} from 'src/Modules/material/interfaces/Imaterial';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ServiceType} from 'src/Modules/serviceType/interFaces/IserviceType';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {Service} from '../../interfaces/Iservice';
import {ServicesService} from '../../services/services.service';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';

@Component({
	selector: 'app-service-form-dialog',
	templateUrl: './service-form-dialog.component.html',
	styleUrls: ['./service-form-dialog.component.css'],
})
export class ServiceFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	controllerName: string = 'services';
	isSubmitted: boolean = false;
	MaterialDataSource: Material[] = [];
	ServiceTypeDataSource: ServiceType[] = [];

	constructor(
		private _service: ServicesService,
		private _material: MaterialService,
		private _type: ServicesTypeService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Service,
		private matDialogRef: MatDialogRef<ServiceFormDialogComponent>,
		private dialogService: DialogServiceService,
		private matDialogg: MatDialog
	) {
		super(matDialogRef, dialogService, translate, matDialogg);
		this.Form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			materialId: ['', [Validators.required]],
			serviceTypeId: ['', [Validators.required]],
		});
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	ngOnInit(): void {
		this.getAllMaterials();
		this.getAllServicesTypes();
		if (this.data) this.Form.patchValue(this.data);
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
			})
		);

	handleSubmit() {
		if (this.Form.valid) {
			if (this.data)
				this.subscriptions.push(
					this._service.update(this.data.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._service.add(this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
