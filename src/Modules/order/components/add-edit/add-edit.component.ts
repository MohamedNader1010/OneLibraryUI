import { TranslateService } from '@ngx-translate/core';
import { AlertServiceService } from './../../../shared/services/alert-service.service';
import { ServicePricePerClientTypeService } from './../../../service-price-per-client-type/API_Services/service-price-per-client-type.service';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/Modules/note/services/note.service';
import { ServicesService } from 'src/Modules/service/services/services.service';
import { OrderDetail } from '../../interfaces/IorderDetail';
import { OrderTransaction } from '../../interfaces/IorderTransaction';
import { OrderService } from '../../services/orders.service';
import { Service } from 'src/Modules/service/interfaces/Iservice';
import { Note } from 'src/Modules/note/interfaces/Inote';
import { Client } from 'src/Modules/client/interFaces/Iclient';
import { ClientType } from 'src/Modules/clientType/interFaces/IclientType';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { ClientService } from 'src/Modules/client/services/client.service';
import { Status } from '../../Enums/status';
import { MatSelect } from '@angular/material/select';
import { Order } from '../../interfaces/Iorder';
@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy, AfterViewInit {
	private _clientTypeId: number = -1;
	@ViewChild('matNoteId') matNoteId!: MatSelect;
	@ViewChild('matServiceId') matServiceId!: MatSelect;
	@ViewChild('clientType') clientTypeElement!: ElementRef;
	availableStatus: Status[] = [Status.استلم, Status.حجز, Status.مرتجع];
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	orderToBeUpdated!: Order;
	controllerName: string = 'orders';
	isSubmitted: boolean = false;
	DetailsDataSource: OrderDetail[] = [];
	TransactionsDataSource: OrderTransaction[] = [];
	ServicesDataSource: Service[] = [];
	NotesDataSource: Note[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	disableMode: boolean = false;
	key = 0;
	prices: {key: number; value: number}[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _service: ServicesService,
		private _note: NoteService,
		private _order: OrderService,
		private fb: FormBuilder,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private alertService: AlertServiceService,
		private servicePriceService: ServicePricePerClientTypeService, 
		private translate: TranslateService
	) {
		this.Form = this.createFormItem('init');
	}
	ngAfterViewInit(): void {}
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
			return this.alertService.onError('Please choose a client type first.', 'Error');
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
				error: (err) => this.alertService.onError(err.message, this.translate.instant('error.cantLoadPrices')),
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
					priceInput?.setValue(element.value * +qty);
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
					this.alertService.onError(e.message, this.translate.instant('cantLoadData'));
				},
			})
		);
	}
	getAllClientsByType(data: any) {
		this._clientTypeId = data.value;
		console.log(data.value, this._clientTypeId);
		if (!this._clientTypeId) return;
		this.subscriptions.push(
			this._client.getAllByType(data.value).subscribe({
				next: (data) => {
					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.alertService.onError(e.message, this.translate.instant('cantLoadData'));
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
					this.alertService.onError(e.message, this.translate.instant('cantLoadData'));
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
					this.alertService.onError(e.message, this.translate.instant('cantLoadData'));
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
					id: [0],
					price: [{value: null}],
					quantity: [1, [Validators.required]],
					serviceId: [null],
					noteId: [null],
					orderStatus: [Status.استلم, [Validators.required]],
				});
				break;
		}
		return formItem;
	}
	get clientId(): FormArray {
		return this.Form.get('clientId') as FormArray;
	}

	computeDiscountPercent(): number {
		const discountAmount = this.Form.get('discount');
		const discountPercent = this.Form.get('discountPercent');
		const totalPrice = +this.Form.get('totalPrice')?.value;
		let percent = ((discountAmount?.value / totalPrice) * 100).toFixed(2).toString();
		discountPercent?.setValue(percent);
		this.computeFinalPrice(+discountAmount?.value);
		return +percent;
	}
	computeDiscountValue(): number {
		let discountAmount = this.Form.get('discount');
		let discountPercent = this.Form.get('discountPercent');
		const totalPrice = +this.Form.get('totalPrice')?.value;
		let value = ((discountPercent?.value / 100) * totalPrice).toFixed(2).toString();
		discountAmount?.setValue(value);
		this.computeFinalPrice(+value);
		return +value;
	}
	private clearPriceAndQuantityInput(index: number) {
		this.OrderDetails.controls[index].get('price')?.setValue(null);
		this.OrderDetails.controls[index].get('quantity')?.setValue('1');
	}
	private computeFinalPrice(discountValue: number) {
		const finalPriceControl = this.Form.get('finalPrice');
		const totalPrice = +this.Form.get('totalPrice')?.value;

		finalPriceControl?.setValue(totalPrice - discountValue);
		this.computeRest();
	}
	computeRest() {
		const restControl = this.Form.get('rest');
		const paid = +this.Form.get('paid')?.value;
		const finalPrice = +this.Form.get('finalPrice')?.value;
		restControl?.setValue(finalPrice - paid);
	}
	private computeTotalPrice() {
		let totalPrice = 0;
		const totalPriceControl = this.Form.get('totalPrice');
		this.OrderDetails.controls.forEach((element) => {
			if (+element.get('price')?.value) {
				totalPrice = totalPrice + +element.get('price')?.value;
			}
		});
		totalPriceControl?.setValue(totalPrice);
	}
	fillFormWithData(datasource: Order) {
		this.orderToBeUpdated = datasource;
		datasource.orderDetails.forEach(() => this.handleNewDetail());
		this.Form.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.Form.get('orderDetails') as FormArray;
	}
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => this.fillFormWithData(data)));
	back = () => this.router.navigate([this.controllerName]);
	handleNewDetail = () => {
		this.OrderDetails.push(this.createFormItem('detail'));
		if (this.id) this.disableAllControls();
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
				priceInput?.setValue(price * +qty);
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
	private disableAllControls() {
		this.disableMode = true;
		this.Form.disable();
		if (this.OrderDetails.value) {
			this.OrderDetails.controls.forEach((control) => {
				control.disable();
			});
			this.OrderDetails.controls.find((control) => {
				if (control.get('orderStatus')?.enable()) return;
			});
		}
	}
	private validateDiscountAmountAndPercent() {
		const discountValue = this.computeDiscountValue();
		const discountPercent = this.computeDiscountPercent();
		const finalPrice = +this.Form.get('finalPrice')?.value;
		const totalPrice = +this.Form.get('totalPrice')?.value;
		const isDiscountPercentEqualsDiscountValue = discountValue + finalPrice === (discountPercent / 100) * totalPrice + finalPrice ? true : false;
		if (!isDiscountPercentEqualsDiscountValue) {
			this.alertService.onError('discount amount not equals to discount percent', 'ERROR');
			this.Form.setErrors({invalid: true});
		}
	}
	private setUpdatedOrder(): void {
		this.orderToBeUpdated.orderDetails.forEach((orderDetail) => {
			this.OrderDetails.controls.forEach((control) => {
				let id = control.get('id')?.value;
				if (orderDetail.id === id) orderDetail.orderStatus = control.get('orderStatus')?.value;
			});
		});
	}
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id) {
				this.setUpdatedOrder();
				this.subscriptions.push(
					this._order.updateStatus(this.orderToBeUpdated).subscribe(
						() => {
							this.isSubmitted = true;
							this.back();
						},
						(err) => {
							console.log(err);
							this.alertService.onError(err.error.Message, 'ERROR');
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
							this.alertService.onError(err.error.Message, 'ERROR');
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
