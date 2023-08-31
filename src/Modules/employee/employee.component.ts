import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from './services/employee.service';
import {Employee} from './interFaces/Iemployee';
import {ToastrService} from 'ngx-toastr';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.EmployeeFormDialogComponent;
  componentName = ComponentsName.employee;
  constructor(override databaseService: EmployeeService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
    super(httpClient, toastrService, databaseService);
  }
  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: Employee) => element.name,
      },
      {
        columnDef: this._translateService.instant('form.username'),
        header: this._translateService.instant('form.username.label'),
        cell: (element: Employee) => element.userName,
      },
      {
        columnDef: this._translateService.instant('form.phoneNumber'),
        header: this._translateService.instant('form.phoneNumber.label'),
        cell: (element: Employee) => element.phoneNumber,
      },
      {
        columnDef: this._translateService.instant('form.email'),
        header: this._translateService.instant('form.email.label'),
        cell: (element: Employee) => element.email,
      },
      {
        columnDef: this._translateService.instant('form.emailComfirmed'),
        header: this._translateService.instant('form.emailConfirmed.label'),
        cell: (element: Employee) => (element.emailConfirmed ? this._translateService.instant('form.email.active') : this._translateService.instant('form.email.inactive')),
      },
    ];
  }
}
