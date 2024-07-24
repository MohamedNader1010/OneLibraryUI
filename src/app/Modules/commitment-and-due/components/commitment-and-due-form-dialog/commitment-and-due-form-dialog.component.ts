import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { forkJoin, catchError, of, map } from 'rxjs';
import { CommitmentAndDue } from '../../../../core/data/models/commitment-and-due/Icommitment-and-due.interface';
import { Employee } from '../../../../core/data/models/employee/IEmployee';
import { Supplier } from '../../../../core/data/models/supplier/ISupplier';
import { CommitmentAndDueService } from '../../../../core/data/services/commitment-and-due.service';
import { EmployeeService } from '../../../../core/data/services/employee.service';
import { SupplierService } from '../../../../core/data/services/supplier.service';
import { TransactionType } from '../../../../shared/enums/TransactionType.enum';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './commitment-and-due-form-dialog.component.html',
  styleUrls: ['./commitment-and-due-form-dialog.component.css'],
})
export class CommitmentAndDueFormDialogComponent extends BaseForm implements OnInit {
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
    override matDialogRef: MatDialogRef<CommitmentAndDueFormDialogComponent>,
    private _databaseService: CommitmentAndDueService,
  ) {
    super();
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

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    if (this.type.value === TransactionType.استحقاق) {
      this.amount.setValue(-this.amount.value);
    }
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
