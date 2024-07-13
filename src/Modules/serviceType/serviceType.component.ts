import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ServicesTypeService } from './services/serviceType.service';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-serviceType',
  templateUrl: './serviceType.component.html',
  styleUrls: ['./serviceType.component.css'],
})
export class ServiceTypeComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.ServiceTypeFormDialogComponent;
  componentName = ComponentsName.serviceType;
  override databaseService = inject(ServicesTypeService);

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
        columnDef: 'Name',
        header: 'نوع الخدمة',
        cell: (element: any) => element.name,
      },
    ];
  }
}
