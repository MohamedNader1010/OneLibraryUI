import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, forkJoin, switchMap, filter, startWith, Observer, tap, catchError, of, BehaviorSubject, pairwise, takeUntil } from 'rxjs';
import { NoteService } from '../../services/note.service';
import { ToastrService } from 'ngx-toastr';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { Stage } from '../../interfaces/IStage';
import { Term } from '../../interfaces/ITerm';
import { NoteComponent } from '../../interfaces/noteComponent';
import { Note } from '../../interfaces/Inote';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { ClientType } from '../../../clientType/interFaces/IclientType';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ServicePricePerClientTypeService } from '../../../service-price-per-client-type/services/service-price-per-client-type.service';
import { validateArrayLingth } from '../../../order/validators/customValidator';
import { PricedServicesWithOriginalPrices } from '../../../service-price-per-client-type/Interfaces/IPricedServicesWithOriginalPrices';
import { ClientForForm } from '../../../client/interFaces/IClientForForm';
import { FormHelpers } from '../../../shared/classes/form-helpers';
import { FormDialogNames } from '../../../shared/enums/forms-name.enum';
@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.css'],
})
export class NoteFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  TermsDataSource: Term[] = [];
  StagesDataSource: Stage[] = [];
  ServicePricesForClientTypesDataSource: PricedServicesWithOriginalPrices[] = [];
  ClientsDataSource: ClientForForm[] = [];
  ClientTypesDataSource: ClientType[] = [];
  deletedComponents: number[] = [];
  clearAutocomplete: BehaviorSubject<number> = new BehaviorSubject(0);
  progress: number = 0;
  selectedFile!: File | null;
  formData: FormData = new FormData();
  clientsDisable: boolean = false;
  serviceLoading: boolean = false;
  clientTypeLoading = false;

  constructor(
    private _databaseService: NoteService,
    private _fb: FormBuilder,
    private _clientTypeService: ClientTypeService,
    private _servicePricePerClientTypeService: ServicePricePerClientTypeService,
    toastrService: ToastrService,
    matDialogRef: MatDialogRef<NoteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    translateService: TranslateService,
    public dialog: MatDialog,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.Form = this.createFormItem('init');
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
  get fileName(): FormControl {
    return this.Form.get('fileName') as FormControl;
  }
  get isVisible(): FormControl {
    return this.Form.get('isVisible') as FormControl;
  }
  get reservationRequired(): FormControl {
    return this.Form.get('reservationRequired') as FormControl;
  }
  getNoteComponentId = (index: number): FormControl => this.noteComponents.at(index).get('id') as FormControl;
  getNoteComponentServiceId = (index: number): FormControl => this.noteComponents.at(index).get('serviceId') as FormControl;
  getNoteComponentOriginalPrice = (index: number): FormControl => this.noteComponents.at(index).get('originalPrice') as FormControl;
  getNoteComponentQuantity = (index: number): FormControl => this.noteComponents.at(index).get('quantity') as FormControl;
  getNoteComponentServiceName = (index: number) => {
    let servicePricePerClientType = this.ServicePricesForClientTypesDataSource.find(
      (sp) => sp.serviceId === this.getNoteComponentServiceId(index).value && sp.clientTypeId === this.clientTypeId.value,
    );
    return servicePricePerClientType?.service ?? 'جاري التحميل';
  };
  getNoteComponentPrice = (index: number): FormControl => this.noteComponents.at(index).get('price') as FormControl;

  setClientTypeId = (data: any) => this.clientTypeId.setValue(data);
  setClientId = async (data: any) => (data === -1 ? await this.HandleNewClient() : this.clientId.setValue(data));

  getServicePriceForClientTypeId = (index: number) => {
    let servicePricePerClientType = this.ServicePricesForClientTypesDataSource.find(
      (sp) => sp.serviceId === this.getNoteComponentServiceId(index).value && sp.clientTypeId === this.clientTypeId.value,
    )?.id;
    return servicePricePerClientType;
  };
  setServicePriceForClientTypeId = (index: number, data: any) => {
    let serviceId = this.ServicePricesForClientTypesDataSource.find((sp) => sp.id === data)?.serviceId;
    this.getNoteComponentServiceId(index).setValue(serviceId);
  };

  ngOnInit(): void {
    this.matDialogRef.disableClose = this.formDataIsLoading = true;
    this.forkJoins();
  }

  private forkJoins() {
    let observables = [this._databaseService.getStages(), this._databaseService.getTerms(), this._clientTypeService.getAll()];
    return forkJoin(observables)
      .pipe(
        tap(() => (this.clientTypeLoading = this.clientsDisable = this.serviceLoading = this.formDataIsLoading = true)),
        catchError((err) => of(err)),
        map(([stagesResponse, termsResponse, clientTypeResponse]) => {
          return {
            stages: stagesResponse,
            terms: termsResponse,
            clientsType: clientTypeResponse,
          };
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.TermsDataSource = response.terms.body;
          let emptyTerm: Term = { id: null, name: 'بدون' };
          this.TermsDataSource.unshift(emptyTerm);
          this.StagesDataSource = response.stages.body;
          let emptyStage: Stage = { id: null, name: 'بدون' };
          this.StagesDataSource.unshift(emptyStage);
          this.ClientTypesDataSource = response.clientsType.body;
        },
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.clientTypeLoading = false;
          if (this.data) this.patchData();
          else this.formDataIsLoading = false;
          this.subscribeClientTypeChange();
          this.subscribeFormMoneyChanges();
        },
      });
  }

  patchData = () => {
    this.data.noteComponents.forEach(() => this.noteComponents.push(this.createFormItem('noteComponent')));
    this.Form.patchValue(this.data, { emitEvent: false });
  };

  createFormItem(type: string): FormGroup {
    let formItem: FormGroup = this._fb.group({});
    switch (type) {
      case 'init':
        formItem = this._fb.group(
          {
            id: [null],
            name: ['', [Validators.required]],
            termId: [null],
            stageId: [null],
            clientTypeId: [null],
            clientId: [null, [Validators.required]],
            noteComponents: this._fb.array([], Validators.minLength(1)),
            quantity: [0],
            originalPrice: [0],
            actualPrice: [0],
            earning: [0],
            teacherPrice: [0, [Validators.required, Validators.min(0)]],
            finalPrice: [0],
            fileName: [null],
            isVisible: [true],
            reservationRequired: [true],
          },
          { validators: validateArrayLingth('noteComponents') },
        );
        break;
      case 'noteComponent':
        formItem = this._fb.group({
          id: [null],
          noteId: [this.id.value],
          serviceId: [null, [Validators.required]],
          service: [''],
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

    this.getNoteComponentServiceId(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.setServicePriceForClientType(index),
      });

    this.getNoteComponentQuantity(index)
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateTotalActualPrice();
        this.calculateTotalOriginalPrice();
      });
  };

  handleDeleteNoteComponent = (index: number) => {
    if (this.data) this.deletedComponents.push(this.getNoteComponentId(index).value);
    this.noteComponents.removeAt(index);
    if (this.noteComponents.length) {
      this.calculateTotalActualPrice();
    } else
      this.Form.patchValue({
        originalPrice: 0,
        actualPrice: 0,
        earning: 0,
        finalPrice: 0,
      });
  };

  subscribeFormMoneyChanges() {
    this.Form.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(() => {
      let finalPrice = (+this.actualPrice.value - +this.originalPrice.value).toFixed(2);
      this.earning.setValue(finalPrice, { emitEvent: false });
      this.finalPrice.setValue((+this.actualPrice.value + +this.teacherPrice.value).toFixed(2), { emitEvent: false });
    });
  }
  subscribeClientTypeChange() {
    this.clientTypeId.valueChanges
      .pipe(
        tap(() => (this.clientsDisable = this.serviceLoading = true)),
        startWith(this.clientTypeId.value),
        filter((id: any) => !!id),
        switchMap((id) => {
          const getAllPriced$ = this._servicePricePerClientTypeService.GetAllPricedWithOriginalPrices(id);
          return forkJoin([getAllPriced$]);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: ([servicesResponse]) => {
          this.clearAutocomplete.next(1);
          this.ServicePricesForClientTypesDataSource = servicesResponse.body;
          this.reloadServicesPrices();
          this.calculateTotalActualPrice();
          this.serviceLoading = this.clientsDisable = this.formDataIsLoading = false;
        },
        error: ([clientError, serviceError]) => {
          if (clientError) {
            this.ClientsDataSource = [];
            this.clientId.reset();
            this.isSubmitting = false;
          }
          if (serviceError) {
            this.ServicePricesForClientTypesDataSource = [];
            this.noteComponents.value.forEach((noteComponent: NoteComponent, index: number) => {
              this.getNoteComponentServiceId(index).reset();
            });
            this.isSubmitting = false;
          }
        },
      });
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
    this.noteComponents.value.forEach((noteComponent: NoteComponent, index: number) => {
      this.setServicePriceForClientType(index);
    });
  }

  calculateTotalActualPrice() {
    let total = 0;
    for (let index = 0; index < this.noteComponents.controls.length; index++) {
      total += +this.getNoteComponentPrice(index).value * +this.getNoteComponentQuantity(index).value;
    }
    this.actualPrice.setValue(total);
  }

  calculateTotalOriginalPrice() {
    let total = 0;
    for (let index = 0; index < this.noteComponents.controls.length; index++) {
      total += +this.getNoteComponentOriginalPrice(index).value * +this.getNoteComponentQuantity(index).value;
    }
    this.originalPrice.setValue(total);
  }

  setServicePriceForClientType(index: number) {
    const serviceId = this.getNoteComponentServiceId(index).value;
    if (serviceId) {
      let service = this.ServicePricesForClientTypesDataSource.find((sp) => sp.serviceId === serviceId);
      this.getNoteComponentPrice(index).setValue(service?.price);
      this.getNoteComponentOriginalPrice(index).setValue(service?.originalPrice);
      this.calculateTotalActualPrice();
      this.calculateTotalOriginalPrice();
    }
  }

  getSelectedFiles = (file: File | null) => {
    if (!file) {
      this.fileName.setValue(null);
      return;
    }
    if (file.type !== 'application/pdf') {
      this.toastrService.error('يجب ان يكون صيغة الملف PDF');
      this.fileName.setValue(null);
      return;
    }
    this.selectedFile = file;
  };

  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.id.value) {
        this._databaseService
          .deleteNoteComponents(this.deletedComponents)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            error: () => (this.isSubmitting = false),
            complete: () => {
              this._databaseService.updateFormData(this.Form.value, this.selectedFile, 'pdf').pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateFormDataObserver());
            },
          });
      } else {
        this._databaseService.addFormData(this.Form.value, this.selectedFile, 'pdf').pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateFormDataObserver());
      }
    }
  }

  addAndUpdateFormDataObserver(): Partial<Observer<HttpEvent<Object>>> | (((value: HttpEvent<Object>) => void) | undefined) {
    return {
      next: (res) => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((res.loaded / (res.total ?? 1)) * 100);
        } else if (res.type === HttpEventType.Response) {
          this.databaseService.DialogData = (res.body as ResponseDto).body;
          this.matDialogRef.close({ data: res.body as ResponseDto });
        }
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    };
  }
}
