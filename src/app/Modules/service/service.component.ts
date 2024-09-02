import { Component, inject, OnInit } from '@angular/core';
import { Service } from '../../core/data/models/service/IService';
import { ServicesService } from '../../core/data/services/services.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
})
export class ServiceComponent implements OnInit {
  formName = FormDialogNames.ServiceFormDialogComponent;
  componentName = ComponentsName.service;
  databaseService = inject(ServicesService);
  tableColumns!: any[];

  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  loadPaginatedData = () => {
    this.databaseService.getPagedData().subscribe();
  };

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
        columnDef: 'ServiceMaterials.Material.Name',
        header: 'الخامات',
        cell: (element: Service) => {
          let materials = '';
          element.serviceMaterials?.forEach((m) => (materials += `عدد (${m.quantity}) من ${m.material}, `));
          return materials.slice(0, -2);
        },
        disableFilter: true,
      },
      {
        columnDef: 'OriginalPrice',
        header: 'سعر التكلفة',
        cell: (element: Service) => element.originalPrice,
      },
      {
        columnDef: 'ServiceType.Name',
        header: 'النوع',
        cell: (element: Service) => element.serviceType,
      },
    ];
  }
}
