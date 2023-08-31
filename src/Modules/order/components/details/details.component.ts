import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

import { OrderService } from '../../services/orders.service';
import { Order } from '../../interfaces/Iorder';
import { Status } from '../../Enums/status';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  id!: number;
  order!: Order;
  destroy$ = new Subject<void>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Order, private _orderService: OrderService, public dialog: MatDialog) {}
  ngOnInit(): void {
    this._orderService
      .GetById(this.data.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.order = res.body;
        },
      });
  }

  orderTrackingProgress(status: Status): number {
    switch (status) {
      case Status.غير_مكتمل:
        return 0;
      case Status.جاهز:
        return 33;
      case Status.استلم:
        return 66;
      case Status.اكتمل:
        return 100;
      default:
        return 0;
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
