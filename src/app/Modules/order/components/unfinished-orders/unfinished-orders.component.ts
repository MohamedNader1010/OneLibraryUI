import { Component, inject, OnInit } from '@angular/core';
import { tap, finalize } from 'rxjs';
import { Order } from '../../../../core/data/models/order/Iorder';
import { OrderService } from '../../../../core/data/services/orders.service';
import { ComponentsName } from '../../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../../shared/enums/forms-name.enum';
import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
import { ResponseDto } from '../../../../shared/interfaces/response.dto';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-unfinished-orders',
  templateUrl: './unfinished-orders.component.html',
})
export class UnfinishedOrdersComponent implements OnInit {
  formName = FormDialogNames.OrderFormDialogComponent;
  componentName = ComponentsName.order;
  databaseService = inject(OrderService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.databaseService.loadingData.next(true);
    this.initiateTableHeader();
    this.databaseService
      .getAllUnfinishedOrders()
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
        columnDef: "Id",
        header: this.translateService.instant('table.id.label'),
        cell: (element: Order) => element.id,
      },
      {
        columnDef: "TotalPrice",
        header: this.translateService.instant('shared.totalPrice'),
        cell: (element: Order) => element.totalPrice,
      },
      {
        columnDef: "Rest",
        header: this.translateService.instant('shared.rest'),
        cell: (element: Order) => element.rest,
      },
      {
        columnDef: "Paid",
        header: this.translateService.instant('shared.paid'),
        cell: (element: Order) => element.paid,
      },
      {
        columnDef: "OrderDetail.Status",
        header: this.translateService.instant('order.status'),
        cell: (element: Order) => OrderDetailStatus[element.status],
      },
      {
        columnDef: "Client.Name",
        header: this.translateService.instant('shared.client'),
        cell: (element: Order) => element.clientName,
      },
      {
        columnDef: "Client.PhoneNumber",
        header: this.translateService.instant('shared.clientPhoneNumber'),
        cell: (element: Order) => element.clientPhoneNumber,
      },
      {
        columnDef: "Remarks",
        header: this.translateService.instant('shared.remarks'),
        cell: (element: Order) => element.remarks,
      },
      {
        columnDef: "CreatedBy",
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: Order) => element.createdBy,
      },
      {
        columnDef: "CreatedOn",
        header: this.translateService.instant('table.createdAt.label'),
        cell: (element: Order) => element.createdOn,
      },
    ];
  }

  public handleOrderTransaction(row: ResponseDto) {
    // this.handleEditRow(row);
  }
}
