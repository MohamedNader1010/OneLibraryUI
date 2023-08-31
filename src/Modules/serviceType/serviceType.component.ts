import {HttpClient} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ComponentsName } from 'src/Persistents/enums/components.name';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { ServicesTypeService } from './services/serviceType.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';

@Component({
  selector: 'app-serviceType',
  templateUrl: './serviceType.component.html',
  styleUrls: ['./serviceType.component.css'],
})
export class ServiceTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.ServiceTypeFormDialogComponent;
  componentName = ComponentsName.serviceType;

  constructor(private _translateService: TranslateService, httpClient: HttpClient, override databaseService: ServicesTypeService, toastrService: ToastrService) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: any) => element.id,
      },
      {
        columnDef: 'Name',
        header: 'نوع الخدمة',
        cell: (element: any) => element.name,
      },
    ];
  }
}
