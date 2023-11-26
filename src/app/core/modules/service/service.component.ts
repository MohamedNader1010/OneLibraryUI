import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { ComponentsName } from '../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../shared/enums/forms-name.enum';
import { Service } from '../../data/project-management/models/service.model';
import { ServicesService } from '../../data/project-management/repositories/services.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.ServiceFormDialogComponent;
  componentName = ComponentsName.service;

  constructor(httpClient: HttpClient, override databaseService: ServicesService, private _translateService: TranslateService, toastrService: ToastrService, public dialog: MatDialog) {
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
