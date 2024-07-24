import { Component, inject, OnInit } from '@angular/core';
import { ServicesTypeService } from '../../core/data/services/service-type.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-serviceType',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css'],
})
export class ServiceTypeComponent implements OnInit {
  formName = FormDialogNames.ServiceTypeFormDialogComponent;
  componentName = ComponentsName.serviceType;
  databaseService = inject(ServicesTypeService);
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
        columnDef: 'Name',
        header: 'نوع الخدمة',
        cell: (element: any) => element.name,
      },
    ];
  }
}
