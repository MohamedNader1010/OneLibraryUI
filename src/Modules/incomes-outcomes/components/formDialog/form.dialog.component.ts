import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IncomesOutcomesService } from '../../services/Incomes-outcomes.service';
import { Material } from './../../../material/interfaces/Imaterial';
import { TranslateService } from '@ngx-translate/core';
import { IncomeOutcome } from '../../interfaces/Iincome-outcome';
import { TransactionSource } from '../../../shared/enums/TransactionSource.emun';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TransactionStatus } from '../../../shared/enums/TransactionStatus.enum';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  incomeOutcomeSources: any[] = [];
  transactionStatuses: any[] = [];
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
      { value: TransactionSource.IncomeOutcome, name: 'اليومية' },
      { value: TransactionSource.Bank, name: 'البنك' },
    ];
    this.transactionStatuses = [
      { value: TransactionStatus.صادر, name: 'صادر' },
      { value: TransactionStatus.وارد, name: 'وارد' },
    ];
    this.Form = this._fb.group({
      status: [TransactionStatus.وارد],
      source: [TransactionSource.IncomeOutcome],
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
    this._databaseService.add(this.Form.value).subscribe({
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
