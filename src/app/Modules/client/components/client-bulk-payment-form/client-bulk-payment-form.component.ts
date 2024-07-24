import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommitmentAndDueFormDialogComponent } from '../../../commitment-and-due/components/commitment-and-due-form-dialog/commitment-and-due-form-dialog.component';
import { Client } from '../../../../core/data/models/client/Iclient';
import { ClientService } from '../../../../core/data/services/client.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-client-bulk-payment-form',
  templateUrl: './client-bulk-payment-form.component.html',
})
export class ClientBulkPaymentFormComponent extends BaseForm implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Client, override matDialogRef: MatDialogRef<CommitmentAndDueFormDialogComponent>, private databaseService: ClientService) {
    super();
    this.Form = this.fb.group({
      clientId: [0],
      amount: [0],
    });
  }

  get clientId(): FormControl {
    return this.Form.get('clientId') as FormControl;
  }

  get amount(): FormControl {
    return this.Form.get('amount') as FormControl;
  }

  ngOnInit() {
    this.clientId.setValue(this.data.id);
  }

  handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.databaseService.bulkPayment(this.Form.value).subscribe(this.closeDialogAndRefreshTable());
    }
  }
}
