import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Material } from '../../../material/interfaces/Imaterial';
import { TranslateService } from '@ngx-translate/core';
import { TransactionSource } from '../../../shared/enums/TransactionSource.emun';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TransactionStatus } from '../../../shared/enums/TransactionStatus.enum';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { CommitmentAndDue } from '../../interfaces/Icommitment-and-due.interface';
import { CommitmentAndDueService } from '../../services/commitment-and-due.service';
import { takeUntil } from 'rxjs';
import { TransactionType } from '../../../shared/enums/TransactionType.enum';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './commitment-and-due-transaction-form-dialog.html',
  styleUrls: ['./commitment-and-due-transaction-form-dialog.css'],
})
export class CommitmentAndDueTransactionFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  transactionSource: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<CommitmentAndDueTransactionFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommitmentAndDue,
    private _databaseService: CommitmentAndDueService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, _databaseService, toastrService);
    this.transactionSource = [
      { value: TransactionSource.IcoumeOutcome, name: 'اليومية' },
      { value: TransactionSource.Bank, name: 'البنك' },
    ];
    this.Form = this._fb.group({
      commitmentAndDueId: [data.id],
      amount: [0],
      status: [null],
      source: [TransactionSource.IcoumeOutcome],
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
    this.amount.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((paidValue) => {
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
      this.addIncomeOutcome();
    }
  }

  addIncomeOutcome() {
    this.status.setValue(this.data.type === TransactionType.استحقاق ? TransactionStatus.وارد : TransactionStatus.صادر);
    this._databaseService.AddTransaction(this.Form.value).subscribe({
      next: (res) => {
        this._databaseService.DialogData = res.body;
        this.dialogRef.close({ data: res });
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
