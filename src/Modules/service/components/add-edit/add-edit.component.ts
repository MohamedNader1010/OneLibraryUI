import {Component, OnDestroy, OnInit} from '@angular/core';
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

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'services';
	isSubmitted: boolean = false;
	MaterialDataSource: Material[] = [];
	ServiceTypeDataSource: ServiceType[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _service: ServicesService,
		private _material: MaterialService,
		private _type: ServicesTypeService,
		private fb: FormBuilder,
		private toastr: ToastrService
	) {
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
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._service.getOne(id).subscribe((data: Service[]) => {
				console.log(data[0]);
				this.Form.patchValue(data[0]);
			})
		);
	getAllMaterials = () =>
		this.subscriptions.push(
			this._material.getAll().subscribe({
				next: (data) => {
					this.MaterialDataSource = data;
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
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._service.update(this.id, this.Form.value).subscribe(() => {
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
