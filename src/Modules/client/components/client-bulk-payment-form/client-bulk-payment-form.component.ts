import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CommitmentAndDueFormDialogComponent } from '../../../commitment-and-due/components/commitment-and-due-form-dialog/commitment-and-due-form-dialog.component';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { ClientService } from '../../services/client.service';
import { Client } from '../../interFaces/Iclient';

@Component({
  selector: 'app-client-bulk-payment-form',
  templateUrl: './client-bulk-payment-form.component.html',
  styleUrls: ['./client-bulk-payment-form.component.css'],
})
export class ClientBulkPaymentFormComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    dialogRef: MatDialogRef<CommitmentAndDueFormDialogComponent>,
    override databaseService: ClientService,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, databaseService, toastrService);
    this.Form = this._fb.group({
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

  override handleSubmit() {
    if (this.Form.valid) {
      const id = this.id?.value;
      this.isSubmitting = true;
      this.databaseService.bulkPayment(this.Form.value).subscribe({
        next: (data) => {
          this.toastrService.success(data.message);
          this.matDialogRef.close();
        },
        error: () => {
          this.isSubmitting = false;
        },
      });
    }
  }
}
