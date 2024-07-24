import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { ClientTypeService } from 'src/app/core/data/services/client-type.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from '../../../../core/data/models/client-type/IclientType';
import { Client } from '../../../../core/data/models/client/Iclient';
import { ClientService } from '../../../../core/data/services/client.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-client-form-dialog',
  templateUrl: './client-form-dialog.component.html',
  styleUrls: ['./client-form-dialog.component.css'],
})
export class ClientFormDialogComponent extends BaseForm implements OnInit {
  ClientTypeDataSource: ClientType[] = [];
  isLoading = false;
  constructor(
    private _databaseService: ClientService,
    private _clientType: ClientTypeService,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    override matDialogRef: MatDialogRef<ClientFormDialogComponent>,
  ) {
    super();
    this.Form = this.fb.group({
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
    this._clientType.getAll().subscribe({
      next: (data) => {
        this.ClientTypeDataSource = data.body;
      },
    });

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
