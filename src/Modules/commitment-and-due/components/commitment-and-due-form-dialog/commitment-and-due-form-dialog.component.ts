import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap, takeUntil, forkJoin, catchError, of, map } from 'rxjs';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { Employee } from '../../../employee/interFaces/Iemployee';
import { EmployeeService } from '../../../employee/services/employee.service';
import { DatePipe } from '@angular/common';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { Supplier } from '../../../supplier/interfaces/ISupplier';
import { SupplierService } from '../../../supplier/services/supplier.service';
import { CommitmentAndDue } from '../../interfaces/Icommitment-and-due.interface';
import { CommitmentAndDueService } from '../../services/commitment-and-due.service';
import { TransactionType } from '../../../shared/enums/TransactionType.enum';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './commitment-and-due-form-dialog.component.html',
  styleUrls: ['./commitment-and-due-form-dialog.component.css'],
})
export class CommitmentAndDueFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  EmployeesDataSource: Employee[] = [];
  SuppliersDataSource: Supplier[] = [];
  TransactionTypeInstance: any = TransactionType;
  TransactionTypes: TransactionType[] = [TransactionType.التزام, TransactionType.استحقاق];

  employeeLoading = false;
  supplierLoading = false;
  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _supplierService: SupplierService,
    @Inject(MAT_DIALOG_DATA) public data: CommitmentAndDue,
    dialogRef: MatDialogRef<CommitmentAndDueFormDialogComponent>,
    databaseService: CommitmentAndDueService,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required]],
      amount: [0],
      comment: [''],
      supplierOrEmployee: ['supplier'],
      employeeId: [null],
      employee: [''],
      supplierId: [null],
      supplier: [''],
      type: [TransactionType.التزام],
    });
  }

  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }

  get amount(): FormControl {
    return this.Form.get('amount') as FormControl;
  }

  get comment(): FormControl {
    return this.Form.get('comment') as FormControl;
  }

  get supplierOrEmployee(): FormControl {
    return this.Form.get('supplierOrEmployee') as FormControl;
  }

  get employeeId(): FormControl {
    return this.Form.get('employeeId') as FormControl;
  }

  get supplierId(): FormControl {
    return this.Form.get('supplierId') as FormControl;
  }

  get type(): FormControl {
    return this.Form.get('type') as FormControl;
  }

  setEmployeeId = (data: any) => this.employeeId.setValue(data);

  setSupplierId = (data: any) => this.supplierId.setValue(data);

  ngOnInit() {
    this.forkJoins();
  }

  forkJoins() {
    this.supplierLoading = this.employeeLoading = true;
    let observables = [this._employeeService.getAll(), this._supplierService.getAll()];
    return forkJoin(observables)
      .pipe(
        catchError((err) => of(err)),
        map(([employeesResponse, suppliersResponse]) => {
          return {
            suppliers: suppliersResponse,
            employees: employeesResponse,
          };
        }),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => {
          this.EmployeesDataSource = response.employees.body;
          this.SuppliersDataSource = response.suppliers.body;
        },
        complete: () => {
          if (this.data) this.patchData();
          this.employeeLoading = this.supplierLoading = false;
        },
      });
  }

  patchData = () => {
    this.supplierOrEmployee.setValue(this.data.employeeId ? 'employee' : 'supplier');
    this.Form.patchValue(this.data);
  };

  override handleSubmit() {
    if (this.Form.valid) {
      const id = this.id?.value;
      this.isSubmitting = true;
      if (this.type.value === TransactionType.استحقاق) {
        this.amount.setValue(-this.amount.value);
      }
      if (id) this.update(id, this.Form.value);
      else this.add(this.Form.value);
    }
  }
}
