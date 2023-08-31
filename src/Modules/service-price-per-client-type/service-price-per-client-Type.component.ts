import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { ServicePricePerClientType } from './Interfaces/ServicePricePerClientType';
import { ServicePricePerClientTypeService } from './services/service-price-per-client-type.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-service-price-per-client-Type',
  templateUrl: './service-price-per-client-Type.component.html',
  styleUrls: ['./service-price-per-client-Type.component.css'],
})
export class ServicePricePerClientTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.ServicePricePerClientFormDialogComponent;
  componentName = ComponentsName.servicePricePerClientType;

  constructor(private _translateService: TranslateService, httpClient: HttpClient, override databaseService: ServicePricePerClientTypeService, toastrService: ToastrService) {
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
