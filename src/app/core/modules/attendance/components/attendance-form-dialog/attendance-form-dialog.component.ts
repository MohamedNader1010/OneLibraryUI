import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { tap, takeUntil } from 'rxjs';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { Attendance } from '../../../../data/project-management/models/attendance.model';
import { Employee } from '../../../../data/project-management/models/employee.model';
import { AttendanceService } from '../../../../data/project-management/repositories/attendance.service';
import { EmployeeService } from '../../../../data/project-management/repositories/employee.service';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './attendance-form-dialog.component.html',
  styleUrls: ['./attendance-form-dialog.component.css'],
})
export class AttendanceFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  EmployeesDataSource: Employee[] = [];
  employeeLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Attendance,
    dialogRef: MatDialogRef<AttendanceFormDialogComponent>,
    databaseService: AttendanceService,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      employeeId: [null, [Validators.required]],
      checkIn: [null, [Validators.required]],
      checkOut: [null],
      employee: [''],
    });
  }

  get employeeId(): FormControl {
    return this.Form.get('employeeId') as FormControl;
  }
  get checkIn(): FormControl {
    return this.Form.get('checkIn') as FormControl;
  }
  get checkOut(): FormControl {
    return this.Form.get('checkOut') as FormControl;
  }

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees = () =>
    this._employeeService
      .getAll()
      .pipe(
        tap(() => (this.employeeLoading = true)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => {
          this.EmployeesDataSource = data.body;
        },
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.employeeLoading = false;
          if (this.data) {
            this.Form.patchValue({
              id: this.data.id,
              employeeId: this.data.employeeId,
              employee: this.data.employee,
              checkIn: this._datePipe.transform(this.data.checkIn, 'HH:mm'),
              checkOut: this._datePipe.transform(this.data.checkOut, 'HH:mm'),
            });
          }
        },
      });

  setEmpId = (data: any) => this.employeeId.setValue(data);
}
