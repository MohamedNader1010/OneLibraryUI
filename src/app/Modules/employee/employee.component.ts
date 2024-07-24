import { Component, inject, OnInit } from '@angular/core';
import { Employee } from '../../core/data/models/employee/IEmployee';
import { EmployeeService } from '../../core/data/services/employee.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {
  formName = FormDialogNames.EmployeeFormDialogComponent;
  componentName = ComponentsName.employee;
  databaseService = inject(EmployeeService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  loadData() {
    this.databaseService.getAllDataForTable();
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
