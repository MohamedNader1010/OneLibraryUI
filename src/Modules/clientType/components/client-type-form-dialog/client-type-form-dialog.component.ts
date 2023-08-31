import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ClientTypeService} from '../../services/clientType.service';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from '../../interFaces/IclientType';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-type-form-dialog',
  templateUrl: './client-type-form-dialog.component.html',
  styleUrls: ['./client-type-form-dialog.component.css'],
})
export class ClientTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  controllerName: string = 'clientTypes';
  constructor(
    _databaseService: ClientTypeService,
    private _fb: FormBuilder,
    translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: ClientType,
    matDialogRef: MatDialogRef<ClientTypeFormDialogComponent>,
    toastrService: ToastrService,
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
