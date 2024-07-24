import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { MaterialService } from '../../../../core/data/services/material.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-material-form-dialog',
  templateUrl: './material-form-dialog.component.html',
  styleUrls: ['./material-form-dialog.component.css'],
})
export class MaterialFormDialogComponent extends BaseForm implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private _data: Material, private _databaseService: MaterialService, private _fb: FormBuilder, override matDialogRef: MatDialogRef<MaterialFormDialogComponent>) {
    super();
    this.initiateFormControls();
  }

  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get price(): FormControl {
    return this.Form.get('price') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required]],
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
