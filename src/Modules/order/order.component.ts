import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { OrderDetailStatus } from '../shared/enums/OrderDetailStatus.enum';
import { Order } from './interfaces/Iorder';
import { OrderService } from './services/orders.service';
import { TranslateService } from '@ngx-translate/core';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../shared/interfaces/IResponse.dto';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.OrderFormDialogComponent;
  componentName = ComponentsName.order;
  constructor(private _translateService: TranslateService, public dialog: MatDialog, override databaseService: OrderService, toastrService: ToastrService, httpClient: HttpClient) {
    super(httpClient, toastrService, databaseService);
  }

  ngOnInit(): void {
    this.initiateTableHeader();
    this.loadPaginatedData();
  }
  private initiateTableHeader() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: Order) => element.id,
      },
      {
        columnDef: this._translateService.instant('shared.totalPrice.label'),
        header: this._translateService.instant('shared.totalPrice'),
        cell: (element: Order) => element.finalPrice,
      },
      {
        columnDef: this._translateService.instant('shared.rest.label'),
        header: this._translateService.instant('shared.rest'),
        cell: (element: Order) => element.rest,
      },
      {
        columnDef: this._translateService.instant('shared.paid.label'),
        header: this._translateService.instant('shared.paid'),
        cell: (element: Order) => element.paid,
      },
      {
        columnDef: this._translateService.instant('order.status.label'),
        header: this._translateService.instant('order.status'),
        cell: (element: Order) => OrderDetailStatus[element.orderStatus],
      },
      {
        columnDef: this._translateService.instant('shared.client.label'),
        header: this._translateService.instant('shared.client'),
        cell: (element: Order) => element.clientName,
      },
      {
        columnDef: this._translateService.instant('shared.clientPhoneNumber.label'),
        header: this._translateService.instant('shared.clientPhoneNumber'),
        cell: (element: Order) => element.clientPhoneNumber,
      },
      {
        columnDef: this._translateService.instant('shared.remarks.label'),
        header: this._translateService.instant('shared.remarks'),
        cell: (element: Order) => element.remarks,
      },
      {
        columnDef: this._translateService.instant('table.createdBy'),
        header: this._translateService.instant('table.createdBy.label'),
        cell: (element: Order) => element.createdBy,
      },
      {
        columnDef: this._translateService.instant('table.createdAt'),
        header: this._translateService.instant('table.createdAt.label'),
        cell: (element: Order) => element.createdOn,
      },
    ];
  }

  public handleOrderTransaction(row: ResponseDto) {
    this.handleEditRow(row);
  }
}
