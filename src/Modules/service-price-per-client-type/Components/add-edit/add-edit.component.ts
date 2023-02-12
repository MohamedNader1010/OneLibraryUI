import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ServicePricePerClientTypeService} from '../../API_Services/service-price-per-client-type.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {KeyValuePairs} from 'src/Persistents/KeyValuePairs';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {Subscription} from 'rxjs';
import {ServicePricePerClientType} from '../../Interfaces/ServicePricePerClientType';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	public form: FormGroup;
	public servicesNames: KeyValuePairs[] = [];
	public clientsType: KeyValuePairs[] = [];
	private id!: any;
	isSubmitted: boolean = false;
	constructor(
		private service: ServicePricePerClientTypeService,
		private fb: FormBuilder,
		private services: ServicesService,
		private clientTypeService: ClientTypeService,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.form = fb.group({
			price: ['', [Validators.required]],
			serviceId: ['', [Validators.required]],
			clientTypeId: ['', [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.subscriptions.push(
			this.services.getAll().subscribe((data) => {
				this.mappingData(data, this.servicesNames);
			})
		);
		this.subscriptions.push(
			this.clientTypeService.getAll().subscribe((data) => {
				this.mappingData(data, this.clientsType);
			})
		);
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
				console.log('THIS IS A PARAMS ID: ', this.id);
			})
		);
	}

	getSingle = (id: number) =>
		this.subscriptions.push(
			this.service.getOne(id).subscribe((data: ServicePricePerClientType[]) => {
				this.form.patchValue(data);
			})
		);
	get f() {
		return this.form.controls;
	}
	mappingData(data: any, mappedObject: any) {
		data.forEach((obj: any) => {
			mappedObject.push({id: obj.id, name: obj.name});
		});
	}
	back = () => this.router.navigate(['servicePrice']);
	submit() {
		if (this.form.valid) {
			if (this.id)
				this.subscriptions.push(
					this.service.update(this.id, this.form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this.service.add(this.form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
		}
	}
	ngOnDestroy(): void {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
