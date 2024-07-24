import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../../../core/data/services/employee.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { Employee } from '../../../../core/data/models/employee/IEmployee';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css'],
})
export class EmployeeFormDialogComponent extends BaseForm implements OnInit {
  controllerName: string = 'employees';
  isLoading = false;
  constructor(override matDialogRef: MatDialogRef<EmployeeFormDialogComponent>, private _databaseService: EmployeeService, @Inject(MAT_DIALOG_DATA) public data: Employee) {
    super();
    this.initiateFormControls();
  }

  get firstName(): FormControl {
    return this.Form.get('firstName') as FormControl;
  }

  get lastName(): FormControl {
    return this.Form.get('lastName') as FormControl;
  }

  get userName(): FormControl {
    return this.Form.get('userName') as FormControl;
  }

  get email(): FormControl {
    return this.Form.get('email') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.Form.get('phoneNumber') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email, Validators.pattern(`^.+@.+\..+$`)],
        },
      ],
      phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.splitName();
      this.Form.patchValue(this.data);
    }
  }

  private splitName() {
    this.data.firstName = this.data.name.substring(0, this.data.name.indexOf(' '));
    this.data.lastName = this.data.name.substring(this.data.name.indexOf(' ') + 1);
  }

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: string, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
