import { Component, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { Order } from '../../../../data/project-management/models/order.model';
import { OrderService } from '../../../../data/project-management/repositories/orders.service';
import { ValidatePaid } from '../../validators/customValidator';

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
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.isSubmitting = false;
        },
      });
  }
}
