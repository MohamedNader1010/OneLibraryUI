import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Supplier } from '../../../../core/data/models/supplier/ISupplier';
import { SupplierService } from '../../../../core/data/services/supplier.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-supplier-form-dialog',
  templateUrl: './supplier-form-dialog.component.html',
})
export class SupplierFormDialogComponent extends BaseForm implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private _data: Supplier, private _databaseService: SupplierService, override matDialogRef: MatDialogRef<SupplierFormDialogComponent>) {
    super();
    this.initiateFormControls();
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
    if (this._data) this.Form.patchValue(this._data);
  }

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
