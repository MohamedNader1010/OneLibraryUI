import { Component, inject, OnInit } from '@angular/core';
import { Service } from './interfaces/Iservice';
import { ServicesService } from './services/services.service';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.ServiceFormDialogComponent;
  componentName = ComponentsName.service;
  override databaseService = inject(ServicesService);

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
        cell: (element: Service) => element.id,
      },
      {
        columnDef: 'barcode',
        header: 'باركود',
        cell: (element: Service) => `bar-${element.id}`,
      },
      {
        columnDef: 'Name',
        header: 'الأسم',
        cell: (element: Service) => element.name,
      },
      {
        columnDef: 'Material',
        header: 'الخامات',
        cell: (element: Service) => {
          let materials = '';
          element.serviceMaterials?.forEach((m) => (materials += `عدد (${m.quantity}) من ${m.material}, `));
          return materials.slice(0, -2);
        },
      },
      {
        columnDef: 'Originalprice',
        header: 'سعر التكلفة',
        cell: (element: Service) => element.originalPrice,
      },
      {
        columnDef: 'Type',
        header: 'النوع',
        cell: (element: Service) => element.serviceType,
      },
    ];
  }
}
