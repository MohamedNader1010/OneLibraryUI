import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServicePricePerClientTypeService } from '../../services/service-price-per-client-type.service';
import { ServicesService } from 'src/Modules/service/services/services.service';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { forkJoin, map, takeUntil } from 'rxjs';
import { ServicePricePerClientType } from '../../Interfaces/ServicePricePerClientType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from 'src/Modules/clientType/interFaces/IclientType';
import { Service } from 'src/Modules/service/interfaces/Iservice';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-type-per-client-form-dialog',
  templateUrl: './service-type-per-client-form-dialog.component.html',
  styleUrls: ['./service-type-per-client-form-dialog.component.css'],
})
export class ServiceTypePerClientFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  public servicesDataSource: Service[] = [];
  public clientsTypeDataSource: ClientType[] = [];
  clientTypeLoading = false;
  serviceLoading = false;

  constructor(
    matDialogRef: MatDialogRef<ServiceTypePerClientFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicePricePerClientType,
    translateService: TranslateService,
    toastrService: ToastrService,
    private _serviceService: ServicesService,
    private _clientTypeService: ClientTypeService,
    databaseService: ServicePricePerClientTypeService,
    fb: FormBuilder,
  ) {
    super(matDialogRef, translateService, databaseService, toastrService);
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
    let observalbles = [this._serviceService.getAll(), this._clientTypeService.getAll()];
    return forkJoin(observalbles)
      .pipe(
        // tap(() => (this.clientTypeLoading  = this.serviceLoading = true)),
        map(([serviceResponse, clientTypeResponse]) => {
          return {
            services: serviceResponse,
            clientsTypes: clientTypeResponse,
          };
        }),
        takeUntil(this.destroy$),
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
}
