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
        columnDef: "Id",
        header: this.translateService.instant('table.id.label'),
        cell: (element: Supplier) => element.id,
      },
      {
        columnDef: "Name",
        header: this.translateService.instant('form.name.label'),
        cell: (element: Supplier) => element.name,
      },
      {
        columnDef: "PhoneNumber",
        header: this.translateService.instant('form.phoneNumber.label'),
        cell: (element: Supplier) => element.phoneNumber,
      },
      {
        columnDef: "TotalDue",
        header: this.translateService.instant('form.Supplier.totalDue.label'),
        cell: (element: Supplier) => element.totalDue,
      },
      {
        columnDef: "Paid",
        header: this.translateService.instant('form.Supplier.takeMoney.label'),
        cell: (element: Supplier) => element.paid,
      },
      {
        columnDef: "Rest",
        header: this.translateService.instant('form.Supplier.rest.label'),
        cell: (element: Supplier) => element.rest,
      },
    ];
  }
}
