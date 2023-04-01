import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {map, Observable, startWith, Subscription, pairwise} from 'rxjs';
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
import {ServicePricePerClientType} from './../../../service-price-per-client-type/Interfaces/ServicePricePerClientType';
import {Note} from '../../interfaces/Inote';
import {Response} from './../../../shared/interfaces/Iresponse';
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
	clientTembId: number | null = null;
	controllerName: string = 'notes';
	isSubmitted: boolean = false;
	NoteComponentsDataSource: NoteComponent[] = [];
	TermsDataSource: Term[] = [];
	StagesDataSource: Stage[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: any[] = [];
	ServicesDataSource: Service[] = [];
	clientsFilteredOptions!: Observable<Client[]>;
	deletedComponents: number[] = [];
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
	getNoteComponentId = (index: number): FormControl => this.noteComponents.at(index).get('id') as FormControl;
	getNoteComponentServiceId = (index: number): FormControl => this.noteComponents.at(index).get('serviceId') as FormControl;
	servicePriceFormControl = (index: number): FormControl => this.noteComponents.at(index).get('price') as FormControl;
	serviceOriginalPriceFormControl = (index: number): FormControl => this.noteComponents.at(index).get('originalPrice') as FormControl;
	serviceQuantityFormControl = (index: number): FormControl => this.noteComponents.at(index).get('quantity') as FormControl;
	ngOnInit(): void {
		this.getAllClientTypes();
		this.getTerms();
		this.getSTages();
		this.getAllServices();
		this.subscriptions.push(this.clientTypeId.valueChanges.pipe(startWith(this.clientTypeId.value)).subscribe((value) => this.handleClientTypeChange(value)));
		this.clientsFilteredOptions = this.clientId.valueChanges.pipe(
			startWith(this.clientId.value),
			map((value) => {
				let filtered = [];
				let name;
				if (typeof value === 'string') name = value;
				if (name) {
					filtered = this.filterClients(name as string);
					if (filtered.length) return filtered;
					else {
						this.clientId.setErrors({notFound: true});
						return this.ClientsDataSource.slice();
					}
				} else return [];
			})
		);
		this.subscriptions.push(this.teacherPrice.valueChanges.subscribe((value) => this.finalPrice.setValue(+this.actualPrice.value + +value)));
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	filterClients = (name: string): Client[] => this.ClientsDataSource.filter((option) => option.name.includes(name));
	clientDisplayFn = (value: number): string => this.ClientsDataSource.find((option) => option.id === value)?.name ?? '';
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					id: [0],
					name: ['', [Validators.required]],
					originalPrice: [0],
					earning: [0],
					actualPrice: [0],
					teacherPrice: [0, [Validators.required, Validators.min(0)]],
					finalPrice: [0],
					clientTypeId: [null],
					clientId: [null, [Validators.required]],
					termId: [null],
					stageId: [null],
					noteComponents: this.fb.array([]),
					quantity: [0],
				});
				break;
			case 'noteComponent':
				formItem = this.fb.group({
					id: [0],
					noteId: [this.noteId.value],
					serviceId: [null, [Validators.required]],
					quantity: [1, [Validators.required, Validators.min(1)]],
					price: [0],
					originalPrice: [0],
				});
				break;
		}
		return formItem;
	}
	handleNewNoteComponent = () => {
		let index = this.noteComponents.length;
		this.noteComponents.push(this.createFormItem('noteComponent'));
		this.subscribeQuantityChanges(index);
		this.subscribeServiceChanges(index);
	};
	handleDeleteNoteComponent = (index: number) => {
		if (this.id) this.deletedComponents.push(this.getNoteComponentId(index).value);
		//remove service price
		let quantity = this.serviceQuantityFormControl(index).value;
		this.setOriginalAndActualPrices(-1, index, quantity);
		this.calculateFinalPriceAndEarning();
		this.noteComponents.removeAt(index);
		if (!this.noteComponents.length) {
			this.originalPrice.setValue(0);
			this.actualPrice.setValue(0);
			this.earning.setValue(0);
			this.finalPrice.setValue(0);
		}
	};
	subscribeQuantityChanges(index: number) {
		this.subscriptions.push(
			this.serviceQuantityFormControl(index)
				.valueChanges.pipe(startWith(this.serviceQuantityFormControl(index).value), pairwise())
				.subscribe(([old, value]) => {
					this.setOriginalAndActualPrices(1, index, value - old);
					this.calculateFinalPriceAndEarning();
				})
		);
	}
	subscribeServiceChanges(index: number) {
		this.subscriptions.push(
			this.getNoteComponentServiceId(index).valueChanges.subscribe((id) => {
				let quantity = this.serviceQuantityFormControl(index).value;
				this.subscriptions.push(
					this._servicePrice.getPrice(this.clientTypeId.value, id).subscribe({
						next: (res: ServicePricePerClientType) => {
							//remove service price
							this.setOriginalAndActualPrices(-1, index, quantity);
							//add new service price
							this.serviceOriginalPriceFormControl(index).setValue(res.originalPrice);
							this.servicePriceFormControl(index).setValue(res.price);
							this.setOriginalAndActualPrices(1, index, quantity);
							this.calculateFinalPriceAndEarning();
						},
						error: (e) => this.toastr.error(e.message, 'لايمكن تحميل الأسعار '),
					})
				);
			})
		);
	}
	getServiceName = (index: number): string => this.ServicesDataSource.find((option) => option.id === this.getNoteComponentServiceId(index).value)?.name ?? '';
	getTerms = () =>
		this.subscriptions.push(
			this._note.getTerms().subscribe((data) => {
				this.TermsDataSource = data;
				let emptyTerm: Term = {
					id: null,
					name: 'بدون',
				};
				this.TermsDataSource.unshift(emptyTerm);
			})
		);
	getSTages = () =>
		this.subscriptions.push(
			this._note.getStages().subscribe((data) => {
				this.StagesDataSource = data;
				let emptyStage: Stage = {
					id: null,
					name: 'بدون',
				};
				this.StagesDataSource.unshift(emptyStage);
			})
		);
	getAllServices() {
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => (this.ServicesDataSource = data),
				error: (e) => this.toastr.error(e.message, 'لايمكن تحميل ابيانات '),
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
					this.toastr.error(e.message, 'لايمكن تحميل البيانات ');
				},
			})
		);
	}
	handleClientTypeChange(id: number) {
		if (id === null) return;
		this.subscriptions.push(
			this._client.getAllByType(id).subscribe({
				next: (data) => {
					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.ClientsDataSource = [];
					this.clientId.reset();
					this.toastr.error(e.message, 'لايمكن تحميل البيانات ');
				},
				complete: () => {
					if (this.clientTembId) {
						this.clientId.setValue(this.clientTembId);
						this.clientTembId = null;
					} else this.clientId.reset();
					this.calculateNotePrice();
				},
			})
		);
	}
	setOriginalAndActualPrices(sign: number, index: number, quantity: number) {
		this.originalPrice.setValue(+this.originalPrice.value + sign * (+this.serviceOriginalPriceFormControl(index).value * quantity));
		this.actualPrice.setValue(+this.actualPrice.value + sign * (+this.servicePriceFormControl(index).value * quantity));
	}
	calculateFinalPriceAndEarning() {
		this.earning.setValue(+this.actualPrice.value - +this.originalPrice.value);
		this.finalPrice.setValue(+this.actualPrice.value + +this.teacherPrice.value);
	}
	getSingle = (id: number) => {
		this.subscriptions.push(
			this._note.getOne(id).subscribe({
				next: (res) => {
					let data: Note = res.body;
					data.noteComponents.forEach((c: NoteComponent) => {
						this.noteComponents.push(this.createFormItem('noteComponent'));
						this._servicePrice.getPrice(data.clientTypeId, c.serviceId).subscribe({
							next: (res) => {
								this.servicePriceFormControl(data.noteComponents.indexOf(c)).setValue(res.price);
								this.serviceOriginalPriceFormControl(data.noteComponents.indexOf(c)).setValue(res.originalPrice);
							},
							error: (e) => this.toastr.error(e.error.Message, 'لايمكن تحميل الأسعار '),
							complete: () => {
								this.subscribeQuantityChanges(data.noteComponents.indexOf(c));
								this.subscribeServiceChanges(data.noteComponents.indexOf(c));
							},
						});
					});
					this.Form.patchValue(data);
					this.clientTembId = data.clientId;
				},
				error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
			})
		);
	};
	async calculateNotePrice() {
		let noteActualPrice = 0,
			noteoriginalPrice = 0;
		if (!this.noteComponents.length) {
			this.originalPrice.setValue(0);
			this.actualPrice.setValue(0);
			this.earning.setValue(0);
			this.finalPrice.setValue(0);
			return;
		}
		for (let index = 0; index < this.noteComponents.length; index++) {
			if (!this.getNoteComponentServiceId(index).value) {
				this.servicePriceFormControl(index).setValue(0);
				this.serviceOriginalPriceFormControl(index).setValue(0);
			} else {
				let res: {price: number; originalPrice: number} = await new Promise<{price: number; originalPrice: number}>((resolve) => {
					this._servicePrice.getPrice(this.clientTypeId.value, this.getNoteComponentServiceId(index).value).subscribe({
						next: (res) => resolve({price: res.price, originalPrice: res.originalPrice}),
						error: (e) => this.toastr.error(e.message, 'لايمكن تحميل الأسعار '),
					});
				});
				noteActualPrice += res.price * this.serviceQuantityFormControl(index).value;
				noteoriginalPrice += res.originalPrice * this.serviceQuantityFormControl(index).value;
				this.servicePriceFormControl(index).setValue(res.price);
				this.serviceOriginalPriceFormControl(index).setValue(res.originalPrice);
			}
		}
		this.originalPrice.setValue(noteoriginalPrice);
		this.actualPrice.setValue(noteActualPrice);
		this.calculateFinalPriceAndEarning();
	}
	handleSubmit() {
		if (this.Form.valid) {
			this.loading = true;
			if (this.id) this.update();
			else this.add();
		}
	}
	update() {
		if (this.deletedComponents.length)
			this.subscriptions.push(
				this._note.deleteNoteComponents(this.deletedComponents).subscribe({
					error: (e) => {
						this.loading = false;
						let res: Response = e.error ?? e;
						this.toastr.error(res.message);
					},
				})
			);
		this.subscriptions.push(
			this._note.update(this.id, this.Form.value).subscribe({
				next: (res) => {
					this.isSubmitted = true;
					this.loading = true;
					this.back();
				},
				error: (e) => {
					this.loading = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => (this.loading = false),
			})
		);
	}
	add() {
		this.subscriptions.push(
			this._note.add(this.Form.value).subscribe({
				next: (res) => {
					this.isSubmitted = true;
					this.loading = true;
					this.back();
				},
				error: (e) => {
					this.loading = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => (this.loading = false),
			})
		);
	}
	back = () => this.router.navigate([this.controllerName]);
	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
