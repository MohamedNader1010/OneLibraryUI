import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeacherProfitResponse } from '../../../../core/data/models/client/IteacherProfitResponse';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { ClientService } from '../../../../core/data/services/client.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-payTeacherProfit',
  templateUrl: './payTeacherProfit.component.html',
  styleUrls: ['./payTeacherProfit.component.css'],
})
export class PayTeacherProfitComponent extends BaseForm implements OnInit {
  MaterialDataSource: Material[] = [];
  constructor(override matDialogRef: MatDialogRef<PayTeacherProfitComponent>, @Inject(MAT_DIALOG_DATA) public data: TeacherProfitResponse, private _databaseService: ClientService) {
    super();
    this.Form = this.fb.group({
      date: [new Date()],
      amount: [null, [Validators.min(0.1)]],
      clientId: [null],
    });
  }
  get amount(): FormControl {
    return this.Form.get('amount') as FormControl;
  }
  get clientId(): FormControl {
    return this.Form.get('clientId') as FormControl;
  }

  ngOnInit() {
    this.clientId.setValue(this.data.clientId);
    this.amount.addValidators(Validators.max(this.data.rest));
  }

  handleSubmit() {
    if (!this.Form.valid) return;

    this.isSubmitting = true;
    this._databaseService.addTeacherEarning(this.Form.value).subscribe({
      next: (res) => {
        // this.data.paidToTeacher += this.amount.value;
        // this.data.rest -= this.amount.value;
        this.tableCommunicationService.reloadTable$.next();
        this.data.totalCollected = this.data.totalCollected + this.amount.value;
        this.data.totalPending = this.data.totalPending - this.amount.value;
        this.data.rest = this.data.rest - this.amount.value;
        this.matDialogRef.close({ res: res, row: this.data });
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}
