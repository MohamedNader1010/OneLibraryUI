import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap, takeUntil } from 'rxjs';
import { Attendance } from '../../interfaces/attendance';
import { AttendanceService } from '../../services/attendance.service';
import { Response } from '../../../shared/interfaces/Iresponse';
import { Employee } from '../../../employee/interFaces/Iemployee';
import { EmployeeService } from '../../../employee/services/employee.service';
import { DatePipe } from '@angular/common';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';

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
        error: (e) => {
          this.isSubmitting = false;
          let res: Response = e.error ?? e;
          this.toastrService.error(res.message);
        },
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
