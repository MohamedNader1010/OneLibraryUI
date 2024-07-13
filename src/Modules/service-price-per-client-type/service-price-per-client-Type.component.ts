import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ServicePricePerClientType } from './Interfaces/ServicePricePerClientType';
import { ServicePricePerClientTypeService } from './services/service-price-per-client-type.service';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-service-price-per-client-Type',
  templateUrl: './service-price-per-client-Type.component.html',
  styleUrls: ['./service-price-per-client-Type.component.css'],
})
export class ServicePricePerClientTypeComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.ServicePricePerClientFormDialogComponent;
  componentName = ComponentsName.servicePricePerClientType;
  override databaseService = inject(ServicePricePerClientTypeService);

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
        cell: (element: ServicePricePerClientType) => `${element.id}`,
      },
      {
        columnDef: 'Service Name',
        header: 'الخدمة',
        cell: (element: ServicePricePerClientType) => `${element.service}`,
      },
      {
        columnDef: 'Client Type',
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
