import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { map, forkJoin, switchMap, filter, startWith, Observer, tap, catchError, of, BehaviorSubject } from 'rxjs';
import { ClientTypeService } from 'src/app/core/data/services/client-type.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { validateArrayLingth } from '../../../order/validators/customValidator';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { ClientForForm } from '../../../../core/data/models/client/IClientForForm';
import { Note } from '../../../../core/data/models/note/Inote';
import { PricedServicesWithOriginalPrices } from '../../../../core/data/models/service-price-per-client-type/IPricedServicesWithOriginalPrices';
import { Stage } from '../../../../core/data/models/stage/IStage';
import { Term } from '../../../../core/data/models/term/ITerm';
import { NoteService } from '../../../../core/data/services/note.service';
import { ServicePricePerClientTypeService } from '../../../../core/data/services/service-price-per-client-type.service';
import { FormHelpers } from '../../../../shared/classes/form-helpers';
import { FormDialogNames } from '../../../../shared/enums/forms-name.enum';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';
import { NoteComponent } from '../../note.component';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { TermService } from '../../../../core/data/services/term.service';
import { StageService } from '../../../../core/data/services/stage.service';
@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.css'],
})
export class NoteFormDialogComponent extends BaseForm implements OnInit {
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
    private _clientTypeService: ClientTypeService,
    private _servicePricePerClientTypeService: ServicePricePerClientTypeService,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    private termsService: TermService,
    private stageService: StageService,
    public matDialog: MatDialog,
  ) {
    super();
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
    let observables = [this.stageService.getAll(), this.termsService.getAll(), this._clientTypeService.getAll()];
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
    let formItem: FormGroup = this.fb.group({});
    switch (type) {
      case 'init':
        formItem = this.fb.group(
          {
            id: [null],
            name: ['', [Validators.required]],
            termId: [null],
            stageId: [null],
            clientTypeId: [null],
            clientId: [null, [Validators.required]],
            noteComponents: this.fb.array([], Validators.minLength(1)),
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
        formItem = this.fb.group({
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

    this.getNoteComponentServiceId(index).valueChanges.subscribe({
      next: () => this.setServicePriceForClientType(index),
    });

    this.getNoteComponentQuantity(index).valueChanges.subscribe(() => {
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
    this.Form.valueChanges.subscribe(() => {
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
    const dialogRef = this.matDialog.open<any>(dialogComponent, {
      minWidth: '30%',
    });
    dialogRef.afterClosed().subscribe({
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
    const noteComponentId = this.getNoteComponentId(index).value;
    const noteComponent = this.data?.noteComponents.find((nc) => nc.id === noteComponentId);

    if (serviceId) {
      if (noteComponent && noteComponent.originalPrice && noteComponent.price && noteComponent.serviceId === serviceId) {
        this.getNoteComponentPrice(index).setValue(noteComponent.price);
        this.getNoteComponentOriginalPrice(index).setValue(noteComponent.originalPrice);
      } else {
        const service = this.ServicePricesForClientTypesDataSource.find((sp) => sp.serviceId === serviceId);
        this.getNoteComponentPrice(index).setValue(service?.price);
        this.getNoteComponentOriginalPrice(index).setValue(service?.originalPrice);
      }
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

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.id.value) {
        this._databaseService.deleteNoteComponents(this.deletedComponents).subscribe({
          error: () => (this.isSubmitting = false),
          complete: () => {
            this._databaseService.updateFormData(this.Form.value, this.selectedFile, 'pdf').subscribe(this.addAndUpdateFormDataObserver());
          },
        });
      } else {
        this._databaseService.addFormData(this.Form.value, this.selectedFile, 'pdf').subscribe(this.addAndUpdateFormDataObserver());
      }
    }
  }

  addAndUpdateFormDataObserver(): Partial<Observer<HttpEvent<Object>>> | (((value: HttpEvent<Object>) => void) | undefined) {
    return {
      next: (res) => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((res.loaded / (res.total ?? 1)) * 100);
        } else if (res.type === HttpEventType.Response) {
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
