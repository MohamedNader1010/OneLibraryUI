import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TableDataSource } from '../shared/classes/tableDataSource';
import { Material } from './interfaces/Imaterial';
import { MaterialService } from './services/material.service';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {TranslateService} from '@ngx-translate/core';

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
        columnDef: 'CurrentQty',
        header: 'الكمية الحالية',
        cell: (element: Material) => element.quantity,
      },
    ];
  }
}
