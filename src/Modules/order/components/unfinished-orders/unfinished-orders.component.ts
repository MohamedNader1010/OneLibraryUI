import { Component, inject, OnInit } from '@angular/core';

import { OrderDetailStatus } from 'src/Modules/shared/enums/OrderDetailStatus.enum';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';
import { Order } from '../../interfaces/Iorder';
import { OrderService } from '../../services/orders.service';
import { PagingCriteria } from 'src/Modules/shared/interfaces/pagingCriteria';
import { finalize, tap } from 'rxjs';
import { TableCommonFunctionality } from '../../../shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-unfinished-orders',
  templateUrl: './unfinished-orders.component.html',
  styleUrls: ['./unfinished-orders.component.css'],
})
export class UnfinishedOrdersComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.OrderFormDialogComponent;
  componentName = ComponentsName.order;
  override databaseService = inject(OrderService);

  ngOnInit(): void {
    this.databaseService.loadingData.next(true);
    this.initiateTableHeader();
    const pagingCriteria: PagingCriteria = {
      direction: 'desc',
      filter: '',
      orderBy: 'Id',
      pageIndex: 0,
      pageSize: 25,
    };
    this.databaseService
      .getAllUnfinishedOrders(pagingCriteria)
      .pipe(
        tap((data: ResponseDto) => {
          this.databaseService.dataChange.next(data);
        }),
        finalize(() => this.databaseService.loadingData.next(false)),
      )
      .subscribe();
  }
  private initiateTableHeader() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Order) => element.id,
      },
      {
        columnDef: this.translateService.instant('shared.totalPrice.label'),
        header: this.translateService.instant('shared.totalPrice'),
        cell: (element: Order) => element.totalPrice,
      },
      {
        columnDef: this.translateService.instant('shared.rest.label'),
        header: this.translateService.instant('shared.rest'),
        cell: (element: Order) => element.rest,
      },
      {
        columnDef: this.translateService.instant('shared.paid.label'),
        header: this.translateService.instant('shared.paid'),
        cell: (element: Order) => element.paid,
      },
      {
        columnDef: this.translateService.instant('order.status.label'),
        header: this.translateService.instant('order.status'),
        cell: (element: Order) => OrderDetailStatus[element.orderStatus],
      },
      {
        columnDef: this.translateService.instant('shared.client.label'),
        header: this.translateService.instant('shared.client'),
        cell: (element: Order) => element.clientName,
      },
      {
        columnDef: this.translateService.instant('shared.clientPhoneNumber.label'),
        header: this.translateService.instant('shared.clientPhoneNumber'),
        cell: (element: Order) => element.clientPhoneNumber,
      },
      {
        columnDef: this.translateService.instant('shared.remarks.label'),
        header: this.translateService.instant('shared.remarks'),
        cell: (element: Order) => element.remarks,
      },
      {
        columnDef: this.translateService.instant('table.createdBy'),
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: Order) => element.createdBy,
      },
      {
        columnDef: this.translateService.instant('table.createdAt'),
        header: this.translateService.instant('table.createdAt.label'),
        cell: (element: Order) => element.createdOn,
      },
    ];
  }

  public handleOrderTransaction(row: ResponseDto) {
    // this.handleEditRow(row);
  }
}
