import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormDialogNames } from 'src/app/shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { TableDataSource } from '../../../shared/classes/tableDataSource';
import { ComponentsName } from '../../../shared/enums/components.name.enum';
import { Material } from '../../data/project-management/models/material.model';
import { MaterialService } from '../../data/project-management/repositories/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.MaterialFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.material;
  constructor(override databaseService: MaterialService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }

  override loadData() {
    this.databaseService.getAllMaterialsForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: Material) => element.id,
      },
      {
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: Material) => element.name,
      },
      {
        columnDef: 'price',
        header: 'سعر الجملة',
        cell: (element: Material) => element.price,
      },
      {
        columnDef: 'totalOut',
        header: 'اجمالي الوارد',
        cell: (element: Material) => element.totalIn,
      },
      {
        columnDef: 'totalIn',
        header: 'اجمالي الصادر',
        cell: (element: Material) => element.totalOut,
      },
      {
        columnDef: 'CurrentQty',
        header: 'الكمية الحالية',
        cell: (element: Material) => element.quantity,
      },
    ];
  }
}
