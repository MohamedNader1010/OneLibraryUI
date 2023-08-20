import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { FormDialogNames } from '../../Persistents/enums/forms-name';
import { ComponentsName } from '../../Persistents/enums/components.name';
import { SupplierService } from './services/supplier.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { TableDataSource } from '../shared/classes/tableDataSource';
import { Supplier } from './interfaces/ISupplier';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SupplierComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  tableColumns!: any[];
  loading!: boolean;
  formName = FormDialogNames.supplierFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.supplier;
  constructor(public override database: SupplierService, public override httpClient: HttpClient, public override toastr: ToastrService, private translate: TranslateService) {
    super(httpClient, toastr, database);
  }

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translate.instant('table.id'),
        header: this.translate.instant('table.id.label'),
        cell: (element: Supplier) => element.id,
      },
      {
        columnDef: this.translate.instant('form.name'),
        header: this.translate.instant('form.name.label'),
        cell: (element: Supplier) => element.name,
      },
      {
        columnDef: this.translate.instant('form.phoneNumber'),
        header: this.translate.instant('form.phoneNumber.label'),
        cell: (element: Supplier) => element.phoneNumber,
      },
      {
        columnDef: this.translate.instant('form.Supplier.totalDue'),
        header: this.translate.instant('form.Supplier.totalDue.label'),
        cell: (element: Supplier) => element.totalDue,
      },
      {
        columnDef: this.translate.instant('form.Supplier.paid'),
        header: this.translate.instant('form.Supplier.paid.label'),
        cell: (element: Supplier) => element.paid,
      },
      {
        columnDef: this.translate.instant('form.Supplier.rest'),
        header: this.translate.instant('form.Supplier.rest.label'),
        cell: (element: Supplier) => element.rest,
      },
    ];
  }

  public loadData() {
    this.database.getAllSuppliers();
  }
}
