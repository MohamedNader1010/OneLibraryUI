import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { ClientTypeService } from '../../../../core/data/services/client-type.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-client-type-form-dialog',
  templateUrl: './client-type-form-dialog.component.html',
  styleUrls: ['./client-type-form-dialog.component.css'],
})
export class ClientTypeFormDialogComponent extends BaseForm implements OnInit {
  controllerName: string = 'clientTypes';
  constructor(private _databaseService: ClientTypeService, @Inject(MAT_DIALOG_DATA) public data: ClientType, override matDialogRef: MatDialogRef<ClientTypeFormDialogComponent>) {
    super();
    this.Form = this.fb.group({
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

  public add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  public update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
