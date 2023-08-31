import { Component, Inject, OnInit } from '@angular/core';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../interfaces/ISupplier';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-form-dialog',
  templateUrl: './supplier-form-dialog.component.html',
  styleUrls: ['./supplier-form-dialog.component.css'],
})
export class SupplierFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: Supplier,
    translateService: TranslateService,
    _databaseService: SupplierService,
    private _fb: FormBuilder,
    matDialogRef: MatDialogRef<SupplierFormDialogComponent>,
    toastrService: ToastrService,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.initiateFormControls();
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get phone(): FormControl {
    return this.Form.get('phoneNumber') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
    });
  }

  ngOnInit(): void {
    if (this._data) this.Form.patchValue(this._data);
  }
}
