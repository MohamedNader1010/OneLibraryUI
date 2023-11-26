import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, forkJoin, tap, takeUntil } from 'rxjs';
import { Material } from 'src/app/core/data/project-management/models/material.model';
import { MaterialService } from 'src/app/core/data/project-management/repositories/material.service';
import { ServiceType } from 'src/app/core/data/project-management/models/serviceType.model';
import { ServicesTypeService } from 'src/app/core/data/project-management/repositories/serviceType.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { ClientType } from '../../../../data/project-management/models/clientType.model';
import { Service } from '../../../../data/project-management/models/service.model';
import { ClientTypeService } from '../../../../data/project-management/repositories/clientType.service';
import { ServicesService } from '../../../../data/project-management/repositories/services.service';
@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.css'],
})
export class ServiceFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  ServiceTypeDataSource: ServiceType[] = [];
  clientsTypesDataSource: ClientType[] = [];
  serviceTypeLoading = false;
  clientTypesLoading = false;
  materialLoading = false;

  constructor(
    matDialogRef: MatDialogRef<ServiceFormDialogComponent>,
    translateService: TranslateService,
    _databaseService: ServicesService,
    toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private _serviceTypeService: ServicesTypeService,
    private _clientTypeService: ClientTypeService,
    private _materialService: MaterialService,
    private _fb: FormBuilder,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.Form = this.createFormItem('init');
  }

  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }

  get serviceTypeId(): FormControl {
    return this.Form.get('serviceTypeId') as FormControl;
  }

  get serviceMaterials(): FormArray {
    return this.Form.get('serviceMaterials') as FormArray;
  }

  get servicePricePerClientTypes(): FormArray {
    return this.Form.get('servicePricePerClientTypes') as FormArray;
  }

  ngOnInit(): void {
    this.forkJoins();
  }

  getServiceMaterial = (index: number): FormControl => this.serviceMaterials.at(index).get('materialId') as FormControl;
  getServiceMaterialQuantity = (index: number): FormControl => this.serviceMaterials.at(index).get('quantity') as FormControl;

  getServicePrice = (index: number): FormControl => this.servicePricePerClientTypes.at(index).get('price') as FormControl;
  getServicePriceClientTypeId = (index: number): FormControl => this.servicePricePerClientTypes.at(index).get('clientTypeId') as FormControl;

  createFormItem(type: string): FormGroup {
    let formItem: FormGroup = this._fb.group({});
    switch (type) {
      case 'init':
        formItem = this._fb.group({
          id: [null],
          name: ['', [Validators.required, Validators.maxLength(100)]],
          serviceTypeId: [null, [Validators.required]],
          serviceMaterials: this._fb.array([]),
          servicePricePerClientTypes: this._fb.array([]),
        });
        break;
      case 'servicePricePerClientTypes':
        formItem = this._fb.group({
          id: [null],
          price: [null, [Validators.required]],
          clientTypeId: [null, [Validators.required]],
        });
        break;
      case 'serviceMaterials':
        formItem = this._fb.group({
          id: [null],
          materialId: [null, [Validators.required]],
          quantity: [1, [Validators.required]],
        });
        break;
    }
    return formItem;
  }

  handleNewServicePrice = () => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes'));

  handleDeleteServicePrice = (index: number) => this.servicePricePerClientTypes.removeAt(index);

  handleNewServiceMaterial = () => this.serviceMaterials.push(this.createFormItem('serviceMaterials'));

  handleDeleteServiceMaterial = (index: number) => this.serviceMaterials.removeAt(index);

  private forkJoins() {
    this.clientTypesLoading = this.materialLoading = this.serviceTypeLoading = true;
    let observalbles = [this._materialService.getAll(), this._serviceTypeService.getAll(), this._clientTypeService.getAll()];
    return forkJoin(observalbles)
      .pipe(
        // tap(() => (this.clientTypesLoading = this.materialLoading = this.serviceTypeLoading = true)),
        map(([materialResponse, serviceTypeResponse, clientTypeResponse]) => {
          return {
            materials: materialResponse,
            servicesTypes: serviceTypeResponse,
            clientsTypes: clientTypeResponse,
          };
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.MaterialDataSource = response.materials.body;
          this.ServiceTypeDataSource = response.servicesTypes.body;
          this.clientsTypesDataSource = response.clientsTypes.body;
        },
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.materialLoading = this.clientTypesLoading = this.serviceTypeLoading = false;
          if (this.data) {
            this.data.serviceMaterials.forEach(() => this.serviceMaterials.push(this.createFormItem('serviceMaterials')));
            this.data.servicePricePerClientTypes.forEach(() => this.servicePricePerClientTypes.push(this.createFormItem('servicePricePerClientTypes')));
            this.Form.patchValue(this.data);
          }
        },
      });
  }

  setServiceTypeId = (data: any) => this.serviceTypeId.setValue(data);
  setServiceMaterialId = (index: number, data: any) => this.getServiceMaterial(index).setValue(data);
  setServicePriceClientTypeId = (index: number, data: any) => this.getServicePriceClientTypeId(index).setValue(data);
}
