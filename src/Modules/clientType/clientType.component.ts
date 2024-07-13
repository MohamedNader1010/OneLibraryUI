import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { Component, inject, OnInit } from '@angular/core';
import { ClientTypeService } from './services/clientType.service';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';

@Component({
  selector: 'app-clientType',
  templateUrl: './clientType.component.html',
  styleUrls: ['./clientType.component.css'],
})
export class ClientTypeComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.ClientTypeFormDialogComponent;
  componentName = ComponentsName.clientType;
  override databaseService = inject(ClientTypeService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: any) => element.id,
      },
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
        cell: (element: any) => element.name,
      },
    ];
  }
}
