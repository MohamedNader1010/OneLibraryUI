import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ValidatePaid } from '../../validators/customValidator';
import { Order } from '../../../../core/data/models/order/Iorder';
import { OrderService } from '../../../../core/data/services/orders.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent extends BaseForm {
  constructor(override matDialogRef: MatDialogRef<TransactionComponent>, @Inject(MAT_DIALOG_DATA) public data: Order, private _databaseService: OrderService, public dialog: MatDialog) {
    super();
    this.Form = this.fb.group({
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
    this.paid.valueChanges.subscribe((paidValue) => {
      this.rest.setValue(+this.data.rest - paidValue);
    });
  }
  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    this._databaseService.addOrderTransaction(this.Form.value).subscribe(this.closeDialogAndRefreshTable());
  }
}
