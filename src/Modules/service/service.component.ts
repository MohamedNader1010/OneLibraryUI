import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Service} from './interfaces/Iservice';
import {ServicesService} from './services/services.service';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

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
