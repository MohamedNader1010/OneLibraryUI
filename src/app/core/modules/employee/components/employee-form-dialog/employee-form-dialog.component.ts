import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { Employee } from '../../../../data/project-management/models/employee.model';
import { EmployeeService } from '../../../../data/project-management/repositories/employee.service';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css'],
})
export class EmployeeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  controllerName: string = 'employees';
  isLoading = false;
  constructor(
    matDialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    _databaseService: EmployeeService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
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
    this.Form = this._fb.group({
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
}
