import { Component, inject, OnInit } from '@angular/core';
import { ClientTypeService } from '../../core/data/services/client-type.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-clientType',
  templateUrl: './client-type.component.html',
})
export class ClientTypeComponent implements OnInit {
  formName = FormDialogNames.ClientTypeFormDialogComponent;
  componentName = ComponentsName.clientType;
  databaseService = inject(ClientTypeService);
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
