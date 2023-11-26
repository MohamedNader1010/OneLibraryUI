import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { ServiceType } from '../../../../data/project-management/models/serviceType.model';
import { ServicesTypeService } from '../../../../data/project-management/repositories/serviceType.service';

@Component({
  selector: 'app-service-type-form-dialog',
  templateUrl: './service-type-form-dialog.component.html',
  styleUrls: ['./service-type-form-dialog.component.css'],
})
export class ServiceTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  constructor(
    matDialogRef: MatDialogRef<ServiceTypeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceType,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    _databaseService: ServicesTypeService,
    translateService: TranslateService,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }

  ngOnInit(): void {
    if (this.data) this.Form.patchValue(this.data);
  }
}
