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
    @Inject(MAT_DIALOG_DATA) private data: Supplier,
    translate: TranslateService,
    _suppler: SupplierService,
    private fb: FormBuilder,
    matDialogRef: MatDialogRef<SupplierFormDialogComponent>,
    toastr: ToastrService,
  ) {
    super(matDialogRef, translate, _suppler, toastr);
    this.initiateFormControls();
  }

  get id(): FormControl {
    return this.Form.get('id') as FormControl;
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get phone(): FormControl {
    return this.Form.get('phoneNumber') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
    });
  }

  ngOnInit(): void {
    if (this.data) this.Form.patchValue(this.data);
  }

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      if (this.id.value) this.update(this.data.id, this.Form.value);
      else this.add(this.Form.value);
    }
  }
}
