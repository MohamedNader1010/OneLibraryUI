import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ClientTypeService } from 'src/app/core/data/services/client-type.service';
import { forkJoin, map } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { ServicePricePerClientType } from '../../../../core/data/models/service-price-per-client-type/ServicePricePerClientType';
import { Service } from '../../../../core/data/models/service/Iservice';
import { ServicePricePerClientTypeService } from '../../../../core/data/services/service-price-per-client-type.service';
import { ServicesService } from '../../../../core/data/services/services.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-service-type-per-client-form-dialog',
  templateUrl: './service-type-per-client-form-dialog.component.html',
})
export class ServiceTypePerClientFormDialogComponent extends BaseForm implements OnInit {
  public servicesDataSource: Service[] = [];
  public clientsTypeDataSource: ClientType[] = [];
  clientTypeLoading = false;
  serviceLoading = false;

  constructor(
    override matDialogRef: MatDialogRef<ServiceTypePerClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicePricePerClientType,
    private _serviceService: ServicesService,
    private _clientTypeService: ClientTypeService,
    private _databaseService: ServicePricePerClientTypeService,
    fb: FormBuilder,
  ) {
    super();
    this.Form = fb.group({
      id: [null],
      price: [0, [Validators.required]],
      serviceId: [null, [Validators.required]],
      clientTypeId: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.forkJoins();
  }
  get price(): FormControl {
    return this.Form.get('price') as FormControl;
  }
  get serviceId(): FormControl {
    return this.Form.get('serviceId') as FormControl;
  }
  get clientTypeId(): FormControl {
    return this.Form.get('clientTypeId') as FormControl;
  }

  forkJoins() {
    this.clientTypeLoading = this.serviceLoading = true;
    let observalbles = [this._serviceService.getAllOverview(), this._clientTypeService.getAll()];
    return forkJoin(observalbles)
      .pipe(
        map(([serviceResponse, clientTypeResponse]) => {
          return {
            services: serviceResponse,
            clientsTypes: clientTypeResponse,
          };
        }),
      )
      .subscribe({
        next: (response) => {
          this.servicesDataSource = response.services.body;
          this.clientsTypeDataSource = response.clientsTypes.body;
        },
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.clientTypeLoading = this.serviceLoading = false;
          if (this.data) this.Form.patchValue(this.data);
        },
      });
  }

  setServiceId = (data: any) => this.serviceId.setValue(data);
  setClientTypeId = (data: any) => this.clientTypeId.setValue(data);

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
