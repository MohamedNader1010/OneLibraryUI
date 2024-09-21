import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, startWith, filter, switchMap, tap, combineLatest } from 'rxjs';
import { validateArrayLingth, validateQuantityAsync } from '../../validators/customValidator';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { ClientForForm } from '../../../../core/data/models/client/IClientForForm';
import { NoteOnly } from '../../../../core/data/models/note/Inote-only';
import { Order } from '../../../../core/data/models/order/Iorder';
import { OrderDetail } from '../../../../core/data/models/order/IorderDetail';
import { PricedServices } from '../../../../core/data/models/service/IPricedServices';
import { ClientTypeService } from '../../../../core/data/services/client-type.service';
import { NoteService } from '../../../../core/data/services/note.service';
import { OrderService } from '../../../../core/data/services/orders.service';
import { ServicePricePerClientTypeService } from '../../../../core/data/services/service-price-per-client-type.service';
import { FormFactory } from '../../../../shared/classes/form.factory';
import { FormDialogNames } from '../../../../shared/enums/forms-name.enum';
import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.css'],
})
export class OrderFormDialogComponent extends BaseForm implements OnInit {
  availableStatus: OrderDetailStatus[] = [OrderDetailStatus.استلم, OrderDetailStatus.حجز, OrderDetailStatus.جاهز, OrderDetailStatus.مرتجع, OrderDetailStatus.هالك];
  newOrderAvailableStatus: OrderDetailStatus[] = [OrderDetailStatus.استلم, OrderDetailStatus.حجز, OrderDetailStatus.جاهز];
  StatusInstance: any = OrderDetailStatus;
  ServicePricesForClientTypesDataSource: PricedServices[] = [];
  NotesDataSource: NoteOnly[] = [];
  ClientsDataSource: ClientForForm[] = [];
  ClientTypesDataSource: ClientType[] = [];
  clientsDisable: boolean = false;
  serviceLoading: boolean = false;
  notesLoading: boolean = false;
  clientTypeLoading = false;

  constructor(
    override matDialogRef: MatDialogRef<OrderFormDialogComponent>,
    private _databaseService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private _noteService: NoteService,
    private _clientTypeService: ClientTypeService,
    private _servicePricePerClientTypeService: ServicePricePerClientTypeService,
    public dialog: MatDialog,
  ) {
    super();
    this.Form = this.createFormItem('init');
  }

  get clientId(): FormControl {
    return this.Form.get('clientId') as FormControl;
  }
  get clientTypeId(): FormControl {
    return this.Form.get('clientTypeId') as FormControl;
  }
  get OrderDetails(): FormArray {
    return this.Form.get('orderDetails') as FormArray;
  }
  get totalPrice(): FormControl {
    return this.Form.get('totalPrice') as FormControl;
  }
  get finalPrice(): FormControl {
    return this.Form.get('finalPrice') as FormControl;
  }
  get rest(): FormControl {
    return this.Form.get('rest') as FormControl;
  }
  get paid(): FormControl {
    return this.Form.get('paid') as FormControl;
  }
  get discount(): FormControl {
    return this.Form.get('discount') as FormControl;
  }
  get discountPercent(): FormControl {
    return this.Form.get('discountPercent') as FormControl;
  }
  getOrderDetailId = (index: number): FormControl => this.OrderDetails.at(index).get('id') as FormControl;
  getNoteOrService = (index: number): FormControl => this.OrderDetails.at(index)?.get('noteOrService') as FormControl;
  getOrderDetailServiceId = (index: number): FormControl => this.OrderDetails.at(index).get('serviceId') as FormControl;
  getOrderDetailService = (index: number): FormControl => this.OrderDetails.at(index).get('service') as FormControl;
  getOrderDetailNoteId = (index: number): FormControl => this.OrderDetails.at(index).get('noteId') as FormControl;
  getOrderDetailNote = (index: number): FormControl => this.OrderDetails.at(index).get('note') as FormControl;
  getOrderDetailNoteAvailableQuantity = (index: number): FormControl => this.OrderDetails.at(index).get('availableNoteQuantity') as FormControl;
  getOrderDetailQuantity = (index: number): FormControl => this.OrderDetails.at(index).get('quantity') as FormControl;
  getOrderDetailPrice = (index: number): FormControl => this.OrderDetails.at(index).get('price') as FormControl;
  getOrderDetailStatus = (index: number): FormControl => this.OrderDetails.at(index).get('status') as FormControl;
  getOrderDetailServiceCount = (index: number): FormControl => this.OrderDetails.at(index).get('counts') as FormControl;
  getOrderDetailServiceCopies = (index: number): FormControl => this.OrderDetails.at(index).get('copies') as FormControl;
  getServicePriceForClientTypeId = (index: number) => {
    let servicePricePerClientType = this.ServicePricesForClientTypesDataSource.find(
      (sp) => sp.serviceId === this.getOrderDetailServiceId(index).value && sp.clientTypeId === this.clientTypeId.value,
    )?.id;
    return servicePricePerClientType;
  };
  getOrderDetailFilePath = (index: number) => {
    let filePath: any;
    if (this.data?.orderDetails) {
      filePath = this.data.orderDetails[index].filePath;
    } else {
      let noteId = this.getOrderDetailNoteId(index).value;
      filePath = this.NotesDataSource.find((note) => note.id == noteId)?.filePath;
    }
    return filePath;
  };
  getAvailableStatus(index: number): OrderDetailStatus[] {
    if (this.data) {
      const oldStatus = this.data.orderDetails.find((od) => od.id === this.getOrderDetailId(index).value)?.status ?? OrderDetailStatus.حجز;
      return this.data ? this.availableStatus.filter((s) => s >= oldStatus) : this.availableStatus;
    } else return this.newOrderAvailableStatus;
  }
  getNoteById = (id: number) => this.NotesDataSource.find((note) => note.id == id);
  getReservationRequired = (index: number): FormControl => this.OrderDetails.at(index).get('reservationRequired') as FormControl;

  setClientTypeId = (data: any) => this.clientTypeId.setValue(data);
  setServiceIdFromServicePricePerClientType = (index: number, data: any) => {
    let serviceId = this.ServicePricesForClientTypesDataSource.find((sp) => sp.id === data)?.serviceId;
    this.getOrderDetailServiceId(index).setValue(serviceId);
  };
  setNoteId = (index: number, data: any) => this.OrderDetails.at(index).get('noteId')?.setValue(data);
  setClientId = async (data: any) => (data === -1 ? await this.HandleNewClient() : this.clientId.setValue(data));

  ngOnInit(): void {
    this.matDialogRef.disableClose = true;

    this._clientTypeService
      .getAll()
      .pipe(tap(() => (this.clientsDisable = this.clientTypeLoading = this.serviceLoading = true)))
      .subscribe({
        next: (response) => {
          this.ClientTypesDataSource = response.body;
        },
        complete: () => {
          this.clientsDisable = this.clientTypeLoading = this.serviceLoading = false;
          if (this.data) this.patchData();
          this.subscribeClientTypeChange();
          this.subscribeFormMoneyValueChanges();
        },
      });
  }

  patchData = () => {
    this._databaseService.GetById(this.data.id).subscribe((order) => {
      this.data = order.body;
      this.data.orderDetails.forEach((orderDetail: OrderDetail, index: number) => {
        this.OrderDetails.push(this.createFormItem('detail', orderDetail.status));
        this.getNoteOrService(index).setValue(orderDetail.noteId ? 'note' : 'service');
        if (orderDetail.noteId) {
          const availableNoteQuantity = this.getNoteById(orderDetail.noteId)?.quantity ?? 0;
          this.getOrderDetailNoteAvailableQuantity(index).setValue(availableNoteQuantity);
          this.subscribeOrderDetailStatusChanges(index);
        }
      });
      this.Form.patchValue(this.data);
    });
  };

  subscribeClientTypeChange() {
    this.clientTypeId.valueChanges
      .pipe(
        tap(() => (this.clientsDisable = this.serviceLoading = this.notesLoading = true)),
        startWith(this.clientTypeId.value),
        filter((id) => !!id),
      )
      .subscribe({
        next: () => {
          if (!this.data) this.clientId.setValue(null);
          this.clientsDisable = this.serviceLoading = this.notesLoading = false;

          this.OrderDetails.value.forEach((orderDetail: OrderDetail, index: number) => {
            if (this.getNoteOrService(index).value === 'service') this.setServicePriceForClientType(index);
          });
        },
        complete: () => this.calculateTotalPrice(),
      });
  }

  subscribeFormMoneyValueChanges(): void {
    const totalPrice$ = this.totalPrice.valueChanges;
    const discount$ = this.discount.valueChanges;
    const discountPercent$ = this.discountPercent.valueChanges;
    const paid$ = this.paid.valueChanges;

    discount$.subscribe((discount) => {
      const totalPriceValue = +(+this.totalPrice.value ?? 0).toFixed(2);
      const newDiscountPercent = totalPriceValue === 0 ? 0 : +((+discount / totalPriceValue) * 100).toFixed(2);
      this.discountPercent.setValue(newDiscountPercent.toString(), { emitEvent: false, onlySelf: true });
      this.updateFinalPriceAndRest();
    });

    discountPercent$.subscribe((discountPercent) => {
      const totalPriceValue = +(+this.totalPrice.value ?? 0).toFixed(2);
      const newDiscount = discountPercent === 0 ? +this.discount.value : +((+discountPercent / 100) * totalPriceValue).toFixed(2);
      this.discount.setValue(newDiscount.toString(), { emitEvent: false, onlySelf: true });
      this.updateFinalPriceAndRest();
    });

    combineLatest([totalPrice$, paid$]).subscribe(() => this.updateFinalPriceAndRest());
  }

  updateFinalPriceAndRest(): void {
    const finalPrice = +(this.totalPrice.value - this.discount.value).toFixed(2);
    const rest = (finalPrice - +this.paid.value).toFixed(2);

    this.Form.patchValue(
      {
        finalPrice: `${finalPrice}`,
        rest: rest.toString(),
        paid: this.paid.value.toString(),
      },
      { emitEvent: false, onlySelf: true },
    );
  }

  createFormItem(type: string, previousStatus: OrderDetailStatus | null = null): FormGroup {
    let formItem: FormGroup = this.fb.group({});
    switch (type) {
      case 'init':
        formItem = this.fb.group(
          {
            id: [null],
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
          },
          { validators: validateArrayLingth('orderDetails') },
        );
        break;
      case 'detail':
        formItem = this.fb.group({
          id: [null],
          noteOrService: ['service'],
          price: [0],
          quantity: [0, [Validators.required, Validators.min(0.01)], [validateQuantityAsync(previousStatus)]],
          serviceId: [null],
          service: [''],
          noteId: [null],
          note: [''],
          availableNoteQuantity: [0],
          status: [null, [Validators.required]],
          counts: [0],
          copies: [0],
          reservationRequired: [true],
        });
        break;
    }
    return formItem;
  }

  handleNewDetail = () => {
    let index = this.OrderDetails.length;
    this.OrderDetails.push(this.createFormItem('detail'));

    this.getOrderDetailQuantity(index).valueChanges.subscribe(() => this.calculateTotalPrice());

    this.getOrderDetailServiceId(index).valueChanges.subscribe(() => this.setServicePriceForClientType(index));

    this.subscribeOrderDetailNoteChanges(index);
    this.subscribeOrderDetailQuantityChanges(index);
    this.subscribeOrderDetailStatusChanges(index);
    this.subscribeNoteOrServiceChanges(index);

    this.subscribeServiceOrNoteValueChanges(index);
  };

  subscribeOrderDetailNoteChanges(index: number) {
    this.getOrderDetailNoteId(index).valueChanges.subscribe({
      next: (id) => {
        let note = this.getNoteById(id);
        let notePrice;
        if (note?.clientId == +this.clientId.value) notePrice = note?.finalPriceWithoutTeacherPrice;
        else notePrice = note?.finalPrice;
        notePrice = notePrice ?? 0;
        this.getOrderDetailNoteAvailableQuantity(index).setValue(this.getNoteById(id)?.quantity);
        this.getOrderDetailQuantity(index).updateValueAndValidity();
        this.getOrderDetailPrice(index).setValue(notePrice);
        this.calculateTotalPrice();
        this.getReservationRequired(index).setValue(note?.reservationRequired);
      },
      error: (e) => {
        this.isSubmitting = false;
        this.getOrderDetailPrice(index).setValue(0);
        this.getOrderDetailNoteAvailableQuantity(index).setValue(0);
        this.getOrderDetailQuantity(index).updateValueAndValidity();
        this.calculateTotalPrice();
      },
    });
  }

  subscribeOrderDetailQuantityChanges(index: number) {
    const countChanges$ = this.getOrderDetailServiceCount(index).valueChanges;
    const copiesChanges$ = this.getOrderDetailServiceCopies(index).valueChanges;
    combineLatest([countChanges$, copiesChanges$]).subscribe(([countValue, copiesValue]) => this.getOrderDetailQuantity(index).setValue(+countValue * copiesValue));
  }

  subscribeOrderDetailStatusChanges(index: number) {
    this.getOrderDetailStatus(index)
      .valueChanges.pipe(startWith(this.getOrderDetailStatus(index).value))

      .subscribe(() => {
        if (this.getOrderDetailQuantity(index).value <= 0) this.getOrderDetailQuantity(index).setErrors({ required: true });
        this.getOrderDetailQuantity(index).updateValueAndValidity();
      });
  }

  subscribeNoteOrServiceChanges(index: number) {
    this.getNoteOrService(index).valueChanges.subscribe(() =>
      this.OrderDetails.at(index).patchValue({
        counts: 0,
        copies: 0,
        quantity: 0,
        status: null,
        noteId: null,
        serviceId: null,
      }),
    );
  }

  subscribeServiceOrNoteValueChanges(index: number) {
    this.getNoteOrService(index)
      .valueChanges.pipe(startWith(this.getNoteOrService(index).value))
      .subscribe({
        next: (value) => {
          if (value === 'service' && this.ServicePricesForClientTypesDataSource.length === 0) {
            this.clientTypeId.valueChanges
              .pipe(
                startWith(this.clientTypeId.value),
                filter((id) => !!id),
                switchMap((id) => forkJoin([this._servicePricePerClientTypeService.GetAllPriced(id)])),
              )
              .subscribe({
                next: ([res]) => {
                  this.ServicePricesForClientTypesDataSource = res.body;
                },
                error: () => {
                  this.ServicePricesForClientTypesDataSource = [];
                  this.OrderDetails.value.forEach((orderDetail: OrderDetail, index: number) => this.getOrderDetailServiceId(index).reset());
                  this.isSubmitting = false;
                  this.serviceLoading = false;
                },
              });
          } else if (value === 'note' && this.NotesDataSource.length === 0) {
            this._noteService
              .getAllVisible()
              .pipe(tap(() => (this.notesLoading = true)))
              .subscribe({
                next: (response) => {
                  this.NotesDataSource = response.body;
                  this.notesLoading = false;
                },
              });
          }
        },
      });
  }

  handleDeleteDetail = (index: number) => {
    this.OrderDetails.removeAt(index);
    if (this.OrderDetails.length) {
      this.calculateTotalPrice();
    } else
      this.Form.patchValue({
        totalPrice: 0,
        finalPrice: 0,
        discount: 0,
        discountPercent: 0,
      });
  };

  setServicePriceForClientType(index: number) {
    const serviceId = this.getOrderDetailServiceId(index).value;
    if (serviceId) {
      let servicePrice = this.ServicePricesForClientTypesDataSource.find((sp) => sp.serviceId === serviceId)?.price;
      this.getOrderDetailPrice(index).setValue(servicePrice);
      this.calculateTotalPrice();
    }
  }

  async HandleNewClient() {
    const dialogComponent = await FormFactory.getAppropriateDialogComponent(FormDialogNames.ClientFormDialogComponent);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      minWidth: '30%',
    });
    dialogRef
      .afterClosed()

      .subscribe({
        next: (result) => {
          if (result?.data) {
            let newClient: ClientForForm = result.data.body;
            this.clientId.setValue(null);
            if (this.clientTypeId.value === newClient.clientTypeId) {
              this.ClientsDataSource.push(newClient);
              this.clientId.setValue(newClient.id);
            }
          }
        },
      });
  }

  isServiceSelected = (index: number) => this.getNoteOrService(index).value == 'service';

  calculateTotalPrice() {
    let total = 0;
    for (let index = 0; index < this.OrderDetails.controls.length; index++) {
      const price = +this.getOrderDetailPrice(index).value;
      const quantity = +this.getOrderDetailQuantity(index).value;
      total += +(price * quantity).toFixed(2);
    }
    this.totalPrice.setValue(`${total}`);
    if (total === 0) {
      this.discount.setValue(0);
      this.discount.disable();
      this.paid.disable();
      this.discountPercent.disable();
    } else {
      this.discount.enable();
      this.discountPercent.enable();
      this.paid.enable();
      this.discount.setValue(this.discount.value);
    }
  }

  handleViewPdf = (index: number, $event: any) => {
    $event.stopPropagation();
    const filePath = this.getOrderDetailFilePath(index);
    const uploadsIndex = filePath.indexOf('uploads');
    if (uploadsIndex !== -1) {
      const trimmedPath = filePath.substring(uploadsIndex);
      window.open(`${environment.host}${trimmedPath}`, '_blank');
    }
  };

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.data)
        this._databaseService
          .updateOrderDetailsStatus(this.Form.value)

          .subscribe(this.closeDialogAndRefreshTable());
      else this.add(this.Form.value);
    }
  }
}
