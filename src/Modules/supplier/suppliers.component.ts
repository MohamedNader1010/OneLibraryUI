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
  formName = FormDialogNames.supplierFormDialogComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.supplier;
  constructor(databaseService: SupplierService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
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
        cell: (element: Supplier) => element.id,
      },
      {
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: Supplier) => element.name,
      },
      {
        columnDef: this._translateService.instant('form.phoneNumber'),
        header: this._translateService.instant('form.phoneNumber.label'),
        cell: (element: Supplier) => element.phoneNumber,
      },
      {
        columnDef: this._translateService.instant('form.Supplier.totalDue'),
        header: this._translateService.instant('form.Supplier.totalDue.label'),
        cell: (element: Supplier) => element.totalDue,
      },
      {
        columnDef: this._translateService.instant('form.Supplier.paid'),
        header: this._translateService.instant('form.Supplier.paid.label'),
        cell: (element: Supplier) => element.paid,
      },
      {
        columnDef: this._translateService.instant('form.Supplier.rest'),
        header: this._translateService.instant('form.Supplier.rest.label'),
        cell: (element: Supplier) => element.rest,
      },
    ];
  }
}
