import {TranslateService} from '@ngx-translate/core';
import {OrderDetail} from './../../interfaces/IorderDetail';
import {OrderService} from './../../services/orders.service';
import {Component, OnInit} from '@angular/core';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { TableCommonFunctionality } from 'src/Modules/shared/classes/tableCommonFunctionality';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css'],
})
export class ReturnsComponent extends TableCommonFunctionality implements OnInit {
  orderDetails: OrderDetail[] = [];
  constructor(private _translate: TranslateService, override databaseService: OrderService, toastrService: ToastrService, httpClient: HttpClient) {
    super(httpClient, toastrService, databaseService);
  }
  ngOnInit(): void {
    this.initializeTableColumns();
    this.loadData();
  }

  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: this._translate.instant('table.id'),
        header: this._translate.instant('table.id.label'),
        cell: (orderDetails: OrderDetail) => orderDetails.id,
      },
      {
        columnDef: this._translate.instant('order.item.label'),
        header: this._translate.instant('order.item'),
        cell: (orderDetails: OrderDetail) => orderDetails.service ?? orderDetails.note,
      },
      {
        columnDef: this._translate.instant('order.number.label'),
        header: this._translate.instant('order.number'),
        cell: (orderDetails: OrderDetail) => orderDetails.orderId,
      },
      {
        columnDef: this._translate.instant('shared.price.label'),
        header: this._translate.instant('shared.price'),
        cell: (orderDetails: OrderDetail) => orderDetails.price,
      },
      {
        columnDef: this._translate.instant('quantity'),
        header: this._translate.instant('quantity.label'),
        cell: (orderDetails: OrderDetail) => orderDetails.quantity,
      },
    ];
  }

  override loadData() {
    // this.databaseService = new OrderService(this.httpClient, this.toastrService);
    this.databaseService.getOrdersByStatus(OrderDetailStatus.مرتجع);
  }
}
