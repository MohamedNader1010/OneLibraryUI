import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ServicePricePerClientTypeService} from '../../API_Services/service-price-per-client-type.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {KeyValuePairs} from 'src/Persistents/KeyValuePairs';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {DateRange} from '@angular/material/datepicker';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
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
		private route: ActivatedRoute
	) {
		this.form = fb.group({
			price: ['', [Validators.required]],
			serviceId: ['', [Validators.required]],
			clientTypeId: ['', [Validators.required]],
		});
	}

	ngOnInit(): void {
		this.services.getAll().subscribe((data) => {
			this.mappingData(data, this.servicesNames);
		});
		this.clientTypeService.getAll().subscribe((data) => {
			this.mappingData(data, this.clientsType);
		});
		this.route.queryParams.subscribe((params) => (this.id = +params['id']));
		console.log('THIS IS A PARAMS ID: ', this.id);
	}

	get f() {
		return this.form.controls;
	}
	mappingData(data: any, mappedObject: any) {
		data.forEach((obj: any) => {
			mappedObject.push({id: obj.id, name: obj.name});
		});
	}

	submit() {
		if (this.form.valid) this.isSubmitted = true;
		this.service.update(this.id, this.form.value).subscribe({
			next: (data) => {},
			error: (error) => {
				console.log(error);
			},
			complete: () => {
				console.log(this.form.value);
				console.log('Iam from ServicePricePerClientType and Data is sended Successfully!');
			},
		});
	}
}
