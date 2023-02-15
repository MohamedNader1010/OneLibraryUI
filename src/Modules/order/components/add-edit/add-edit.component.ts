import {ServicePricePerClientTypeService} from './../../../service-price-per-client-type/API_Services/service-price-per-client-type.service';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
import {Status} from '../../Enums/status';
import {MatSelect} from '@angular/material/select';
@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	private _clientTypeId: number = -1;
	@ViewChild('matNoteId') matNoteId!: MatSelect;
	@ViewChild('matServiceId') matServiceId!: MatSelect;
	availableStatus: Status[] = [Status.استلم, Status.حجز];
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
	key = 0;
	prices: {key: number; value: number}[] = [];
	totalPrice: number = 0;
	priceDiscount: number = 0;
	percentDiscount: number = 0.0;
	paid: number = 0;
	rest: number = 0;
	finalPrice: number = 0;
	notePrice: number = 0;
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _service: ServicesService,
		private _note: NoteService,
		private _order: OrderService,
		private fb: FormBuilder,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private toastr: ToastrService,
		private servicePriceService: ServicePricePerClientTypeService
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
	getStatusLabel(status: Status) {
		switch (status) {
			case Status.حجز:
				return 'حجز';
			case Status.اعداد:
				return 'اعداد';
			case Status.جاهز:
				return 'جاهز';
			case Status.استلم:
				return 'استلم';
			case Status.مرتجع:
				return 'مرتجع';
			case Status.هالك:
				return 'هالك';
			case Status.اكتمل:
				return 'اكتمل';
			case Status.غير_مكتمل:
				return 'غير مرتجع';
		}
	}
	getPrice(serviceTypeId: number, index: number) {
		if (this._clientTypeId == -1) {
			this.OrderDetails.controls[index].get('serviceId')?.reset();
			this.onServiceValueChanged(index);
			return this.toastr.error('Please choose a client type first.', 'Error');
		}
		this.onServiceValueChanged(index);
		return this.subscriptions.push(
			this.servicePriceService.getPrice(this._clientTypeId, serviceTypeId).subscribe({
				next: (res: any) => {
					this.prices?.forEach((element) => {
						if (element.key === index) {
							element.value = +res.price;
						}
						this.getQuantityAndUpdatePriceInputForService(index);
						this.computeTotalPrice();
						this.computeFinalPrice(0);
					});
				},
				error: (err) => this.toastr.error(err.message, 'لايمكن تحميل الأسعار '),
			})
		);
	}
	getQuantityAndUpdatePriceInputForService(index: number) {
		if (this.OrderDetails.controls[index].get('serviceId')?.disabled) {
			this.getNotePrice(index);
		}
		if (this.OrderDetails.controls[index].get('noteId')?.disabled) {
			this.prices.forEach((element) => {
				if (element.key == index) {
					let qty = this.OrderDetails.controls[index].get('quantity')?.value;
					let priceInput = this.OrderDetails.controls[index].get('price');
					qty ? priceInput?.setValue(element.value * +qty) : priceInput?.setValue(element.value);
				}
			});
		}
		this.computeTotalPrice();
		this.computeFinalPrice(0);
	}
	getAllClientTypes() {
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.ClientTypesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل البيانات');
				},
			})
		);
	}
	getAllClientsByType(data: any) {
		this._clientTypeId = data.value;
		this.subscriptions.push(
			this._client.getAllByType(data.value).subscribe({
				next: (data) => {
					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل البيانات ');
				},
			})
		);
	}
	getAllServices() {
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => {
					this.ServicesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل البيانات ');
				},
			})
		);
	}
	getAllNotes() {
		this.subscriptions.push(
			this._note.getAll().subscribe({
				next: (data) => {
					this.NotesDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل البيانات ');
				},
			})
		);
	}
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					totalPrice: [null, [Validators.required]],
					finalPrice: [null],
					discount: [null],
					discountPercent: [null],
					rest: [{value: null}, [Validators.required]],
					paid: [null, [Validators.required]],
					clientId: [null, [Validators.required]],
					orderDetails: this.fb.array([]),
					remarks: [null],
				});
				break;
			case 'detail':
				formItem = this.fb.group({
					price: [{value: null}],
					quantity: [null, [Validators.required]],
					serviceId: [null],
					noteId: [null],
					orderStatus: [Status.استلم, [Validators.required]],
				});
				break;
		}
		return formItem;
	}
	computeDiscountPercent(): number {
		let discountAmount = this.Form.get('discount');
		let discountPercent = this.Form.get('discountPercent');
		let percent = ((discountAmount?.value / this.totalPrice) * 100).toFixed(2).toString();
		discountPercent?.setValue(percent);
		this.computeFinalPrice(+discountAmount?.value);
		return +percent;
	}
	computeDiscountAmount(): number {
		let discountAmount = this.Form.get('discount');
		let discountPercent = this.Form.get('discountPercent');
		let value = ((discountPercent?.value / 100) * this.totalPrice).toFixed(2).toString();
		discountAmount?.setValue(value);
		this.computeFinalPrice(+value);
		return +value;
	}
	private clearPriceAndQuantityInput(index: number) {
		this.OrderDetails.controls[index].get('price')?.setValue(null);
		this.OrderDetails.controls[index].get('quantity')?.setValue('1');
	}
	private computeFinalPrice(discountValue: number) {
		let finalPrice = this.Form.get('finalPrice');
		this.finalPrice = this.totalPrice - +discountValue;
		finalPrice?.setValue(this.finalPrice);
		this.computeRest();
	}
	computeRest() {
		let rest = this.Form.get('rest');
		let paid = this.Form.get('paid');
		this.paid = +paid?.value;
		this.rest = this.finalPrice - this.paid;
		rest?.setValue(this.rest);
	}
	private computeTotalPrice() {
		this.totalPrice = 0;
		this.OrderDetails.controls.forEach((element) => {
			if (+element.get('price')?.value) {
				this.totalPrice = this.totalPrice + +element.get('price')?.value;
			}
		});
		this.Form.get('totalPrice')?.setValue(this.totalPrice);
	}
	fillFormWithData(datasource: any) {
		datasource.details.forEach(() => this.handleNewDetail());
		this.Form.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.Form.get('orderDetails') as FormArray;
	}
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => this.fillFormWithData(data[0])));
	back = () => this.router.navigate([this.controllerName]);
	handleNewDetail = () => {
		this.OrderDetails.push(this.createFormItem('detail'));
		this.key = this.OrderDetails.controls.length - 1;
		this.prices.push({key: this.key, value: -1});
		this.key++;
	};
	handleDeleteDetail = (index: number) => {
		this.OrderDetails.removeAt(index);
		this.deleteSelectedElementFromMappedObject(index);
	};
	deleteSelectedElementFromMappedObject(index: number) {
		for (let i = index + 1; i < this.prices.length; i++) {
			this.prices[i].key--;
			this.key--;
		}
		this.prices.splice(index, 1);
	}
	private getNotePrice(index: number) {
		let noteId = this.OrderDetails.controls[index].get('noteId')?.value;
		this.NotesDataSource.forEach((note) => {
			if (note.id === noteId) {
				let price = +(note.finalPrice == null ? 10 : note.finalPrice);
				let qty = this.OrderDetails.controls[index].get('quantity')?.value;
				let priceInput = this.OrderDetails.controls[index].get('price');
				console.log(qty);
				qty ? priceInput?.setValue(price * +qty) : priceInput?.setValue(price);
			}
			this.computeTotalPrice();
			this.computeFinalPrice(0);
		});
	}
	// disable note material when choosing a service.
	private onServiceValueChanged(index: number) {
		let noteMaterial = this.OrderDetails.controls[index].get('noteId');
		noteMaterial?.disable();
	}
	// disable service material when choosing a note.
	onNoteValueChanged(index: number) {
		let serviceMaterial = this.OrderDetails.controls[index].get('serviceId');
		serviceMaterial?.disable();
		this.getNotePrice(index);
	}
	enableAndDisableDDL(index: number, obj: MatSelect) {
		let serviceMaterial = this.OrderDetails.controls[index].get('serviceId');
		let noteMaterial = this.OrderDetails.controls[index].get('noteId');
		if (serviceMaterial?.disabled) {
			serviceMaterial?.enable();
			noteMaterial?.disable();
			noteMaterial?.reset();
			obj.close();
			this.clearPriceAndQuantityInput(index);
		} else {
			noteMaterial?.enable();
			serviceMaterial?.disable();
			serviceMaterial?.reset();
			obj.close();
			this.clearPriceAndQuantityInput(index);
		}
	}
	private validateDiscountAmountAndPercent() {
		let discount = this.computeDiscountAmount();
		let percent = this.computeDiscountPercent();
		if (discount !== percent) {
			this.toastr.error('discount amount not equals to discount percent', 'ERROR');
			this.Form.setErrors({invalid: true});
		}
	}
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id) {
				this.validateDiscountAmountAndPercent();
				this.subscriptions.push(
					this._order.update(this.id, this.Form.value).subscribe(
						() => {
							this.isSubmitted = true;
							this.back();
						},
						(err) => {
							this.toastr.error(err.error.Message, 'ERROR');
							console.log(err);
						}
					)
				);
			} else {
				this.validateDiscountAmountAndPercent();
				this.subscriptions.push(
					this._order.add(this.Form.value).subscribe(
						() => {
							this.isSubmitted = true;
							this.back();
						},
						(err) => {
							this.toastr.error(err.error.Message, 'ERROR');
							console.log(err);
						}
					)
				);
			}
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
