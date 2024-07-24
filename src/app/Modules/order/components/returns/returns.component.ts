import { Component, inject, OnInit } from '@angular/core';
import { OrderDetail } from '../../../../core/data/models/order/IorderDetail';
import { OrderService } from '../../../../core/data/services/orders.service';
import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
})
export class ReturnsComponent implements OnInit {
  orderDetails: OrderDetail[] = [];
  databaseService = inject(OrderService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (orderDetails: OrderDetail) => orderDetails.id,
      },
      {
        columnDef: this.translateService.instant('order.item.label'),
        header: this.translateService.instant('order.item'),
        cell: (orderDetails: OrderDetail) => orderDetails.service ?? orderDetails.note,
      },
      {
        columnDef: this.translateService.instant('order.number.label'),
        header: this.translateService.instant('order.number'),
        cell: (orderDetails: OrderDetail) => orderDetails.orderId,
      },
      {
        columnDef: this.translateService.instant('shared.price.label'),
        header: this.translateService.instant('shared.price'),
        cell: (orderDetails: OrderDetail) => orderDetails.price,
      },
      {
        columnDef: this.translateService.instant('quantity'),
        header: this.translateService.instant('quantity.label'),
        cell: (orderDetails: OrderDetail) => orderDetails.quantity,
      },
    ];
  }

  loadData() {
    this.databaseService.getOrdersByStatus(OrderDetailStatus.مرتجع);
  }
}
