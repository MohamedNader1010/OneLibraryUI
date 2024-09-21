import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { Transaction } from '../../../../core/data/models/money-transaction/ITransaction';
import { MoneyTransactionService } from '../../../../core/data/services/money-transaction.service';
import { TransactionSource } from '../../../../shared/enums/TransactionSource.enum';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends BaseForm implements OnInit {
  MaterialDataSource: Material[] = [];
  incomeOutcomeSources: any[] = [];
  transactionStatuses: any[] = [];
  constructor(override matDialogRef: MatDialogRef<FormDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Transaction, private _databaseService: MoneyTransactionService) {
    super();
    this.incomeOutcomeSources = [
      { value: TransactionSource.daily, name: 'اليومية' },
      { value: TransactionSource.Bank, name: 'البنك' },
    ];
    this.transactionStatuses = [
      { value: TransactionStatus.Debit, name: 'صادر' },
      { value: TransactionStatus.Credit, name: 'وارد' },
    ];
    this.Form = this.fb.group({
      status: [TransactionStatus.Debit],
      source: [TransactionSource.daily],
      amount: [0, [Validators.min(0.00001)]],
      comment: [''],
    });
  }
  get amount(): FormControl {
    return this.Form.get('amount') as FormControl;
  }
  get materialId(): FormControl {
    return this.Form.get('materialId') as FormControl;
  }
  get status(): FormControl {
    return this.Form.get('status') as FormControl;
  }
  get source(): FormControl {
    return this.Form.get('source') as FormControl;
  }

  ngOnInit() {
    if (this.data) this.Form.patchValue(this.data);
  }

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    this._databaseService.add(this.Form.value).subscribe(this.closeDialogAndRefreshTable());
  }
}
