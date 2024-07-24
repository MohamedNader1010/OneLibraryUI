import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceType } from '../../../../core/data/models/service-type/IserviceType';
import { ServicesTypeService } from '../../../../core/data/services/service-type.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-service-type-form-dialog',
  templateUrl: './service-type-form-dialog.component.html',
  styleUrls: ['./service-type-form-dialog.component.css'],
})
export class ServiceTypeFormDialogComponent extends BaseForm implements OnInit {
  constructor(
    override matDialogRef: MatDialogRef<ServiceTypeFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServiceType,
    private _fb: FormBuilder,
    private _databaseService: ServicesTypeService,
  ) {
    super();
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

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
