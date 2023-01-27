import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NoteService} from 'src/Modules/note/services/note.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {OrderDetail} from '../../interfaces/IorderDetail';
import {OrderTransaction} from '../../interfaces/IorderTransaction';
import {OrderService} from '../../services/orders.service';
import {ToastrService} from 'ngx-toastr';
import {Service} from 'src/Modules/service/interfaces/Iservice';
import {Note} from 'src/Modules/note/interfaces/Inote';
import {Client} from 'src/Modules/client/interFaces/Iclient';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ClientService} from 'src/Modules/client/services/client.service';

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
	ServicesDataSource: Service[] = [];
	NotesDataSource: Note[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _service: ServicesService,
		private _note: NoteService,
		private _order: OrderService,
		private fb: FormBuilder,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private toastr: ToastrService
	) {
		this.Form = this.createFormItem('init');
	}

	ngOnInit(): void {
		this.getAllNotes();
		this.getAllClientTypes();
		this.getAllServices();
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	changeClientType(data: any) {
		this.getAllClientsByType(data.value);
	}
	getAllServices() {
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => {
					this.ServicesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getAllClientTypes() {
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.ClientTypesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getAllClientsByType(id: number) {
		this.subscriptions.push(
			this._client.getAllByType(id).subscribe({
				next: (data) => {
					console.log('clients', data);

					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getAllNotes() {
		this.subscriptions.push(
			this._note.getAll().subscribe({
				next: (data) => {
					this.NotesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
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
					rest: [{value: '', disabled: true}, [Validators.required]],
					paid: ['', [Validators.required]],
					status: ['', [Validators.required]],
					clientId: ['', [Validators.required]],
					details: this.fb.array([]),
					remarks: [''],
				});
				break;
			case 'detail':
				formItem = this.fb.group({
					price: [{value: '', disabled: true}],
					quantity: ['', [Validators.required]],
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
	handleNewDetail = () => {
		this.OrderDetails.push(this.createFormItem('detail'));
	};
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
