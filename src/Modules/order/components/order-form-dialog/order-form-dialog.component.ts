import { TranslateService } from '@ngx-translate/core';
import { ServicePricePerClientTypeService } from '../../../service-price-per-client-type/services/service-price-per-client-type.service';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, startWith, filter, switchMap, tap, takeUntil, combineLatest } from 'rxjs';
import { NoteService } from 'src/Modules/note/services/note.service';
import { OrderService } from '../../services/orders.service';
import { ClientType } from 'src/Modules/clientType/interFaces/IclientType';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
import { Order } from '../../interfaces/Iorder';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from '../../interfaces/IorderDetail';
import { FormHelpers } from 'src/Modules/shared/classes/form-helpers';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { validateArrayLingth, validateQuantityAsync } from '../../validators/customValidator';
import { environment } from '../../../../environments/environment';
import { NoteOnly } from '../../../note/interfaces/Inote-only';
import { PricedServices } from '../../../service-price-per-client-type/Interfaces/IPricedServices';
import { ClientForForm } from '../../../client/interFaces/IClientForForm';
@Component({
  selector: 'app-order-form-dialog',
  templateUrl: './order-form-dialog.component.html',
  styleUrls: ['./order-form-dialog.component.css'],
})
export class OrderFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  //#region variables
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
  // #endregion

  constructor(
    matDialogRef: MatDialogRef<OrderFormDialogComponent>,
    translateService: TranslateService,
    private _databaseService: OrderService,
    toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private _noteService: NoteService,
    private _clientTypeService: ClientTypeService,
    private _servicePricePerClientTypeService: ServicePricePerClientTypeService,
    public dialog: MatDialog,
    private _fb: FormBuilder,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.Form = this.createFormItem('init');
  }

  //#region getters and setters
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
  getOrderDetailStatus = (index: number): FormControl => this.OrderDetails.at(index).get('orderStatus') as FormControl;
  getOrderDetailServiceCount = (index: number): FormControl => this.OrderDetails.at(index).get('counts') as FormControl;
  getOrderDetailServiceCopies = (index: number): FormControl => this.OrderDetails.at(index).get('copies') as FormControl;
  getServicePriceForClientTypeId = (index: number) => {
    let servicePricePerClientType = this.ServicePricesForClientTypesDataSource.find((sp) => sp.serviceId === this.getOrderDetailServiceId(index).value && sp.clientTypeId === this.clientTypeId.value)?.id;
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
      const oldStatus = this.data.orderDetails.find((od) => od.id === this.getOrderDetailId(index).value)?.orderStatus ?? OrderDetailStatus.حجز;
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
  //#endregion

  ngOnInit(): void {
    this.matDialogRef.disableClose = true;

    this._clientTypeService
      .getAll()
      .pipe(
        tap(() => (this.clientsDisable = this.clientTypeLoading = this.serviceLoading = true)),
        takeUntil(this.destroy$),
      )
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
    this._databaseService
      .GetById(this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((order) => {
        this.data = order.body;
        this.data.orderDetails.forEach((orderDetail: OrderDetail, index: number) => {
          this.OrderDetails.push(this.createFormItem('detail', orderDetail.orderStatus));
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
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: () => {
          if (!this.data) this.clientId.setValue(null);
          this.clientsDisable = this.serviceLoading = this.notesLoading = false;

          this.OrderDetails.value.forEach((orderDetail: OrderDetail, index: number) => {
            if (this.getNoteOrService(index).value === 'service') this.setServicePriceForClientType(index);
          });
        },
        complete: () => this.calculateTotalPrice()+
      });
  }

  subscribeFormMoneyValueChanges(): void {
    const totalPrice$ = this.totalPrice.valueChanges;
    const discount$ = this.discount.valueChanges;
    const discountPercent$ = this.discountPercent.valueChanges;
    const paid$ = this.paid.valueChanges;

    discount$.pipe(takeUntil(this.destroy$)).subscribe((discount) => {
      const totalPriceValue = +(+this.totalPrice.value ?? 0).toFixed(2);
      const newDiscountPercent = totalPriceValue === 0 ? 0 : +((+discount / totalPriceValue) * 100).toFixed(2);
      this.discountPercent.setValue(newDiscountPercent, { emitEvent: false, onlySelf: true });
      this.updateFinalPriceAndRest();
    });

    discountPercent$.pipe(takeUntil(this.destroy$)).subscribe((discountPercent) => {
      const totalPriceValue = +(+this.totalPrice.value ?? 0).toFixed(2);
      const newDiscount = discountPercent === 0 ? +this.discount.value : +((+discountPercent / 100) * totalPriceValue).toFixed(2);
      this.discount.setValue(newDiscount, { emitEvent: false, onlySelf: true });
      this.updateFinalPriceAndRest();
    });

    combineLatest([totalPrice$, paid$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateFinalPriceAndRest());
  }

  updateFinalPriceAndRest(): void {
    const finalPrice = +(this.totalPrice.value - this.discount.value).toFixed(2);
    const rest = (finalPrice - +this.paid.value).toFixed(2);

    this.Form.patchValue(
      {
        finalPrice: finalPrice,
        rest: rest,
      },
      { emitEvent: false, onlySelf: true },
    );
  }

  createFormItem(type: string, previousStatus: OrderDetailStatus | null = null): FormGroup {
    let formItem: FormGroup = this._fb.group({});
    switch (type) {
      case 'init':
        formItem = this._fb.group(
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
            orderDetails: this._fb.array([]),
            remarks: [null],
          },
          { validators: validateArrayLingth('orderDetails') },
        );
        break;
      case 'detail':
        formItem = this._fb.group({
          id: [null],
          noteOrService: ['service'],
          price: [0],
          quantity: [0, [Validators.required, Validators.min(0.01)], [validateQuantityAsync(previousStatus)]],
          serviceId: [null],
          service: [''],
          noteId: [null],
          note: [''],
          availableNoteQuantity: [0],
          orderStatus: [null, [Validators.required]],
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

    this.getOrderDetailQuantity(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateTotalPrice());

    this.getOrderDetailServiceId(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.setServicePriceForClientType(index));

    this.subscribeOrderDetailNoteChanges(index);
    this.subscribeOrderDetailQuantityChanges(index);
    this.subscribeOrderDetailStatusChanges(index);
    this.subscribeNoteOrServiceChanges(index);

    this.subscribeServiceOrNoteValueChanges(index);
  };

  subscribeOrderDetailNoteChanges(index: number) {
    this.getOrderDetailNoteId(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
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
    combineLatest([countChanges$, copiesChanges$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([countValue, copiesValue]) => this.getOrderDetailQuantity(index).setValue(+countValue * copiesValue));
  }

  subscribeOrderDetailStatusChanges(index: number) {
    this.getOrderDetailStatus(index)
      .valueChanges.pipe(startWith(this.getOrderDetailStatus(index).value))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.getOrderDetailQuantity(index).value <= 0) this.getOrderDetailQuantity(index).setErrors({ required: true });
        this.getOrderDetailQuantity(index).updateValueAndValidity();
      });
  }

  subscribeNoteOrServiceChanges(index: number) {
    this.getNoteOrService(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() =>
        this.OrderDetails.at(index).patchValue({
          counts: 0,
          copies: 0,
          quantity: 0,
          orderStatus: null,
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
                takeUntil(this.destroy$),
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
              .pipe(
                tap(() => (this.notesLoading = true)),
                takeUntil(this.destroy$),
              )
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
    const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.ClientFormDialogComponent);
    const dialogRef = this.dialog.open<any>(dialogComponent, {
      minWidth: '30%',
    });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
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
    this.totalPrice.setValue(total);
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

  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.data) this._databaseService.updateOrderDetailsStatus(this.Form.value).pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateObserver());
      else this.add(this.Form.value);
    }
  }
}
