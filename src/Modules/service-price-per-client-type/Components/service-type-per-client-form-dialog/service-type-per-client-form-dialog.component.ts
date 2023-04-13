import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ServicePricePerClientTypeService } from '../../API_Services/service-price-per-client-type.service';
import { ServicesService } from 'src/Modules/service/services/services.service';
import { KeyValuePairs } from 'src/Persistents/KeyValuePairs';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { Subscription } from 'rxjs';
import { ServicePricePerClientType } from '../../Interfaces/ServicePricePerClientType';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-type-per-client-form-dialog',
  templateUrl: './service-type-per-client-form-dialog.component.html',
  styleUrls: ['./service-type-per-client-form-dialog.component.css']
})
export class ServiceTypePerClientFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  public form: FormGroup;
  public servicesNames: KeyValuePairs[] = [];
  public clientsType: KeyValuePairs[] = [];
  isLoading = false;
  isSubmitted: boolean = false;
  constructor(
    private service: ServicePricePerClientTypeService,
    private fb: FormBuilder,
    private services: ServicesService,
    private clientTypeService: ClientTypeService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: ServicePricePerClientType,
    private matDialogRef: MatDialogRef<ServiceTypePerClientFormDialogComponent>,
    private dialogService: DialogServiceService,
    private matDialogg: MatDialog
  ) {
    super(matDialogRef, dialogService, translate, matDialogg);
    this.form = fb.group({
      price: ['', [Validators.required]],
      serviceId: ['', [Validators.required]],
      clientTypeId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.services.getAll().subscribe((data) => {
        this.mappingData(data, this.servicesNames);
      })
    );
    this.subscriptions.push(
      this.clientTypeService.getAll().subscribe((data) => {
        this.mappingData(data, this.clientsType);
      })
    );
    if (this.data)
    this.form.patchValue(this.data);
  }


  get f() {
    return this.form.controls;
  }
  mappingData(data: any, mappedObject: any) {
    data.forEach((obj: any) => {
      mappedObject.push({ id: obj.id, name: obj.name });
    });
  }
  submit() {
    if (this.form.valid) {
      if (this.data)
        this.subscriptions.push(
          this.service.update(this.data.id, this.form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
      else
        this.subscriptions.push(
          this.service.add(this.form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
