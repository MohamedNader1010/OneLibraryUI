import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { map, forkJoin, switchMap, filter, startWith, Observer } from "rxjs";
import { NoteService } from '../../services/note.service';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from 'src/Modules/client/services/client.service';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { Stage } from '../../interfaces/IStage';
import { Term } from '../../interfaces/ITerm';
import { NoteComponent } from '../../interfaces/noteComponent';
import { Service } from 'src/Modules/service/interfaces/Iservice';
import { ServicesService } from 'src/Modules/service/services/services.service';
import { Note } from '../../interfaces/Inote';
import { Response } from './../../../shared/interfaces/Iresponse';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { ClientType } from '../../../clientType/interFaces/IclientType';
import { Client } from '../../../client/interFaces/Iclient';
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-note-form-dialog',
  templateUrl: './note-form-dialog.component.html',
  styleUrls: ['./note-form-dialog.component.css'],
})
export class NoteFormDialogComponent
  extends FormsDialogCommonFunctionality
  implements OnInit, OnDestroy
{
  TermsDataSource: Term[] = [];
  StagesDataSource: Stage[] = [];
  ServicesDataSource: Service[] = [];
  ClientsDataSource: Client[] = [];
  ClientTypesDataSource: ClientType[] = [];
  deletedComponents: number[] = [];
  progress: number = 0;
  selectedFile!: File | null;
  formData: FormData = new FormData();

  constructor(
    private _note: NoteService,
    private fb: FormBuilder,
    private _client: ClientService,
    private _clientType: ClientTypeService,
    private _service: ServicesService,
    toastr: ToastrService,
    matDialogRef: MatDialogRef<NoteFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
    translate: TranslateService
  ) {
    super(matDialogRef, translate, _note, toastr);
    this.Form = this.createFormItem('init');
  }

  get id(): FormControl {
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
  get fileName(): FormControl {
    return this.Form.get('fileName') as FormControl;
  }

  get isVisible(): FormControl {
    return this.Form.get('isVisible') as FormControl;
  }
  getNoteComponentId = (index: number): FormControl =>
    this.noteComponents.at(index).get('id') as FormControl;
  getNoteComponentServiceId = (index: number): FormControl =>
    this.noteComponents.at(index).get('serviceId') as FormControl;
  servicePriceFormControl = (index: number): FormControl =>
    this.noteComponents.at(index).get('price') as FormControl;
  serviceOriginalPriceFormControl = (index: number): FormControl =>
    this.noteComponents.at(index).get('originalPrice') as FormControl;
  serviceQuantityFormControl = (index: number): FormControl =>
    this.noteComponents.at(index).get('quantity') as FormControl;
  getServiceName = (index: number): FormControl =>
    this.noteComponents.at(index).get('service') as FormControl;
  getPricedServicesForSelectedClientType = (clientTypeId: number) =>
    this.ServicesDataSource.filter((service) =>
      service.servicePricePerClientTypes.some(
        (option) => option.clientTypeId === clientTypeId
      )
    );
  getServicePriceForClientType = (serviceId: number) =>
    +(
      this.ServicesDataSource.find(
        (service) => service.id === serviceId
      )?.servicePricePerClientTypes.find(
        (option) => option.clientTypeId === this.data.clientTypeId
      )?.price ?? 0
    );
  getServiceOriginalPriceForClientType = (serviceId: number) =>
    +(
      this.ServicesDataSource.find(
        (service) => service.id === serviceId
      )?.servicePricePerClientTypes.find(
        (option) => option.clientTypeId === this.data.clientTypeId
      )?.originalPrice ?? 0
    );

  setClientTypeId = (data: any) => this.clientTypeId.setValue(data);
  setClientId = (data: any) => this.clientId.setValue(data);
  setServiceId = (index: number, data: any) =>
    this.noteComponents.at(index).get('serviceId')?.setValue(data);

  ngOnInit(): void {
    this.matDialogRef.disableClose = true;
    this.forkJoins();
  }

  subscribeFormMoneyChanges() {
    this.Form.valueChanges.subscribe((changes) => {
      const noteComponents = changes.noteComponents as NoteComponent[];
      let originalPrice = 0;
      let actualPrice = 0;
      noteComponents.forEach((noteComponent, index) => {
        this.serviceOriginalPriceFormControl(index).setValue(
          +(
            this.ServicesDataSource.find(
              (service) => service.id === noteComponent.serviceId
            )?.servicePricePerClientTypes.find(
              (option) => option.clientTypeId == this.clientTypeId.value
            )?.originalPrice ?? 0
          ),
          { emitEvent: false }
        );
        this.servicePriceFormControl(index).setValue(
          +(
            this.ServicesDataSource.find(
              (service) => service.id === noteComponent.serviceId
            )?.servicePricePerClientTypes.find(
              (option) => option.clientTypeId == this.clientTypeId.value
            )?.price ?? 0
          ),
          { emitEvent: false }
        );
        originalPrice +=
          +this.serviceOriginalPriceFormControl(index).value *
          +this.serviceQuantityFormControl(index).value;
        actualPrice +=
          +this.servicePriceFormControl(index).value *
          +this.serviceQuantityFormControl(index).value;
      });
      const earning = +actualPrice - +originalPrice;
      const finalPrice = +actualPrice + +this.teacherPrice.value;
      this.originalPrice.setValue(originalPrice, { emitEvent: false });
      this.actualPrice.setValue(actualPrice, { emitEvent: false });
      this.earning.setValue(earning, { emitEvent: false });
      this.finalPrice.setValue(finalPrice, { emitEvent: false });
    });
  }

  subscribeClientTypeChange() {
    this.subscriptions.push(
      this.clientTypeId.valueChanges
        .pipe(
          startWith(this.clientTypeId.value),
          filter((id) => !!id),
          switchMap((id) => this._client.getAllByType(id))
        )
        .subscribe({
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
        })
    );
  }

  private forkJoins() {
    let observables = [
      this._note.getStages(),
      this._note.getTerms(),
      this._clientType.getAll(),
      this._service.GetAllPriced(),
    ];
    return forkJoin(observables)
      .pipe(
        map(
          ([
            stagesResponse,
            termsResponse,
            clientTypeResponse,
            serviceResponse,
          ]) => {
            return {
              stages: stagesResponse,
              terms: termsResponse,
              clientsType: clientTypeResponse,
              services: serviceResponse,
            };
          }
        )
      )
      .subscribe({
        next: (response) => {
          this.TermsDataSource = response.terms.body;
          let emptyTerm: Term = { id: null, name: 'بدون' };
          this.TermsDataSource.unshift(emptyTerm);
          this.StagesDataSource = response.stages.body;
          let emptyStage: Stage = { id: null, name: 'بدون' };
          this.StagesDataSource.unshift(emptyStage);
          this.ServicesDataSource = response.services.body;
          this.ClientTypesDataSource = (
            response.clientsType.body as ClientType[]
          ).filter((clientType) =>
            this.ServicesDataSource.some((service) =>
              service.servicePricePerClientTypes.some(
                (option) => option.clientTypeId === clientType.id
              )
            )
          );
        },
        error: (e) => {
          this.isSubmitting = false;
          let res: Response = e.error ?? e;
          this.toastr.error(res.message);
        },
        complete: () => {
          if (this.data) this.patchData();
          this.subscribeClientTypeChange();
          this.subscribeFormMoneyChanges();
        },
      });
  }

  patchData = () => {
    this.data.noteComponents.forEach((noteComponent, index) => {
      this.handleNewNoteComponent();
      this.servicePriceFormControl(index).setValue(
        this.getServicePriceForClientType(noteComponent.serviceId),
        { emitEvent: false }
      );
      this.serviceOriginalPriceFormControl(index).setValue(
        this.getServiceOriginalPriceForClientType(noteComponent.serviceId),
        { emitEvent: false }
      );
    });
    this.Form.patchValue(this.data, { emitEvent: false });
  };

  createFormItem(type: string): FormGroup {
    let formItem: FormGroup = this.fb.group({});
    switch (type) {
      case 'init':
        formItem = this.fb.group({
          id: [0],
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
        });
        break;
      case 'noteComponent':
        formItem = this.fb.group({
          id: [0],
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
    this.noteComponents.push(this.createFormItem('noteComponent'));
  };

  handleDeleteNoteComponent = (index: number) => {
    if (this.data)
      this.deletedComponents.push(this.getNoteComponentId(index).value);
    this.noteComponents.removeAt(index);
  };

  resetFormMoney() {
    this.originalPrice.setValue(0, { emitEvent: false });
    this.actualPrice.setValue(0, { emitEvent: false });
    this.earning.setValue(0, { emitEvent: false });
    this.finalPrice.setValue(0, { emitEvent: false });
  }

  getSelectedFiles = (file: File | null) => {
    if (!file) {
      this.fileName.setValue(null);
      return;
    }
    if (file.type !== 'application/pdf') {
      this.toastr.error('يجب ان يكون صيغة الملف PDF');
      this.fileName.setValue(null);
      return;
    }
    this.selectedFile = file;
  };

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.id.value) {
        this.subscriptions.push(
          this._note.deleteNoteComponents(this.deletedComponents).subscribe({
            error: (e) => {
              this.isSubmitting = false;
              let res: Response = e.error ?? e;
              this.toastr.error(res.message);
            },
            complete: () => {
              this.subscriptions.push(
                this._note
                  .updateFormData(
                    this.id.value,
                    this.Form.value,
                    this.selectedFile,
                    'pdf'
                  )
                  .subscribe(this.addAndUpdateFormDataObserver())
              );
            },
          })
        );
      } else {
        this.subscriptions.push(
          this._note
            .addFormData(this.Form.value, this.selectedFile, 'pdf')
            .subscribe(this.addAndUpdateFormDataObserver())
        );
      }
    }
  }

  addAndUpdateFormDataObserver():
    | Partial<Observer<HttpEvent<Object>>>
    | (((value: HttpEvent<Object>) => void) | undefined) {
    return {
      next: (res) => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((res.loaded / (res.total ?? 1)) * 100);
        } else if (res.type === HttpEventType.Response) {
          this.service.dialogData = (res.body as Response).body;
          this.matDialogRef.close({ data: res.body });
        }
      },
      error: (e) => {
        this.isSubmitting = false;
        let res: Response = e.error ?? e;
        this.toastr.error(res.message);
      },
      complete: () => {
        this.isSubmitting = false;
      },
    };
  }
}
