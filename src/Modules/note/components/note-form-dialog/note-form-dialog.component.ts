import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {map, Observable, startWith, Subscription, pairwise, forkJoin} from 'rxjs';
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
import {ServicePricePerClientTypeService} from 'src/Modules/service-price-per-client-type/services/service-price-per-client-type.service';
import {ServicePricePerClientType} from './../../../service-price-per-client-type/Interfaces/ServicePricePerClientType';
import {Note} from '../../interfaces/Inote';
import {Response} from './../../../shared/interfaces/Iresponse';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
	selector: 'app-note-form-dialog',
	templateUrl: './note-form-dialog.component.html',
	styleUrls: ['./note-form-dialog.component.css'],
})
export class NoteFormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	isSubmitting: boolean = false;
	clientTembId: number | null = null;
	controllerName: string = 'notes';
	NoteComponentsDataSource: NoteComponent[] = [];
	TermsDataSource: Term[] = [];
	StagesDataSource: Stage[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: any[] = [];
	ServicesDataSource: Service[] = [];
	clientsFilteredOptions!: Observable<Client[]>;
	deletedComponents: number[] = [];
	constructor(
		private _note: NoteService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private _service: ServicesService,
		private _servicePrice: ServicePricePerClientTypeService,
		private matDialogRef: MatDialogRef<NoteFormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Note
	) {
		this.Form = this.createFormItem('init');
	}

	get id(): FormControl {
		return this.Form.get('id') as FormControl;
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
		this.forkJoins();
		this.subscriptions.push(this.clientTypeId.valueChanges.pipe(startWith(this.clientTypeId.value)).subscribe((value) => this.handleClientTypeChange(value)));
		this.subscriptions.push(this.teacherPrice.valueChanges.subscribe((value) => this.finalPrice.setValue(+this.actualPrice.value + +value)));
		if (this.data) this.patchData();
	}

	private forkJoins() {
		let services = [this._note.getStages(), this._note.getTerms(), this._clientType.getAll(), this._service.GetAllPriced()];
		return forkJoin(services)
			.pipe(
				map(([stagesResponse, termsResponse, clientTypeResponse, serviceResponse]) => {
					return {
						stages: stagesResponse,
						terms: termsResponse,
						clientsType: clientTypeResponse,
						services: serviceResponse,
					};
				})
			)
			.subscribe({
				next: (response) => {
					this.TermsDataSource = response.terms.body;
					let emptyTerm: Term = {
						id: null,
						name: 'بدون',
					};
					this.TermsDataSource.unshift(emptyTerm);

					this.StagesDataSource = response.stages.body;
					let emptyStage: Stage = {
						id: null,
						name: 'بدون',
					};
					this.StagesDataSource.unshift(emptyStage);

					this.ServicesDataSource = response.services.body;
					this.ClientTypesDataSource = response.clientsType.body;
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
			});
	}

	patchData = () => {
		this.data.noteComponents.forEach((component: NoteComponent) => {
			this.noteComponents.push(this.createFormItem('noteComponent'));
			this._servicePrice.getPrice(this.data.clientTypeId, component.serviceId).subscribe({
				next: (res) => {
					this.servicePriceFormControl(this.data.noteComponents.indexOf(component)).setValue(res.body.price);
					this.serviceOriginalPriceFormControl(this.data.noteComponents.indexOf(component)).setValue(res.body.originalPrice);
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.subscribeQuantityChanges(this.data.noteComponents.indexOf(component));
					this.subscribeServiceChanges(this.data.noteComponents.indexOf(component));
				},
			});
		});
		this.Form.patchValue(this.data);
		this.clientTembId = this.data.clientId;
	};

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
					noteComponents: this.fb.array([], Validators.minLength(1)),
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
		if (this.data) this.deletedComponents.push(this.getNoteComponentId(index).value);
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
					console.log(this.originalPrice.value);

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
						next: (res) => {
							if (!res.body) {
								this.toastr.error('هذه الخدمة غير مسعرة');
								return;
							}
							//remove service price
							this.setOriginalAndActualPrices(-1, index, quantity);
							//add new service price
							this.serviceOriginalPriceFormControl(index).setValue(res.body.originalPrice);
							this.servicePriceFormControl(index).setValue(res.body.price);
							this.setOriginalAndActualPrices(1, index, quantity);
							this.calculateFinalPriceAndEarning();
							console.log(this.originalPrice.value);
						},
						error: (e) => {
							this.isSubmitting = false;
							let res: Response = e.error ?? e;
							this.toastr.error(res.message);
						},
					})
				);
			})
		);
	}

	getServiceName = (index: number): string => this.ServicesDataSource.find((option) => option.id === this.getNoteComponentServiceId(index).value)?.name ?? '';

	handleClientTypeChange(id: number) {
		if (id === null || id === undefined) return;
		this.subscriptions.push(
			this._client.getAllByType(id).subscribe({
				next: (data) => {
					this.ClientsDataSource = data.body;
				},
				error: (e) => {
					this.ClientsDataSource = [];
					this.clientId.reset();
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
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
				let res: Response = await new Promise<Response>((resolve) => {
					this._servicePrice.getPrice(this.clientTypeId.value, this.getNoteComponentServiceId(index).value).subscribe({
						next: (res) => resolve(res),
						error: (e) => {
							this.isSubmitting = false;
							let res: Response = e.error ?? e;
							this.toastr.error(res.message);
						},
					});
				});
				noteActualPrice += res.body.price * this.serviceQuantityFormControl(index).value;
				noteoriginalPrice += res.body.originalPrice * this.serviceQuantityFormControl(index).value;
				this.servicePriceFormControl(index).setValue(res.body.price);
				this.serviceOriginalPriceFormControl(index).setValue(res.body.originalPrice);
			}
		}
		this.originalPrice.setValue(noteoriginalPrice);
		this.actualPrice.setValue(noteActualPrice);
		this.calculateFinalPriceAndEarning();
	}

	setClientTypeId = (data: any) => this.clientTypeId.setValue(data);
	setClientId = (data: any) => this.clientId.setValue(data);

	onNoClick = () => this.matDialogRef.close();

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update();
			else this.add();
		}
	}

	update() {
		// if (this.deletedComponents.length)
		this.subscriptions.push(
			this._note.deleteNoteComponents(this.deletedComponents).subscribe({
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.subscriptions.push(
						this._note.update(this.data.id, this.Form.value).subscribe({
							next: (res) => {
								this._note.dialogData = res.body;
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
				},
			})
		);
	}

	add() {
		this.subscriptions.push(
			this._note.add(this.Form.value).subscribe({
				next: (res) => {
					this._note.dialogData = res.body;
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
