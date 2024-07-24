import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Attendance } from '../../../../core/data/models/attendance/attendance';
import { Employee } from '../../../../core/data/models/employee/IEmployee';
import { EmployeeService } from '../../../../core/data/services/employee.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { DatePipe } from '@angular/common';
import { AttendanceService } from '../../../../core/data/services/attendance.service';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './attendance-form-dialog.component.html',
  styleUrls: ['./attendance-form-dialog.component.css'],
})
export class AttendanceFormDialogComponent extends BaseForm implements OnInit {
  EmployeesDataSource: Employee[] = [];
  employeeLoading = false;

  constructor(
    override matDialogRef: MatDialogRef<AttendanceFormDialogComponent>,
    private databaseService: AttendanceService,
    private _employeeService: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: Attendance,
  ) {
    super();
    this.Form = this.fb.group({
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

  public add = (values: any) => this.databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  public update = (id: number | string, values: any) => this.databaseService.update(+id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (this.Form.valid) {
      this.Form.controls['checkOut'].setValue(this.formatDate(this.Form.controls['checkOut'].value));
      this.Form.controls['checkIn'].setValue(this.formatDate(this.Form.controls['checkIn'].value));
      const id = this.id?.value;
      this.isSubmitting = true;
      if (id) this.update(id, this.Form.value);
      else this.add(this.Form.value);
    }
  }

  private formatDate(dateString: string): string {
    const datePipe = new DatePipe('en');
    return datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss') || '';
  }
}
