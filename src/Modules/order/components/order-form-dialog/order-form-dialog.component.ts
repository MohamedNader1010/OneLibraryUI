import { TranslateService } from '@ngx-translate/core';
import { ServicePricePerClientTypeService } from '../../../service-price-per-client-type/services/service-price-per-client-type.service';
import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin, map, catchError, of, startWith, BehaviorSubject, filter, switchMap, tap, takeUntil } from 'rxjs';
import { NoteService } from 'src/Modules/note/services/note.service';
import { OrderService } from '../../services/orders.service';
import { ClientType } from 'src/Modules/clientType/interFaces/IclientType';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { ClientService } from 'src/Modules/client/services/client.service';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
import { Order } from '../../interfaces/Iorder';
import { ResponseDto } from './../../../shared/interfaces/Iresponse';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { OrderDetail } from '../../interfaces/IorderDetail';
import { FormHelpers } from 'src/Modules/shared/classes/form-helpers';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { validateArrayLingth, validateQuantityAsync } from '../validators/customValidator';
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
  clientsLoading: boolean = false;
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
    private _clientService: ClientService,
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
      const oldStatus = this.data.orderDetails.find((od) => od.id === this.getOrderDetailId(index).value)?.orderStatus ?? OrderDetailStatus.حجز;
      return this.data ? this.availableStatus.filter((s) => s >= oldStatus) : this.availableStatus;
    } else return this.newOrderAvailableStatus;
  }
  getNoteById = (id: number) => this.NotesDataSource.find((note) => note.id == id);
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
    this.forkJoins();
  }

  forkJoins() {
    let observables = [this._noteService.getAllVisible(), this._clientTypeService.getAll()];
    return forkJoin(observables)
      .pipe(
        tap(() => (this.clientTypeLoading = this.notesLoading = this.clientsLoading = this.serviceLoading = true)),
        catchError((err) => of(err)),
        map(([notesResponse, clientTypeResponse]) => {
          return {
            notes: notesResponse,
            clientsType: clientTypeResponse,
          };
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.NotesDataSource = response.notes.body;
          this.ClientTypesDataSource = response.clientsType.body;
        },
        complete: () => {
          if (this.data) this.patchData();
          this.subscribeClientTypeChange();
          this.subscribeTotalPriceChanges();
          this.subscribeDiscountChanges();
          this.subscribeDiscountPercentChanges();
          this.subscribePaidChanges();
          this.clientTypeLoading = this.notesLoading = false;
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

  // #region form items

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
          quantity: [0, [Validators.required], [validateQuantityAsync(previousStatus)]],
          serviceId: [null],
          service: [''],
          noteId: [null],
          note: [''],
          availableNoteQuantity: [0],
          orderStatus: [null, [Validators.required]],
          counts: [0],
          copies: [0],
        });
        break;
    }
    return formItem;
  }

  handleNewDetail = () => {
    let index = this.OrderDetails.length;
    this.OrderDetails.push(this.createFormItem('detail'));
    this.subscribeOrderDetailQuantityChanges(index);
    this.subscribeOrderDetailServiceChanges(index);
    this.subscribeOrderDetailNoteChanges(index);
    this.subscribeOrderDetailCopiesChanges(index);
    this.subscribeOrderDetailCountChanges(index);
    this.subscribeOrderDetailStatusChanges(index);
    this.subscribeNoteOrServiceChanges(index);
  };

  handleDeleteDetail = (index: number) => {
    this.OrderDetails.removeAt(index);
    if (this.OrderDetails.length) {
      this.calculateTotalPrice();
    } else this.resetFormMoney();
  };
  // #endregion

  //#region value changes subscribtions
  subscribeTotalPriceChanges() {
    this.totalPrice.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        const totalPrice = +(+value ?? 0).toFixed(2);
        const newDiscountPercent = totalPrice === 0 ? 0 : +((+this.discount.value / totalPrice) * 100).toFixed(2);
        const finalPrice = +(totalPrice - +this.discount.value).toFixed(2);
        const paid = +this.paid.value;
        const rest = +(finalPrice - paid).toFixed(2);
        this.Form.patchValue({ discountPercent: newDiscountPercent, finalPrice: finalPrice, rest: rest }, { emitEvent: false });
      },
    });
  }

  subscribeDiscountChanges() {
    this.discount.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (discount) => {
        const totalPrice = +(+this.totalPrice.value).toFixed(2);
        const newDiscountPercent = totalPrice === 0 ? 0 : +((+discount / totalPrice) * 100).toFixed(2);
        const finalPrice = +(totalPrice - +this.discount.value).toFixed(2);
        const paid = +(+this.paid.value).toFixed(2);
        const rest = (finalPrice - paid).toFixed(2);
        this.Form.patchValue({ discountPercent: newDiscountPercent, finalPrice: finalPrice, rest: rest }, { emitEvent: false });
      },
    });
  }

  subscribeDiscountPercentChanges() {
    this.discountPercent.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (discountPercent) => {
        const totalPrice = +(+this.totalPrice.value).toFixed(2);
        const newDiscount = +((+discountPercent / 100) * totalPrice).toFixed(2);
        const finalPrice = +(totalPrice - newDiscount).toFixed(2);
        const paid = +(+this.paid.value).toFixed(2);
        const rest = (finalPrice - paid).toFixed(2);
        this.Form.patchValue({ discount: newDiscount, finalPrice: finalPrice, rest: rest }, { emitEvent: false });
      },
    });
  }

  subscribePaidChanges() {
    this.paid.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value) => {
        const finalPrice = this.finalPrice.value;
        const rest = (finalPrice - value).toFixed(2);
        this.rest.setValue(rest, { emitEvent: false });
      },
    });
  }

  subscribeOrderDetailStatusChanges(index: number) {
    this.getOrderDetailStatus(index)
      .valueChanges.pipe(startWith(this.getOrderDetailStatus(index).value))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getOrderDetailQuantity(index).updateValueAndValidity();
        console.log(this.Form.value);
        console.log(this.Form.valid);
        console.log(this.clientId.value);
      });
  }

  subscribeNoteOrServiceChanges(index: number) {
    this.getNoteOrService(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.resetOrderDetail(index));
  }

  subscribeClientTypeChange() {
    this.clientTypeId.valueChanges
      .pipe(
        tap(() => {
          this.clientsLoading = this.serviceLoading = true;
        }),
        startWith(this.clientTypeId.value),
        filter((id) => !!id),
        switchMap((id) => {
          const getAllByType$ = this._clientService.getAllByType(id);
          const getAllPriced$ = this._servicePricePerClientTypeService.GetAllPriced(id);
          return forkJoin([getAllByType$, getAllPriced$]);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: ([clientsResponse, servicesResponse]) => {
          let newClient: ClientForForm = {
            id: -1,
            name: 'أضافة عميل جديد',
            clientTypeId: -1,
          };
          this.ClientsDataSource = [newClient, ...clientsResponse.body];
          if (!this.data) this.clientId.setValue(null);
          this.ServicePricesForClientTypesDataSource = servicesResponse.body;
          this.serviceLoading = this.clientsLoading = false;
          this.reloadServicesPrices();
          this.calculateTotalPrice();
        },
        error: ([clientError, serviceError]) => {
          if (clientError) {
            this.ClientsDataSource = [];
            this.clientId.reset();
            this.isSubmitting = false;
            let res: ResponseDto = clientError.error ?? clientError;
            this.toastrService.error(res.message);
            this.clientsLoading = false;
          }
          if (serviceError) {
            this.ServicePricesForClientTypesDataSource = [];
            this.OrderDetails.value.forEach((orderDetail: OrderDetail, index: number) => {
              this.getOrderDetailServiceId(index).reset();
            });
            this.isSubmitting = false;
            this.serviceLoading = false;
            let res: ResponseDto = serviceError.error ?? serviceError;
            this.toastrService.error(res.message);
          }
        },
      });
  }

  subscribeOrderDetailQuantityChanges(index: number) {
    this.getOrderDetailQuantity(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateTotalPrice());
  }

  subscribeOrderDetailCountChanges(index: number) {
    this.getOrderDetailServiceCount(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((countValue) => {
        const quantityValue = +this.getOrderDetailServiceCopies(index).value * countValue;
        this.getOrderDetailQuantity(index).setValue(quantityValue);
      });
  }

  subscribeOrderDetailCopiesChanges(index: number) {
    this.getOrderDetailServiceCopies(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((copiesValue) => {
        const quantityValue = +this.getOrderDetailServiceCount(index).value * copiesValue;
        this.getOrderDetailQuantity(index).setValue(quantityValue);
      });
  }

  subscribeOrderDetailServiceChanges(index: number) {
    this.getOrderDetailServiceId(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.setServicePriceForClientType(index),
      });
  }

  subscribeOrderDetailNoteChanges(index: number) {
    this.getOrderDetailNoteId(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (id) => {
          let notePrice = this.getNoteById(id)?.finalPrice ?? 0;
          this.getOrderDetailNoteAvailableQuantity(index).setValue(this.getNoteById(id)?.quantity);
          this.getOrderDetailQuantity(index).updateValueAndValidity();
          this.getOrderDetailPrice(index).setValue(notePrice);
          this.calculateTotalPrice();
        },
        error: (e) => {
          this.isSubmitting = false;
          let res: ResponseDto = e.error ?? e;
          this.toastrService.error(res.message);
          this.getOrderDetailPrice(index).setValue(0);
          this.getOrderDetailNoteAvailableQuantity(index).setValue(0);
          this.getOrderDetailQuantity(index).updateValueAndValidity();
          this.calculateTotalPrice();
        },
      });
  }
  //#endregion

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

  reloadServicesPrices() {
    this.OrderDetails.value.forEach((orderDetail: OrderDetail, index: number) => {
      if (this.getNoteOrService(index).value === 'service') this.setServicePriceForClientType(index);
    });
  }

  isServiceSelected = (index: number) => this.getNoteOrService(index).value == 'service';

  calculateTotalPrice() {
    let total = 0;
    for (let index = 0; index < this.OrderDetails.controls.length; index++) {
      total += +(+this.getOrderDetailPrice(index).value * +this.getOrderDetailQuantity(index).value).toFixed(2);
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

  resetFormMoney() {
    this.Form.patchValue({
      totalPrice: 0,
      finalPrice: 0,
      discount: 0,
      discountPercent: 0,
    });
  }

  resetOrderDetail(index: number): void {
    this.OrderDetails.at(index).patchValue({
      counts: 0,
      copies: 0,
      quantity: 0,
      orderStatus: null,
      noteId: null,
      serviceId: null,
    });
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
