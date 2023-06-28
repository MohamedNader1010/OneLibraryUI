import { TranslateService } from "@ngx-translate/core";
import { ServicePricePerClientTypeService } from "../../../service-price-per-client-type/services/service-price-per-client-type.service";
import { Component, OnDestroy, OnInit, Inject } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { forkJoin, map, catchError, of, startWith, BehaviorSubject } from "rxjs";
import { NoteService } from "src/Modules/note/services/note.service";
import { ServicesService } from "src/Modules/service/services/services.service";
import { OrderService } from "../../services/orders.service";
import { Service } from "src/Modules/service/interfaces/Iservice";
import { Note } from "src/Modules/note/interfaces/Inote";
import { Client } from "src/Modules/client/interFaces/Iclient";
import { ClientType } from "src/Modules/clientType/interFaces/IclientType";
import { ClientTypeService } from "src/Modules/clientType/services/clientType.service";
import { ClientService } from "src/Modules/client/services/client.service";
import { Status } from "../../Enums/status";
import { Order } from "../../interfaces/Iorder";
import { Response } from "./../../../shared/interfaces/Iresponse";
import { FormsDialogCommonFunctionality } from "src/Modules/shared/classes/FormsDialog";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { OrderDetail } from "../../interfaces/IorderDetail";
import { FormHelpers } from "src/Modules/shared/classes/form-helpers";
import { FormDialogNames } from "src/Persistents/enums/forms-name";
import { validateQuantityAsync } from "../validators/customValidator";

@Component({
	selector: "app-order-form-dialog",
	templateUrl: "./order-form-dialog.component.html",
	styleUrls: ["./order-form-dialog.component.css"],
})
export class OrderFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	availableStatus: Status[] = [Status.استلم, Status.حجز, Status.اعداد, Status.جاهز, Status.مرتجع, Status.هالك];
	StatusInstance: any = Status;
	ServicesDataSource: Service[] = [];
	NotesDataSource: Note[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	clearAutocomplete: BehaviorSubject<number> = new BehaviorSubject(0);
	selectedClientId!: number;
	constructor(
		private _service: ServicesService,
		private _note: NoteService,
		private _order: OrderService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private fb: FormBuilder,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Order,
		matDialogRef: MatDialogRef<OrderFormDialogComponent>,
		private _servicePrice: ServicePricePerClientTypeService,
		public dialog: MatDialog,
		public override toastr: ToastrService, // Status: Status
	) {
		super(matDialogRef, translate, _order, toastr);
		this.Form = this.createFormItem("init");
	}
	get clientId(): FormControl {
		return this.Form.get("clientId") as FormControl;
	}
	get clientTypeId(): FormControl {
		return this.Form.get("clientTypeId") as FormControl;
	}
	get OrderDetails(): FormArray {
		return this.Form.get("orderDetails") as FormArray;
	}
	get totalPrice(): FormControl {
		return this.Form.get("totalPrice") as FormControl;
	}
	get finalPrice(): FormControl {
		return this.Form.get("finalPrice") as FormControl;
	}
	get rest(): FormControl {
		return this.Form.get("rest") as FormControl;
	}
	get paid(): FormControl {
		return this.Form.get("paid") as FormControl;
	}
	get discount(): FormControl {
		return this.Form.get("discount") as FormControl;
	}
	get discountPercent(): FormControl {
		return this.Form.get("discountPercent") as FormControl;
	}

	getOrderDetailId = (index: number): FormControl => this.OrderDetails.at(index).get("id") as FormControl;
	getNoteOrService = (index: number): FormControl => this.OrderDetails.at(index)?.get("noteOrService") as FormControl;
	getOrderDetailServiceId = (index: number): FormControl => this.OrderDetails.at(index).get("serviceId") as FormControl;
	getOrderDetailService = (index: number): FormControl => this.OrderDetails.at(index).get("service") as FormControl;
	getOrderDetailNoteId = (index: number): FormControl => this.OrderDetails.at(index).get("noteId") as FormControl;
	getOrderDetailNote = (index: number): FormControl => this.OrderDetails.at(index).get("note") as FormControl;
	getOrderDetailQuantity = (index: number): FormControl => this.OrderDetails.at(index).get("quantity") as FormControl;
	getOrderDetailPrice = (index: number): FormControl => this.OrderDetails.at(index).get("price") as FormControl;
	getOrderDetailStatus = (index: number): FormControl => this.OrderDetails.at(index).get("orderStatus") as FormControl;
	getServiceId = (index: number): FormControl => this.OrderDetails.at(index).get("serviceId") as FormControl;
	getNoteId = (index: number): FormControl => this.OrderDetails.at(index).get("noteId") as FormControl;
	getCountControl = (index: number): FormControl => this.OrderDetails.at(index).get("counts") as FormControl;
	getCopiesControl = (index: number): FormControl => this.OrderDetails.at(index).get("copies") as FormControl;
	getQuantityControl = (index: number): FormControl => this.OrderDetails.at(index).get("quantity") as FormControl;

	setClientTypeId = (data: any) => this.clientTypeId.setValue(data);
	setServiceId = (index: number, data: any) => this.OrderDetails.at(index).get("serviceId")?.setValue(data);

	setNoteId = (index: number, data: any) => this.OrderDetails.at(index).get("noteId")?.setValue(data);

	async setClientId(data: any) {
		if (data === -1) {
			await this.HandleNewClient();
		} else this.clientId.setValue(data);
	}

	ngOnInit(): void {
		this.matDialogRef.disableClose = true;
		if (!this.data) this.forkJoins();
		else {
			this.patchData();
			this.subscribeOrderStatusChanges();
		}
	}

	getAvailableStatus(i: number): Status[] {
		if (this.data) return this.availableStatus.filter((s) => s >= this.getOrderDetailStatus(i).value);
		else return [Status.حجز, Status.استلم];
	}

	forkJoins() {
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
				}),
			)
			.subscribe({
				next: (response) => {
					this.NotesDataSource = response.notes.body;
					this.ServicesDataSource = response.services.body;
					this.ClientTypesDataSource = response.clientsType.body;
				},
				complete: () => {
					this.subscribeClientTypeChange();
					this.subscribeFormMoneyChanges();
				},
			});
	}

	subscribeFormMoneyChanges() {
		this.Form.valueChanges.subscribe((changes) => {
			const discount = changes.discount;
			const discountPercent = changes.discountPercent;
			const totalPrice = changes.totalPrice;
			const paid = changes.paid;
			if (discount !== null) {
				const newPrice = totalPrice - discount;
				const newDiscountPercent = discount == 0 ? 0 : +((discount / totalPrice) * 100).toFixed(2);
				this.Form.patchValue(
					{
						finalPrice: newPrice,
						discountPercent: newDiscountPercent,
						rest: newPrice - this.paid.value,
					},
					{ emitEvent: false },
				);
			} else if (discountPercent !== null) {
				const newDiscount = (discountPercent / 100) * totalPrice;
				const newPrice = totalPrice - newDiscount;
				this.Form.patchValue(
					{
						finalPrice: newPrice,
						discount: newDiscount,
						rest: newPrice - this.paid.value,
					},
					{ emitEvent: false },
				);
			} else if (totalPrice !== null) {
				const newDiscountPercent = totalPrice - discount == 0 ? 0 : +(((totalPrice - discount) / totalPrice) * 100).toFixed(2);
				this.Form.patchValue({ discountPercent: newDiscountPercent }, { emitEvent: false });
			} else if (paid !== null) {
				this.rest.setValue(+this.finalPrice.value - paid, { emitEvent: false });
			}
		});
	}

	patchData = () => {
		this.data.orderDetails.forEach((orderDetail: OrderDetail) => {
			let index = this.data.orderDetails.indexOf(orderDetail);
			this.OrderDetails.push(this.createFormItem("detail"));
			this.getNoteOrService(index).setValue(orderDetail.noteId ? "note" : "service");
		});
		this.Form.patchValue(this.data);
	};

	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case "init":
				formItem = this.fb.group({
					id: [0],
					totalPrice: [0],
					finalPrice: [0],
					discount: [0, [Validators.min(0)]],
					discountPercent: [0, [Validators.min(0)]],
					rest: [0, [Validators.required, Validators.min(0)]],
					paid: [0, [Validators.required, Validators.min(0)]],
					clientId: [null, [Validators.required]],
					clientTypeId: [null],
					orderDetails: this.fb.array([]),
					remarks: [null],
				});
				break;
			case "detail":
				formItem = this.fb.group({
					id: [0],
					noteOrService: ["service"],
					price: [0],
					quantity: [0, [Validators.required], [validateQuantityAsync]],
					serviceId: [null],
					service: [""],
					noteId: [null],
					note: [""],
					availableNoteQuantity: [""], // this is hidden control. ==> you can read auto complete to see why this is needed here.
					orderStatus: [null, [Validators.required]],
					counts: [0, [Validators.min(0)]],
					copies: [0, [Validators.min(0)]],
				});
				break;
		}
		return formItem;
	}

	handleNewDetail = () => {
		let index = this.OrderDetails.length;
		this.OrderDetails.push(this.createFormItem("detail"));
		this.subscribeQuantityChanges(index);
		this.subscribeServiceChanges(index);
		this.subscribeNoteChanges(index);
		this.subscribeCopiesChanges(index);
		this.subscribeCountChanges(index);
		this.subscribeOrderStatusChangesByiIndex(index);
	};

	handleDeleteDetail = (index: number) => {
		this.OrderDetails.removeAt(index);
		if (this.OrderDetails.length) {
			this.calculateTotalPrice();
		} else this.ResetcalculateTotal_Final_Rest();
	};

	private subscribeOrderStatusChangesByiIndex(index: number) {
		this.subscriptions.push(
			this.getOrderDetailStatus(index).valueChanges.subscribe((status) => {
				if (status == Status.استلم) {
					const noteId = this.getNoteId(index).value;
					const qty = this.NotesDataSource.find((note) => note.id == noteId)?.quantity;
					this.setAvailableQuantity(index, qty ?? 0);
				} else {
					this.getQuantityControl(index).updateValueAndValidity();
				}
			}),
		);
	}
	private subscribeOrderStatusChanges() {
		this.OrderDetails.controls.forEach((od, index) => {
			od.get("orderStatus")?.valueChanges.subscribe((_) => {
				const noteId = od.get("noteId")?.value;
				this._note.GetById(noteId).subscribe((n) => {
					this.setAvailableQuantity(index, n.body.quantity ?? 0);
				});
			});
		});
	}

	subscribeQuantityChanges(index: number) {
		this.subscriptions.push(
			this.getOrderDetailQuantity(index).valueChanges.subscribe(() => {
				this.calculateTotalPrice();
			}),
		);
	}
	subscribeCountChanges(index: number) {
		this.subscriptions.push(
			this.getCountControl(index).valueChanges.subscribe((countValue) => {
				const quantityValue = +this.getCopiesControl(index).value * countValue;
				this.getOrderDetailQuantity(index).setValue(quantityValue);
			}),
		);
	}
	subscribeCopiesChanges(index: number) {
		this.subscriptions.push(
			this.getCopiesControl(index).valueChanges.subscribe((copiesValue) => {
				const quantityValue = +this.getCountControl(index).value * copiesValue;
				this.getOrderDetailQuantity(index).setValue(quantityValue);
			}),
		);
	}
	subscribeServiceChanges(index: number) {
		this.subscriptions.push(
			this.getOrderDetailServiceId(index).valueChanges.subscribe({
				next: () => this.setServicePriceForClientType(index),
			}),
		);
	}
	setServicePriceForClientType(index: number) {
		this.subscriptions.push(
			this._servicePrice.getPrice(this.clientTypeId.value, this.getOrderDetailServiceId(index).value).subscribe({
				next: (res) => {
					if (!res.body) {
						this.toastr.error("هذه الخدمة غير مسعرة");
						this.getOrderDetailPrice(index).setValue(0);
						return;
					}
					this.getOrderDetailPrice(index).setValue(res.body.price);
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					// this.toastr.error(res.message);
					this.getOrderDetailPrice(index).setValue(0);
				},
				complete: () => {
					this.calculateTotalPrice();
				},
			}),
		);
	}

	subscribeClientTypeChange() {
		this.subscriptions.push(
			this.clientTypeId.valueChanges.pipe(startWith(null)).subscribe((id) => {
				if (id === null || id === undefined) return;
				this.subscriptions.push(
					this._client.getAllByType(id).subscribe({
						next: (data) => {
							let newClient: Client = {
								id: -1,
								name: "أضافة عميل جديد",
								phoneNumber: "",
								clientType: "",
								clientTypeId: -1,
								paid: "",
								rest: "",
								total: "",
							};
							this.ClientsDataSource = [newClient, ...data.body];
							this.clearAutocomplete.next(1);
						},
						error: (e) => {
							this.ClientsDataSource = [];
							this.isSubmitting = false;
							let res: Response = e.error ?? e;
							this.toastr.error(res.message);
						},
						complete: () => {
							this.reloadServicesPrices();
							this.calculateTotalPrice();
						},
					}),
				);
			}),
		);
	}

	async HandleNewClient() {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.ClientFormDialogComponent);
		const dialogRef = this.dialog.open<any>(dialogComponent, {
			minWidth: "30%",
		});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) {
						let newClient: Client = result.data.body;
						this.clearAutocomplete.next(1);
						if (this.clientTypeId.value === newClient.clientTypeId) {
							this.ClientsDataSource.push(newClient);
							this.selectedClientId = newClient.id;
							this.clientId.setValue(this.selectedClientId);
						}
					}
				},
			}),
		);
	}

	reloadServicesPrices() {
		for (let index = 0; index < this.OrderDetails.controls.length; index++) {
			if (this.getNoteOrService(index).value === "note") continue;
			else this.setServicePriceForClientType(index);
		}
	}

	subscribeNoteChanges(index: number) {
		this.subscriptions.push(
			this.getOrderDetailNoteId(index).valueChanges.subscribe({
				next: (id) => {
					let notePrice = this.NotesDataSource.find((note) => note.id == id)?.finalPrice ?? 0;
					this.getOrderDetailPrice(index).setValue(notePrice);
					this.calculateTotalPrice();
					const qty = this.NotesDataSource.find((note) => note.id == id)?.quantity;
					this.setAvailableQuantity(index, qty ?? 0);
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
					this.getOrderDetailPrice(index).setValue(0);
				},
			}),
		);
	}

	isServiceSelected(index: number): boolean {
		return this.getNoteOrService(index).value == "service";
	}
	calculateTotalPrice() {
		let total = 0;
		for (let index = 0; index < this.OrderDetails.controls.length; index++) {
			total += +this.getOrderDetailPrice(index).value * +this.getOrderDetailQuantity(index).value;
		}
		this.totalPrice.setValue(total);
	}

	ResetcalculateTotal_Final_Rest() {
		this.totalPrice.setValue(0);
		this.finalPrice.setValue(0);
		this.discount.setValue(0);
		this.discountPercent.setValue(0);
	}

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.data) {
				this.subscriptions.push(
					this._order.updateOrderDetailsStatus(this.Form.value).subscribe({
						next: (res) => {
							this._order.dialogData = res.body;
							this.matDialogRef.close({ data: res });
						},
						error: (e) => {
							this.isSubmitting = false;
							let res: Response = e.error ?? e;
							this.toastr.error(res.message);
						},
						complete: () => {
							this.isSubmitting = false;
						},
					}),
				);
			} else {
				this.add(this.Form.value);
			}
		}
	}

	private setAvailableQuantity(index: number, availableQty: number) {
		const noteId = this.getNoteId(index).value;
		if (noteId) {
			const availableQtyControl = this.OrderDetails.at(index).get("availableNoteQuantity");
			availableQtyControl?.setValue(availableQty);
			this.getQuantityControl(index).updateValueAndValidity();
		}
	}
}
