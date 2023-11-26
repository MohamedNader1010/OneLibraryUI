import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { takeUntil } from 'rxjs';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { Employee } from '../../../../data/project-management/models/employee.model';
import { ShiftService } from '../../../../data/project-management/repositories/shift.service';
import { EmployeeFormDialogComponent } from '../../../employee/components/employee-form-dialog/employee-form-dialog.component';

@Component({
  selector: 'app-close-start-shift-form-dialog',
  templateUrl: './close-start-shift-form-dialog.component.html',
  styleUrls: ['./close-start-shift-form-dialog.component.css'],
})
export class CloseStartShiftFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  constructor(
    private _databaseService: ShiftService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    matDialogRef: MatDialogRef<EmployeeFormDialogComponent>,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.initiateFormControls();
  }

  get guarante(): FormControl {
    return this.Form.get('guarante') as FormControl;
  }
  get bankGuarante(): FormControl {
    return this.Form.get('bankGuarante') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this._fb.group({
      guarante: [null],
      bankGuarante: [null],
    });
  }
  ngOnInit(): void {}

  override handleSubmit() {
    if (this.Form.valid) {
      this._databaseService.closeAndStartNewShift(this.Form.value).pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateObserver());
    }
  }
}
