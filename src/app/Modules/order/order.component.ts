import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../core/data/models/order/Iorder';
import { OrderService } from '../../core/data/services/orders.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { ResponseDto } from '../../shared/interfaces/response.dto';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { getEnumOptions } from '../../shared/utilities/enum.utility';
import { OrderStatusMapper } from '../../shared/mappers/order-status.mapper';
import { OrderStatus } from '../../shared/enums/OrderStatus.enum';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  formName = FormDialogNames.OrderFormDialogComponent;
  componentName = ComponentsName.order;
  databaseService = inject(OrderService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeader();
    this.loadPaginatedData();
  }

  loadPaginatedData = () => {
    this.databaseService.getPagedData().subscribe();
  };

  private initiateTableHeader() {
    this.tableColumns = [
      {
        columnDef: 'Id',
        header: this.translateService.instant('table.id.label'),
        cell: (element: Order) => element.id,
      },
      {
        columnDef: 'Client.Name',
        header: this.translateService.instant('shared.client'),
        cell: (element: Order) => element.clientName,
      },
      {
        columnDef: 'ClientType.Name',
        header: 'نوع العميل',
        cell: (element: Order) => element.clientTypeName,
      },
      {
        columnDef: 'Client.PhoneNumber',
        header: this.translateService.instant('shared.clientPhoneNumber'),
        cell: (element: Order) => element.clientPhoneNumber,
      },
      {
        columnDef: 'FinalPrice',
        header: this.translateService.instant('shared.finalPrice'),
        cell: (element: Order) => element.finalPrice,
      },
      {
        columnDef: 'Rest',
        header: this.translateService.instant('shared.rest'),
        cell: (element: Order) => element.rest,
      },
      {
        columnDef: 'Paid',
        header: this.translateService.instant('shared.paid'),
        cell: (element: Order) => element.paid,
      },
      {
        columnDef: 'Status',
        header: this.translateService.instant('order.status'),
        cell: (element: Order) => OrderStatusMapper.get(element.status),
        enumOptions: getEnumOptions(OrderStatus, OrderStatusMapper),
      },
      {
        columnDef: 'Remarks',
        header: this.translateService.instant('shared.remarks'),
        cell: (element: Order) => element.remarks,
      },
      {
        columnDef: 'CreatedBy',
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: Order) => element.createdBy,
      },
      {
        columnDef: 'CreatedOn',
        header: this.translateService.instant('table.createdAt.label'),
        cell: (element: Order) => element.createdOn,
      },
    ];
  }

  public handleOrderTransaction(row: ResponseDto) {
    // this.handleEditRow(row);
  }
}
