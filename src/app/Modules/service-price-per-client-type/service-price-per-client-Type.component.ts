import { Component, inject, OnInit } from '@angular/core';
import { ServicePricePerClientType } from '../../core/data/models/service-price-per-client-type/ServicePricePerClientType';
import { ServicePricePerClientTypeService } from '../../core/data/services/service-price-per-client-type.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-service-price-per-client-Type',
  templateUrl: './service-price-per-client-Type.component.html',
})
export class ServicePricePerClientTypeComponent implements OnInit {
  formName = FormDialogNames.ServicePricePerClientFormDialogComponent;
  componentName = ComponentsName.servicePricePerClientType;
  databaseService = inject(ServicePricePerClientTypeService);
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
        columnDef: "Id",
        header: this.translateService.instant('table.id.label'),
        cell: (element: ServicePricePerClientType) => `${element.id}`,
      },
      {
        columnDef: 'Service.Name',
        header: 'الخدمة',
        cell: (element: ServicePricePerClientType) => `${element.service}`,
      },
      {
        columnDef: 'ClientType.Name',
        header: 'نوع العميل',
        cell: (element: ServicePricePerClientType) => `${element.clientType}`,
      },
      {
        columnDef: 'Price',
        header: 'السعر',
        cell: (element: ServicePricePerClientType) => `${element.price}`,
      },
    ];
  }
}
