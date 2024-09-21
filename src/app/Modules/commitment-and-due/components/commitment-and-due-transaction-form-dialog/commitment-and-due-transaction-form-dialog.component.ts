import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommitmentAndDue } from '../../../../core/data/models/commitment-and-due/Icommitment-and-due.interface';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { CommitmentAndDueService } from '../../../../core/data/services/commitment-and-due.service';
import { TransactionSource } from '../../../../shared/enums/TransactionSource.enum';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { TransactionType } from '../../../../shared/enums/TransactionType.enum';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './commitment-and-due-transaction-form-dialog.html',
  styleUrls: ['./commitment-and-due-transaction-form-dialog.css'],
})
export class CommitmentAndDueTransactionFormDialogComponent extends BaseForm implements OnInit {
  MaterialDataSource: Material[] = [];
  transactionSource: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<CommitmentAndDueTransactionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommitmentAndDue,
    private _databaseService: CommitmentAndDueService,
  ) {
    super();
    this.transactionSource = [
      { value: TransactionSource.daily, name: 'اليومية' },
      { value: TransactionSource.Bank, name: 'البنك' },
    ];
    this.Form = this.fb.group({
      commitmentAndDueId: [data.id],
      amount: [0],
      status: [null],
      source: [TransactionSource.daily],
      comment: ['', [Validators.required]],
      previousPaid: [data.paid],
      rest: [data.rest],
    });
  }

  get commitmentAndDueId(): FormControl {
    return this.Form.get('commitmentAndDueId') as FormControl;
  }

  get amount(): FormControl {
    return this.Form.get('amount') as FormControl;
  }

  get previousPaid(): FormControl {
    return this.Form.get('previousPaid') as FormControl;
  }

  get rest(): FormControl {
    return this.Form.get('rest') as FormControl;
  }

  get status(): FormControl {
    return this.Form.get('status') as FormControl;
  }

  get source(): FormControl {
    return this.Form.get('source') as FormControl;
  }

  get comment(): FormControl {
    return this.Form.get('comment') as FormControl;
  }

  ngOnInit() {
    this.onPaidControlChange();
  }

  onPaidControlChange() {
    this.amount.valueChanges.subscribe((paidValue) => {
      if (this.data.type === TransactionType.استحقاق) {
        this.rest.setValue(+this.data.rest + paidValue);
      } else {
        this.rest.setValue(+this.data.rest - paidValue);
      }
    });
  }

  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.status.setValue(this.data.type === TransactionType.استحقاق ? TransactionStatus.Debit : TransactionStatus.Credit);
      this._databaseService.AddTransaction(this.Form.value).subscribe(this.closeDialogAndRefreshTable());
    }
  }
}
