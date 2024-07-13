import { Component, inject, OnInit } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { Employee } from './interFaces/Iemployee';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.EmployeeFormDialogComponent;
  componentName = ComponentsName.employee;
  override databaseService = inject(EmployeeService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
        cell: (element: Employee) => element.name,
      },
      {
        columnDef: this.translateService.instant('form.username'),
        header: this.translateService.instant('form.username.label'),
        cell: (element: Employee) => element.userName,
      },
      {
        columnDef: this.translateService.instant('form.phoneNumber'),
        header: this.translateService.instant('form.phoneNumber.label'),
        cell: (element: Employee) => element.phoneNumber,
      },
      {
        columnDef: this.translateService.instant('form.email'),
        header: this.translateService.instant('form.email.label'),
        cell: (element: Employee) => element.email,
      },
      {
        columnDef: this.translateService.instant('form.emailComfirmed'),
        header: this.translateService.instant('form.emailConfirmed.label'),
        cell: (element: Employee) => (element.emailConfirmed ? this.translateService.instant('form.email.active') : this.translateService.instant('form.email.inactive')),
      },
      {
        columnDef: this.translateService.instant('form.Employee.totalCommitment'),
        header: this.translateService.instant('form.Employee.totalCommitment.label'),
        cell: (element: Employee) => element.totalCommitments,
      },
      {
        columnDef: this.translateService.instant('form.Employee.paid'),
        header: this.translateService.instant('form.Employee.paid.label'),
        cell: (element: Employee) => element.paid,
      },
      {
        columnDef: this.translateService.instant('form.Employee.rest'),
        header: this.translateService.instant('form.Employee.rest.label'),
        cell: (element: Employee) => element.rest,
      },
    ];
  }
}
