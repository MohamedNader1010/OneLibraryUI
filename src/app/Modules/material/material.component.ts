import { Component, inject, OnInit } from '@angular/core';
import { Material } from '../../core/data/models/material/Imaterial';
import { MaterialService } from '../../core/data/services/material.service';
import { TableDataSource } from '../../shared/components/table/tableDataSource';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
})
export class MaterialComponent implements OnInit {
  formName = FormDialogNames.MaterialFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.material;
  databaseService = inject(MaterialService);
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
        columnDef: 'Id',
        header: this.translateService.instant('table.id.label'),
        cell: (element: Material) => element.id,
      },
      {
        columnDef: 'Name',
        header: this.translateService.instant('form.name.label'),
        cell: (element: Material) => element.name,
      },
      {
        columnDef: 'Price',
        header: 'سعر الجملة',
        cell: (element: Material) => element.price,
      },
      {
        columnDef: 'TotalCredit',
        header: 'اجمالي الوارد',
        cell: (element: Material) => element.totalCredit,
      },
      {
        columnDef: 'TotalDebit',
        header: 'اجمالي الصادر',
        cell: (element: Material) => element.totalDebit,
      },
      {
        columnDef: 'Quantity',
        header: 'الكمية الحالية',
        cell: (element: Material) => element.quantity,
      },
    ];
  }
}
