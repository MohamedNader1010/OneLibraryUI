import { Component, inject, OnInit } from '@angular/core';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TableDataSource } from '../shared/components/table/tableDataSource';
import { Material } from './interfaces/Imaterial';
import { MaterialService } from './services/material.service';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
})
export class MaterialComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.MaterialFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.material;
  override databaseService = inject(MaterialService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  override loadData() {
    this.databaseService.getAllMaterialsForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Material) => element.id,
      },
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
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
