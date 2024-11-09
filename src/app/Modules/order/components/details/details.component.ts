import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Order } from '../../../../core/data/models/order/Iorder';
import { OrderService } from '../../../../core/data/services/orders.service';
import { OrderDetailStatusMapper } from '../../../../shared/mappers/order-detail-status.mapper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  id!: number;
  order!: Order;
  destroy$ = new Subject<void>();
  progress: number = 0;
  OrderDetailStatusMapper = OrderDetailStatusMapper;
  constructor(@Inject(MAT_DIALOG_DATA) public data: Order, private _orderService: OrderService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this._orderService.GetById(this.data.id).subscribe({
      next: (res) => {
        this.order = res.body;
        this.progress = this.orderTrackingProgress();
      },
    });
  }

  orderTrackingProgress(): number {
    if (this.order.orderDetails?.length <= 0) return 0;
    const progressValues: Record<string, number> = {
      0: 25, //حجز
      1: 50, //جاهز
      2: 100, //استلم
      3: 100, //مرتجع
      4: 100, //هالك
    };
    let totalProgress = 0;
    for (const detail of this.order.orderDetails) totalProgress += progressValues[detail.status] ?? 0;
    return totalProgress / this.order.orderDetails.length;
  }

  handleOrderPrint() {
    this._orderService.printOrderById(this.order.id).subscribe({
      next: (res) => {
        console.log('printed');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
