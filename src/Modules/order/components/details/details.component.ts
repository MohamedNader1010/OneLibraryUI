import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { OrderService } from '../../services/orders.service';
import { Order } from '../../interfaces/Iorder';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id!: number;
  order!: Order;
  destroy$ = new Subject<void>();
  progress: number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order, private _orderService: OrderService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this._orderService
      .GetById(this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
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
      5: 100, //اكتمل
      6: 0, //غير_مكتمل
    };

    let totalProgress = 0;
    for (const detail of this.order.orderDetails) {
      const progress = progressValues[detail.orderStatus];
      if (progress !== undefined) {
        totalProgress += progress;
      }
    }

    return totalProgress / this.order.orderDetails.filter((d) => !(d.orderStatus == OrderDetailStatus.مرتجع || d.orderStatus == OrderDetailStatus.هالك)).length;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
