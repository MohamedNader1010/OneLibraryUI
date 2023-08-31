import { Component, Inject, OnDestroy } from "@angular/core";
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/orders.service';
import { ValidatePaid } from '../validators/customValidator';
import { Response } from 'src/Modules/shared/interfaces/Iresponse';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../interfaces/Iorder';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent extends FormsDialogCommonFunctionality implements OnDestroy {
  constructor(
    public dialogRef: MatDialogRef<TransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private _databaseService: OrderService,
    toastrService: ToastrService,
    public dialog: MatDialog,
    private _fb: FormBuilder,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, _databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      orderId: [0, [Validators.required]],
      paid: [null, [Validators.required], [ValidatePaid(this._databaseService, this.data.id)]],
      previousPaid: [data.paid],
      rest: [data.rest],
    });
    if (this.data) {
      this.orderId.setValue(this.data.id);
      this.onPaidControlChange();
    }
  }

  get orderId(): FormControl {
    return this.Form.get('orderId') as FormControl;
  }
  get paid(): FormControl {
    return this.Form.get('paid') as FormControl;
  }
  get rest(): FormControl {
    return this.Form.get('rest') as FormControl;
  }

  onPaidControlChange() {
    this.paid.valueChanges.pipe(takeUntil(this.destroy$)).subscribe((paidValue) => {
      this.rest.setValue(+this.data.rest - paidValue);
    });
  }
  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.addTransaction();
    }
  }

  addTransaction() {
    this._databaseService
      .addOrderTransaction(this.Form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this._databaseService.DialogData = res.body;
          this.dialogRef.close({ data: res });
        },
        error: (e) => {
          this.isSubmitting = false;
          let res: Response = e.error ?? e;
          this.toastrService.error(res.message);
        },
        complete: () => {
          this.isSubmitting = false;
        },
      });
  }
}
