import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormBuilder, Validators, FormControl} from '@angular/forms';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ClientService} from '../../services/client.service';
import {ToastrService} from 'ngx-toastr';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../interFaces/Iclient';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.css'],
})
export class ClientFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  ClientTypeDataSource: ClientType[] = [];
  isLoading = false;
  constructor(
    toastrService: ToastrService,
    _databaseService: ClientService,
    private _clientType: ClientTypeService,
    private _fb: FormBuilder,
    translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    matDialogRef: MatDialogRef<ClientFormDialogComponent>,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
      clientTypeId: ['', [Validators.required]],
    });
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get phone(): FormControl {
    return this.Form.get('phoneNumber') as FormControl;
  }
  get clientTypeId(): FormControl {
    return this.Form.get('clientTypeId') as FormControl;
  }
  ngOnInit(): void {
    this.getAllClientTypes();
    if (this.data) this.Form.patchValue(this.data);
  }
  getAllClientTypes = () =>
    this._clientType
      .getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.ClientTypeDataSource = data.body;
        }
      });
}
