import { Response } from 'src/Modules/shared/interfaces/Iresponse';
import { TranslateService } from '@ngx-translate/core';
import { AlertServiceService } from './../../../shared/services/alert-service.service';
import { ServicePricePerClientTypeService } from '../../../service-price-per-client-type/services/service-price-per-client-type.service';
import { Component, OnDestroy, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, map, catchError, of } from 'rxjs';
import { NoteService } from 'src/Modules/note/services/note.service';
import { ServicesService } from 'src/Modules/service/services/services.service';
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
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'app-order-form-dialog',
	templateUrl: './order-form-dialog.component.html',
	styleUrls: ['./order-form-dialog.component.css'],
})
export class OrderFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy, AfterViewInit {
	private _clientTypeId: number = -1;
	@ViewChild('matNoteId') matNoteId!: MatSelect;
	@ViewChild('matServiceId') matServiceId!: MatSelect;
	@ViewChild('clientType') clientTypeElement!: ElementRef;
	availableStatus: Status[] = [Status.استلم, Status.حجز, Status.مرتجع];
	Form: FormGroup;
	isLoading = false;
	orderToBeUpdated!: Order;
	ServicesDataSource: Service[] = [];
	NotesDataSource: Note[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	disableMode: boolean = false;
	key = 0;
	prices: { key: number; value: number }[] = [];
	constructor(
		private _service: ServicesService,
		private _note: NoteService,
		private _order: OrderService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private servicePriceService: ServicePricePerClientTypeService,
		private fb: FormBuilder,
		private alertService: AlertServiceService,
		private translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Order,
		private matDialogRef: MatDialogRef<OrderFormDialogComponent>,
		private dialogService: DialogServiceService,
		public override toastr: ToastrService
	) {
		super(matDialogRef, dialogService, translate, _order, toastr);
		this.Form = this.createFormItem('init');
	}
	ngAfterViewInit(): void { }
	ngOnInit(): void {
		this.forkJoins();
		if (this.data) this.getSingle(this.data.id);
		this.computeDiscountPercent()
		this.computeRest()
	}

	private forkJoins() {
		let services = [this._note.getAll(), this._clientType.getAll(), this._service.getAll()];
		return forkJoin(services)
			.pipe(
				catchError((err) => of(err)),
				map(([notesResponse, clientTypeResponse, serviceResponse]) => {
					return {
						notes: notesResponse,
						clientsType: clientTypeResponse,
						services: serviceResponse,
					};
				})
			)
			.subscribe((response) => {
				this.NotesDataSource = response.notes.body;
				this.ServicesDataSource = response.services.body;
				this.ClientTypesDataSource = response.clientsType.body;
			});
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
		this.onServiceValueChanged(index);
		return this.subscriptions.push(
			this.servicePriceService.getPrice(this._clientTypeId, serviceTypeId).subscribe({
				next: (res: Response) => {
					this.prices?.forEach((element) => {

						if (element.key === index) {
							element.value = +res.body.price;
						}
						this.getQuantityAndUpdatePriceInputForService(index);
						this.computeTotalPrice();
						this.computeFinalPrice();
					});
				},
				// error: (err) => this.alertService.onError(err.message, this.translate.instant('error.cantLoadPrices')),
				error: (e) => {
					// this.loading = false;
					let res: Response = e.error ?? e;
					this.alertService.onError(res.message, '');
				},
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
					this.OrderDetails.controls[index].get('quantity')?.valueChanges.subscribe(value => {
						let priceInput = this.OrderDetails.controls[index].get('price');
						priceInput?.setValue(element.value * value);
						this.computeTotalPrice();
						this.computeFinalPrice();
					});
				}
			});
		}

	}

	getAllClientsByType(data: any) {
		this._clientTypeId = data.value;
		if (!this._clientTypeId) return;
		this.subscriptions.push(
			this._client.getAllByType(data.value).subscribe({
				next: (data) => {
					this.ClientsDataSource = data.body;
				},
				// error: (e) => {
				// 	this.alertService.onError(e.message, this.translate.instant('error.cantLoadData'));
				// },
				error: (e) => {
					// this.loading = false;
					let res: Response = e.error ?? e;
					this.alertService.onError(res.message, '');
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
					discount: [0],
					discountPercent: [0],
					rest: [{ value: null }, [Validators.required]],
					paid: [null, [Validators.required]],
					clientId: [null, [Validators.required]],
					orderDetails: this.fb.array([]),
					remarks: [null],
				});
				break;
			case 'detail':
				formItem = this.fb.group({
					id: [0],
					price: [null],
					quantity: [0, [Validators.required]],
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
	computeDiscountPercent() {
		const discountControl = this.Form.get('discount');
		discountControl?.valueChanges.subscribe(value => {
			const totalPrice = +this.Form.get('totalPrice')?.value;
			const percent = +((+value / totalPrice) * 100).toFixed(2);
			this.Form.get('discountPercent')?.setValue(percent);
			this.computeFinalPrice();
		})

	}
	computeDiscountValue() {
		let discountAmount = this.Form.get('discount');
		this.Form.get('discountPercent')?.valueChanges.subscribe(value => {
			const totalPrice = +this.Form.get('totalPrice')?.value;
			const discountValue = ((value / 100) * totalPrice).toFixed(2).toString();
			discountAmount?.setValue(discountValue);
			this.computeFinalPrice();
		});
	}
	private clearPriceAndQuantityInput(index: number) {
		this.OrderDetails.controls[index].get('price')?.setValue(null);
		this.OrderDetails.controls[index].get('quantity')?.setValue('1');
	}
	private computeFinalPrice() {
		const finalPriceControl = this.Form.get('finalPrice');
		const restControl = this.Form.get('rest');
		const totalPrice = +this.Form.get('totalPrice')?.value;
		const discountValue = +this.Form.get('discount')?.value;
		const paidValue = +this.Form.get('paid')?.value;
		finalPriceControl?.setValue(totalPrice - discountValue);
		restControl?.setValue(+finalPriceControl?.value - +paidValue);
	}
	computeRest() {
		this.Form.get('paid')?.valueChanges.subscribe(value => {
			const restControl = this.Form.get('rest');
			const finalPrice = +this.Form.get('finalPrice')?.value;
			restControl?.setValue(finalPrice - +value);
		})
	}
	private computeTotalPrice() {
		let totalPrice = 0;
		const totalPriceControl = this.Form.get('totalPrice');
		totalPriceControl?.valueChanges.subscribe(value => {
			const discountControlValue = this.Form.get('discount')?.value
			const percent = +((+discountControlValue / +value) * 100).toFixed(2);
			this.Form.get('discountPercent')?.setValue(percent);
		})
		this.OrderDetails.controls.forEach((element) => {
			if (+element.get('price')?.value) {
				totalPrice = totalPrice + +element.get('price')?.value;
			}
		});
		totalPriceControl?.setValue(totalPrice);
	}
	fillFormWithData(datasource: Order) {
		datasource.orderDetails.forEach(() => this.handleNewDetail());
		this.Form.patchValue(datasource);
	}
	get OrderDetails(): FormArray {
		return this.Form.get('orderDetails') as FormArray;
	}
	getSingle = (id: number) => {
		this.isLoading = true;
		this.subscriptions.push(
			this._order.GetById(id).subscribe((data) => {
				this.orderToBeUpdated = data.body;
				this.fillFormWithData(data.body);
				this.isLoading = false;
			})
		);
	};

	handleNewDetail = () => {
		this.OrderDetails.push(this.createFormItem('detail'));
		if (this.data) this.disableAllControls();
		this.key = this.OrderDetails.controls.length - 1;
		this.prices.push({ key: this.key, value: -1 });
		this.key++;
	};
	handleDeleteDetail = (index: number) => {
		this.OrderDetails.removeAt(index);
		this.deleteSelectedElementFromMappedObject(index);
		this.computeTotalPrice()
		this.computeFinalPrice()
	};
	private deleteSelectedElementFromMappedObject(index: number) {
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
			this.computeFinalPrice();
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
	enableAndDisableDDL(index: number, matSelect: MatSelect) {
		let serviceMaterial = this.OrderDetails.controls[index].get('serviceId');
		let noteMaterial = this.OrderDetails.controls[index].get('noteId');
		if (serviceMaterial?.disabled) {
			serviceMaterial?.enable();
			noteMaterial?.disable();
			noteMaterial?.reset();
			matSelect.close();
			this.clearPriceAndQuantityInput(index);
		} else {
			noteMaterial?.enable();
			serviceMaterial?.disable();
			serviceMaterial?.reset();
			matSelect.close();
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
		const discountValue = 0;
		const discountPercent = 0;
		const finalPrice = +this.Form.get('finalPrice')?.value;
		const totalPrice = +this.Form.get('totalPrice')?.value;
		const isDiscountPercentEqualsDiscountValue = discountValue + finalPrice === (discountPercent / 100) * totalPrice + finalPrice ? true : false;
		if (!isDiscountPercentEqualsDiscountValue) {
			this.alertService.onError('discount amount not equals to discount percent', '');
			this.Form.setErrors({ invalid: true });
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
			if (this.data) {
				this.setUpdatedOrder();
				this.subscriptions.push(
					this._order.updateStatus(this.orderToBeUpdated).subscribe({
						next: (res) => {
							this._order.dialogData = res.body;
							this.dRef.close({ data: res });
						},
						error: (e) => {
							this.isSubmitted = false;
							let res: Response = e.error ?? e;
							this.toastr.error(res.message);
						},
						complete: () => {
							this.isSubmitted = false
						}
					})
				);
			} else {
				this.validateDiscountAmountAndPercent();
				console.log(this.Form.value)
				this.add(this.Form.value)
			}
		}
	}

}
