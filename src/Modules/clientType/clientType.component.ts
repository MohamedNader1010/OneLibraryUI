import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientType } from './interFaces/IclientType';
import { ClientTypeService } from './services/clientType.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clientType',
  templateUrl: './clientType.component.html',
  styleUrls: ['./clientType.component.css'],
})
export class ClientTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.ClientTypeFormDialogComponent;
  componentName = ComponentsName.clientType;
  constructor(override databaseService: ClientTypeService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
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
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: any) => element.name,
      },
    ];
  }
}
