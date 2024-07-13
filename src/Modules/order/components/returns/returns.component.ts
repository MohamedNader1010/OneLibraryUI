import { OrderDetail } from './../../interfaces/IorderDetail';
import { OrderService } from './../../services/orders.service';
import { Component, inject, OnInit } from '@angular/core';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
import { TableCommonFunctionality } from 'src/Modules/shared/components/table/tableCommonFunctionality';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css'],
})
export class ReturnsComponent extends TableCommonFunctionality implements OnInit {
  orderDetails: OrderDetail[] = [];
  override databaseService = inject(OrderService);

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

  override loadData() {
    this.databaseService.getOrdersByStatus(OrderDetailStatus.مرتجع);
  }
}
