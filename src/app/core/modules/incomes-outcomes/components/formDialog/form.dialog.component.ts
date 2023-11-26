import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { TransactionSource } from '../../../../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../../../../shared/enums/TransactionStatus.enum';
import { IncomeOutcome } from '../../../../data/project-management/models/income-outcome.model';
import { Material } from '../../../../data/project-management/models/material.model';
import { IncomesOutcomesService } from '../../../../data/project-management/repositories/Incomes-outcomes.service';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  incomeOutcomeSources: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IncomeOutcome,
    private _databaseService: IncomesOutcomesService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, _databaseService, toastrService);
    this.incomeOutcomeSources = [
      { value: TransactionSource.IcoumeOutcome, name: 'اليومية' },
      { value: TransactionSource.Bank, name: 'البنك' },
    ];
    this.Form = this._fb.group({
      status: [null],
      source: [TransactionSource.IcoumeOutcome],
      amount: [0],
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
    if (this.data) {
      this.Form.patchValue(this.data);
    }
  }

  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.addIncomeOutcome();
    }
  }

  addIncomeOutcome() {
    this.status.setValue(this.amount.value > 0 ? TransactionStatus.وارد : TransactionStatus.صادر);
    this._databaseService.add(this.Form.value).subscribe({
      next: (res) => {
        // if(this.source.value == IncomeOutcomeSource.IcoumeOutcome){
        this._databaseService.DialogData = res.body;
        // }
        this.dialogRef.close({ data: res });
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
