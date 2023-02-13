import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {map, Observable, pairwise, startWith, Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from 'src/Modules/client/services/client.service';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {Client} from 'src/Modules/client/interFaces/Iclient';
import {Stage} from '../../interfaces/IStage';
import {Term} from '../../interfaces/ITerm';
import {NoteComponent} from '../../interfaces/noteComponent';
import {Service} from 'src/Modules/service/interfaces/Iservice';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {ServicePricePerClientTypeService} from 'src/Modules/service-price-per-client-type/API_Services/service-price-per-client-type.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	loading: boolean = false;
	Form: FormGroup;
	id!: number;
	clientTId!: number;
	controllerName: string = 'notes';
	isSubmitted: boolean = false;
	NoteComponentsDataSource: NoteComponent[] = [];
	TermsDataSource: Term[] = [];
	StagesDataSource: Stage[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: any[] = [];
	ServicesDataSource: Service[] = [];
	clientsFilteredOptions!: Observable<Client[]>;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _note: NoteService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private _service: ServicesService,
		private _servicePrice: ServicePricePerClientTypeService
	) {
		this.Form = this.createFormItem('init');
	}
	ngOnInit(): void {
		this.getAllClientTypes();
		this.getTerms();
		this.getSTages();
		this.getAllServices();
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
		this.clientsFilteredOptions = this.clientId.valueChanges.pipe(
			startWith(''),
			map((value) => {
				let filtered = [];
				let name;
				if (typeof value === 'string') name = value;
				if (name) {
					filtered = this.filterClientss(name as string);
					if (filtered.length) return filtered;
					else {
						this.clientId.setErrors({notFound: true});
						return this.ClientsDataSource.slice();
					}
				} else return [];
			})
		);
	}
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					id: [0],
					name: [null, [Validators.required]],
					originalPrice: [{value: null}],
					earning: [{value: null}],
					actualPrice: [{value: null}],
					teacherPrice: [null, [Validators.required, Validators.min(0)]],
					finalPrice: [{value: null}],
					clientTypeId: [null],
					clientId: [null, [Validators.required]],
					termId: [null, [Validators.required]],
					stageId: [null, [Validators.required]],
					noteComponents: this.fb.array([]),
					quantity: [0],
				});
				break;
			case 'noteComponent':
				formItem = this.fb.group({
					id: [0],
					noteId: [this.noteId.value],
					serviceId: [null, [Validators.required]],
					quantity: [null, [Validators.required, Validators.min(1)]],
					price: [{value: 0, disabled: true}],
					originalPrice: [0],
					totalPrice: [0],
				});
				break;
		}
		return formItem;
	}
	get noteId(): FormControl {
		return this.Form.get('id') as FormControl;
	}
	get noteComponents(): FormArray {
		return this.Form.get('noteComponents') as FormArray;
	}
	get clientTypeId(): FormControl {
		return this.Form.get('clientTypeId') as FormControl;
	}
	get clientId(): FormControl {
		return this.Form.get('clientId') as FormControl;
	}
	get originalPrice(): FormControl {
		return this.Form.get('originalPrice') as FormControl;
	}
	get teacherPrice(): FormControl {
		return this.Form.get('teacherPrice') as FormControl;
	}
	get actualPrice(): FormControl {
		return this.Form.get('actualPrice') as FormControl;
	}
	get earning(): FormControl {
		return this.Form.get('earning') as FormControl;
	}
	get finalPrice(): FormControl {
		return this.Form.get('finalPrice') as FormControl;
	}
	servicePriceFormControl = (index: number): FormControl => this.noteComponents.at(index).get('price') as FormControl;
	serviceOriginalPriceFormControl = (index: number): FormControl => this.noteComponents.at(index).get('originalPrice') as FormControl;
	serviceTotalPriceFormControl = (index: number): FormControl => this.noteComponents.at(index).get('totalPrice') as FormControl;
	serviceQuantityFormControl = (index: number): FormControl => this.noteComponents.at(index).get('quantity') as FormControl;
	changeClientType(data: any) {
		this.subscriptions.push(
			this._client.getAllByType(data.value).subscribe({
				next: (data) => {
					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
				//loop over all services and get new prices
				complete: () => this.calculateActualPrice(),
			})
		);
	}
	getAllClientTypes() {
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.ClientTypesDataSource = data.map((t) => {
						return {clientTypeId: t.id, name: t.name};
					});
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	handleServicePriceChange(data: any, index: number) {
		console.log(123);
		this.subscriptions.push(
			this._servicePrice.getPrice(this.clientTypeId.value, data.value).subscribe({
				next: (res: any) => {
					console.log(res);
					this.serviceOriginalPriceFormControl(index).setValue(res.originalPrice);
					this.servicePriceFormControl(index).setValue(res.price);
					this.calculateActualPrice();
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل الأسعار ');
				},
			})
		);
	}
	handleServiceQuantityChange(data: any, index: number) {
		this.serviceQuantityFormControl(index)
			.valueChanges.pipe(pairwise())
			.subscribe(([prev, next]: [number, number]) => {});
		this.calculateActualPrice();
	}
	calculateActualPrice() {
		let noteActualPrice = 0;
		let noteoriginalPrice = 0;
		//if no components
		if (!this.noteComponents.length) {
			this.originalPrice.setValue(null);
			this.actualPrice.setValue(null);
			this.earning.setValue(null);
			this.finalPrice.setValue(null);
		} else {
			for (let index = 0; index < this.noteComponents.length; index++) {
				if (!this.noteComponents.value[index].serviceId) continue;
				this.subscriptions.push(
					this._servicePrice.getPrice(this.clientTypeId.value, this.noteComponents.value[index].serviceId).subscribe({
						next: (res: any) => {
							this.servicePriceFormControl(index).setValue(res.price);
							noteActualPrice += res.price * this.noteComponents.value[index].quantity;
							this.serviceOriginalPriceFormControl(index).setValue(res.originalPrice);
							noteoriginalPrice += res.originalPrice * this.noteComponents.value[index].quantity;
						},
						error: (e) => {
							this.toastr.error(e.message, 'لايمكن تحميل الأسعار ');
						},
						complete: () => {
							this.originalPrice.setValue(noteoriginalPrice);
							this.actualPrice.setValue(noteActualPrice);
							this.earning.setValue(noteActualPrice - noteoriginalPrice);
							this.finalPrice.setValue(parseFloat(this.actualPrice.value) + parseFloat(this.teacherPrice.value));
						},
					})
				);
			}
		}
	}
	handleTeacherPriceChange(data: any) {
		this.finalPrice.setValue(this.actualPrice.value + data.target.value);
	}
	filterClientss = (name: string): Client[] => this.ClientsDataSource.filter((option) => option.name.includes(name));
	clientDisplayFn = (value: number): string => this.ClientsDataSource.find((option) => option.id === value)?.name ?? '';
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
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._note.getOne(id).subscribe((data: any) => {
				data.noteComponents.forEach(() => {
					this.handleNewNoteComponent();
				});
				this.Form.patchValue(data);
				this.calculateActualPrice();
			})
		);
	getTerms = () => this.subscriptions.push(this._note.getTerms().subscribe((data) => (this.TermsDataSource = [{id: 0, name: 'بدون'}, ...data])));
	getSTages = () => this.subscriptions.push(this._note.getStages().subscribe((data) => (this.StagesDataSource = data)));
	back = () => this.router.navigate([this.controllerName]);
	handleNewNoteComponent = () => {
		this.noteComponents.push(this.createFormItem('noteComponent'));
	};
	handleDeleteNoteComponent = (index: number) => {
		this.noteComponents.removeAt(index);
		this.calculateActualPrice();
	};
	handleSubmit() {
		if (this.Form.valid) {
			this.loading = true;
			if (this.id)
				this.subscriptions.push(
					this._note.update(this.id, this.Form.value).subscribe({
						next: () => {
							this.isSubmitted = true;
							this.back();
						},
						error: (e) => console.log(e),
						complete: () => (this.loading = false),
					})
				);
			else
				this.subscriptions.push(
					this._note.add(this.Form.value).subscribe({
						next: () => {
							this.isSubmitted = true;
							this.back();
						},
						error: (e) => console.log(e),
						complete: () => (this.loading = false),
					})
				);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
