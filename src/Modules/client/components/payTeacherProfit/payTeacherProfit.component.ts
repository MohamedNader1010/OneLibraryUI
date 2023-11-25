import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Material } from 'src/Modules/material/interfaces/Imaterial';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';
import { ClientService } from '../../services/client.service';
import { TeacherProfitResponse } from '../../interFaces/IteacherProfitResponse';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-payTeacherProfit',
  templateUrl: './payTeacherProfit.component.html',
  styleUrls: ['./payTeacherProfit.component.css'],
})
export class PayTeacherProfitComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  constructor(
    public dialogRef: MatDialogRef<PayTeacherProfitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeacherProfitResponse,
    private _databaseService: ClientService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, _databaseService, toastrService);
    this.Form = this._fb.group({
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

  override handleSubmit() {
    if (this.Form.valid) {
      this.isSubmitting = true;
      this.pay();
    }
  }

  pay() {
    this._databaseService
      .addTeacherEarning(this.Form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.data.paidToTeacher += this.amount.value;
          this.data.rest -= this.amount.value;
          this.dialogRef.close({ res: res, row: this.data });
        },
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.isSubmitting = false;
        },
      });
  }
}
