import { Component, inject, OnInit } from '@angular/core';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
import { FormDialogNames } from '../shared/enums/forms-name.enum';
import { ComponentsName } from '../shared/enums/components.name.enum';
import { SupplierService } from './services/supplier.service';
import { TableDataSource } from '../shared/components/table/tableDataSource';
import { Supplier } from './interfaces/ISupplier';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SupplierComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.supplierFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.supplier;

  override databaseService = inject(SupplierService);

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
        cell: (element: Supplier) => element.id,
      },
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
        cell: (element: Supplier) => element.name,
      },
      {
        columnDef: this.translateService.instant('form.phoneNumber'),
        header: this.translateService.instant('form.phoneNumber.label'),
        cell: (element: Supplier) => element.phoneNumber,
      },
      {
        columnDef: this.translateService.instant('form.Supplier.totalDue'),
        header: this.translateService.instant('form.Supplier.totalDue.label'),
        cell: (element: Supplier) => element.totalDue,
      },
      {
        columnDef: this.translateService.instant('form.Supplier.takeMoney'),
        header: this.translateService.instant('form.Supplier.takeMoney.label'),
        cell: (element: Supplier) => element.paid,
      },
      {
        columnDef: this.translateService.instant('form.Supplier.rest'),
        header: this.translateService.instant('form.Supplier.rest.label'),
        cell: (element: Supplier) => element.rest,
      },
    ];
  }
}
