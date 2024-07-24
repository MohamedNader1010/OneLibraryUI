import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeFormDialogComponent } from '../../../employee/components/employee-form-dialog/employee-form-dialog.component';
import { Employee } from '../../../../core/data/models/employee/IEmployee';
import { ShiftService } from '../../../../core/data/services/shift.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-close-start-shift-form-dialog',
  templateUrl: './close-start-shift-form-dialog.component.html',
})
export class CloseStartShiftFormDialogComponent extends BaseForm {
  constructor(private _databaseService: ShiftService, @Inject(MAT_DIALOG_DATA) public data: Employee, override matDialogRef: MatDialogRef<EmployeeFormDialogComponent>) {
    super();
    this.initiateFormControls();
  }

  get guarante(): FormControl {
    return this.Form.get('guarante') as FormControl;
  }
  get bankGuarante(): FormControl {
    return this.Form.get('bankGuarante') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this.fb.group({
      guarante: [null],
      bankGuarante: [null],
    });
  }

  handleSubmit() {
    if (!this.Form.valid) return;
    this._databaseService.start(this.Form.value).subscribe(this.closeDialogAndRefreshTable());
  }
}
