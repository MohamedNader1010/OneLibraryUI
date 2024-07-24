import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, forkJoin } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { ServiceType } from '../../../../core/data/models/service-type/IserviceType';
import { Service } from '../../../../core/data/models/service/Iservice';
import { ClientTypeService } from '../../../../core/data/services/client-type.service';
import { MaterialService } from '../../../../core/data/services/material.service';
import { ServicesService } from '../../../../core/data/services/services.service';
import { ServicesTypeService } from '../../../../core/data/services/service-type.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-service-form-dialog',
  templateUrl: './service-form-dialog.component.html',
  styleUrls: ['./service-form-dialog.component.css'],
})
export class ServiceFormDialogComponent extends BaseForm implements OnInit {
  MaterialDataSource: Material[] = [];
  ServiceTypeDataSource: ServiceType[] = [];
  clientsTypesDataSource: ClientType[] = [];
  serviceTypeLoading = false;
  clientTypesLoading = false;
  materialLoading = false;

  constructor(
    override matDialogRef: MatDialogRef<ServiceFormDialogComponent>,
    private _databaseService: ServicesService,
    @Inject(MAT_DIALOG_DATA) public data: Service,
    private _serviceTypeService: ServicesTypeService,
    private _clientTypeService: ClientTypeService,
    private _materialService: MaterialService,
  ) {
    super();
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
    let formItem: FormGroup = this.fb.group({});
    switch (type) {
      case 'init':
        formItem = this.fb.group({
          id: [null],
          name: ['', [Validators.required, Validators.maxLength(100)]],
          serviceTypeId: [null, [Validators.required]],
          serviceMaterials: this.fb.array([]),
          servicePricePerClientTypes: this.fb.array([]),
        });
        break;
      case 'servicePricePerClientTypes':
        formItem = this.fb.group({
          id: [null],
          price: [null, [Validators.required]],
          clientTypeId: [null, [Validators.required]],
        });
        break;
      case 'serviceMaterials':
        formItem = this.fb.group({
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
    let observalbles = [this._materialService.getAllOverview(), this._serviceTypeService.getAll(), this._clientTypeService.getAll()];
    return forkJoin(observalbles)
      .pipe(
        map(([materialResponse, serviceTypeResponse, clientTypeResponse]) => {
          return {
            materials: materialResponse,
            servicesTypes: serviceTypeResponse,
            clientsTypes: clientTypeResponse,
          };
        }),
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

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
