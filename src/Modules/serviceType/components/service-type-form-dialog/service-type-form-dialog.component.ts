import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiceType } from '../../interFaces/IserviceType';
import { ServicesTypeService } from '../../services/serviceType.service';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceFormDialogComponent } from 'src/Modules/service/components/service-form-dialog/service-form-dialog.component';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';

@Component({
  selector: 'app-service-type-form-dialog',
  templateUrl: './service-type-form-dialog.component.html',
  styleUrls: ['./service-type-form-dialog.component.css']
})
export class ServiceTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  Form: FormGroup;
  isLoading = false;
  controllerName: string = 'serviceTypes';
  isSubmitted: boolean = false;
  constructor(
    private _serviceType: ServicesTypeService,
    private fb: FormBuilder,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: ServiceType,
    private matDialogRef: MatDialogRef<ServiceTypeFormDialogComponent>,
    private dialogService: DialogServiceService,
    private matDialogg: MatDialog
  ) {
    super(matDialogRef, dialogService, translate, matDialogg);
    this.Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  ngOnInit(): void {
    if (this.data)
      this.getSingle(this.data.id)
  }
  getSingle = (id: number) => {
    this.isLoading = true; 
    this.subscriptions.push(
      this._serviceType
        .getOne(id)
        .subscribe(
          (data: ServiceType[]) => {
            this.isLoading = false; 
            this.Form.patchValue(data)
          }))
  }
    


  handleSubmit() {
    if (this.Form.valid) {
      if (this.data)
        this.subscriptions.push(
          this._serviceType.update(this.data.id, this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
      else
        this.subscriptions.push(
          this._serviceType.add(this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
