import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../../../employee/interFaces/Iemployee';
import { EmployeeService } from '../../../employee/services/employee.service';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { Attendance } from '../../interfaces/attendance';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './attendance-form-dialog.component.html',
  styleUrls: ['./attendance-form-dialog.component.css'],
})
export class AttendanceFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
  EmployeesDataSource: Employee[] = [];
  employeeLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
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

  getAllEmployees = () => {
    this.employeeLoading = true;
    this._employeeService.getAll().subscribe({
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
            checkIn: this.data.checkIn,
            checkOut: this.data.checkOut,
          });
        }
      },
    });
  };

  setEmpId = (data: any) => this.employeeId.setValue(data);
}
