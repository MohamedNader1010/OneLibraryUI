import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../../../employee/components/employee-form-dialog/employee-form-dialog.component';
import { Employee } from '../../../../core/data/models/employee/IEmployee';
import { BankService } from '../../../../core/data/services/bank.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-bank-form-dialog',
  templateUrl: './bank-form-dialog.component.html',
})
export class BankFormDialogComponent extends BaseForm {
  constructor(private _databaseService: BankService, @Inject(MAT_DIALOG_DATA) public data: Employee, override matDialogRef: MatDialogRef<EmployeeFormDialogComponent>) {
    super();
    this.initiateFormControls();
  }

  get startingBalance(): FormControl {
    return this.Form.get('startingBalance') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this.fb.group({
      id: [3],
      startingBalance: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.Form.valid) {
      this.setStartingBalance(this.Form.value);
    }
  }

  setStartingBalance = (values: any) => this._databaseService.SetStartingBalance(values).subscribe(this.closeDialogAndRefreshTable());
}
