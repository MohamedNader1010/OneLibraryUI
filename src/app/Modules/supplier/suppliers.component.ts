import { Component, inject, OnInit } from '@angular/core';
import { Supplier } from '../../core/data/models/supplier/ISupplier';
import { SupplierService } from '../../core/data/services/supplier.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
})
export class SupplierComponent implements OnInit {
  tableColumns!: any[];
  formName = FormDialogNames.supplierFormDialogComponent;
  componentName = ComponentsName.supplier;
  databaseService = inject(SupplierService);

  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  loadData() {
    this.databaseService.getAllDataForTable();
  }

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
