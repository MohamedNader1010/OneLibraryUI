import { AlertServiceService } from './../../../shared/services/alert-service.service';
import { OrderDetail } from './../../interfaces/IorderDetail';
import { OrderService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Status } from '../../Enums/status';

@Component({
  selector: 'app-returns',
  templateUrl: './returns.component.html',
  styleUrls: ['./returns.component.css']
})
export class ReturnsComponent implements OnInit {
  tableColumns!: { columnDef: string, header: string, cell: any }[];
  orderDetails: OrderDetail[] = [];
  loading: boolean = false;
  constructor(private orderService: OrderService, private alertService: AlertServiceService) { }
  ngOnInit(): void {
    this.initializeTableColumns();
    this.getOrdersByStatus();
  }


  private initializeTableColumns() {
    this.tableColumns = [
      {
        columnDef: 'order Id',
        header: "رقم الطلب",
        cell: (orderDetails: OrderDetail) => orderDetails.id
      },
      {
        columnDef: 'returns',
        header: "حالة الطلب",
        cell: (orderDetails: OrderDetail) => orderDetails.orderStatus
      },
      {
        columnDef: 'price',
        header: 'السعر',
        cell: (orderDetails: OrderDetail) => orderDetails.price
      },
      {
        columnDef: 'quantity',
        header: 'الكميه',
        cell: (orderDetails: OrderDetail) => orderDetails.quantity
      },
      {
        columnDef: 'service',
        header: 'خدمات',
        cell: (orderDetails: OrderDetail) => this.getNameOrNull(orderDetails.service)
      },
      {
        columnDef: 'note',
        header: 'مذكرات',
        cell: (orderDetails: OrderDetail) => this.getNameOrNull(orderDetails.note)
      }
    ]

  }
  private getOrdersByStatus() {
    this.loading = true;
    this.orderService.getOrdersByStatus(Status.مرتجع).subscribe(
      data => this.orderDetails = data,
      error => this.alertService.onError(error.Message, 'Error'),
      () => this.loading = false
    )
  }
  private getNameOrNull(name: string): string {
    return name ?? '--';
  }

}
