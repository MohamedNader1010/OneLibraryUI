import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from '../../interFaces/Iemployee';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';

@Component({
  selector: 'app-employee-form-dialog',
  templateUrl: './employee-form-dialog.component.html',
  styleUrls: ['./employee-form-dialog.component.css']
})
export class EmployeeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  Form: FormGroup;
  controllerName: string = 'employees';
  isSubmitted: boolean = false;
  isLoading = false; 
  constructor(
    private _employee: EmployeeService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private matDialogRef: MatDialogRef<EmployeeFormDialogComponent>,
    private dialogService: DialogServiceService,
    private matDialogg: MatDialog
  ) {
    super(matDialogRef, dialogService, translate, matDialogg);
    this.Form = this.fb.group({
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

  ngOnInit(): void {
    if (this.data)
      this.getSingle(this.data.id);
  }

  getSingle = (id: string) => {
    this.isLoading = true;
    this.subscriptions.push(
      this._employee.GetById(id).subscribe({
        next: (data) => {
          this.isLoading = false;
          this.Form.patchValue(data.body);
        },
        error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
      })
    );
  }
    
  handleSubmit() {
    if (this.Form.valid) {
      if (this.data)
        this.subscriptions.push(
          this._employee.update(this.data.id, this.Form.value).subscribe({
            next: () => {
              this.isSubmitted = true;
              this.back();
            },
            error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
          })
        );
      else
        this.subscriptions.push(
          this._employee.add(this.Form.value).subscribe({
            next: () => {
              this.isSubmitted = true;
              this.back();
            },
            error: (res) => console.log(res),
          })
        );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
