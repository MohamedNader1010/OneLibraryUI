import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ClientService} from 'src/Modules/client/services/client.service';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {OrderDetail} from '../../interfaces/IorderDetail';
import {OrderTransaction} from '../../interfaces/IorderTransaction';
import {OrderService} from '../../services/orders.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'orders';
	isSubmitted: boolean = false;
	DetailsDataSource: OrderDetail[] = [];
	TransactionsDataSource: OrderTransaction[] = [];
	///////////////////////
	ServicesDataSource: any[] = [];
	NotesDataSource: any[] = [];
	ClientsDataSource: any[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _client: ClientService,
		private _service: ServicesService,
		private _order: OrderService,
		private _material: MaterialService,
		private _type: ServicesTypeService,
		private fb: FormBuilder
	) {
		this.Form = this.createFormItem('init');
		this.RestControl.disable();
	}

	ngOnInit(): void {
		this.getAllClients();
		this.getAllServices();
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
	}
	getAllClients() {
		this.subscriptions.push(this._client.getAll().subscribe((data: any) => (this.ClientsDataSource = data)));
	}
	getAllServices() {
		this.subscriptions.push(this._client.getAll().subscribe((data: any) => (this.ServicesDataSource = data)));
	}
	get RestControl(): FormControl {
		return this.Form.get('rest') as FormControl;
	}
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					totalPrice: ['', [Validators.required]],
					finalPrice: [''],
					descountAmount: [''],
					descountPercent: [''],
					rest: ['', [Validators.required]],
					paid: ['', [Validators.required]],
					status: ['', [Validators.required]],
					clientId: ['', [Validators.required]],
					details: this.fb.array([]),
					remarks: [''],
				});
				break;
			case 'detail':
				formItem = this.fb.group({
					price: ['', [Validators.required]],
					serviceId: [''],
					noteId: [''],
				});
				break;
		}
		return formItem;
	}
	fillFormWithData(datasource: any) {
		datasource.details.forEach(() => this.handleNewDetail());
		this.Form.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.Form.get('details') as FormArray;
	}
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => this.fillFormWithData(data[0])));
	back = () => this.router.navigate([this.controllerName]);
	handleNewDetail = () => this.OrderDetails.push(this.createFormItem('detail'));
	handleDeleteDetail = (index: number) => this.OrderDetails.removeAt(index);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._order.update(this.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._order.add(this.Form.value).subscribe(() => {
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
