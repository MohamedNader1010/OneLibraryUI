import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";

import { SendDataFromTableToMatDialoge } from "./../../../shared/services/sendDataFromTableToMatDialoge.service";
import { OrderService } from "../../services/orders.service";
import { Order } from "../../interfaces/Iorder";
import { Status } from "../../Enums/status";
@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"],
})
export class DetailsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  id!: number;
  order!: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _order: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private getRowId: SendDataFromTableToMatDialoge
  ) {}
  ngOnInit(): void {
    this.id = this.getRowId.getOrderId();
    this._order.getOne(this.id).subscribe((data) => (this.order = data));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  orderTrackingProgress(status: Status): number {
    switch (status) {
      case Status.استلم:
        return 100;
      case Status.اكتمل:
        return 79;
      case Status.جاهز:
        return 65;
      case Status.غير_مكتمل:
        return 44;
      case Status.اعداد:
        return 28;
      case Status.مرتجع:
        return 5;
      case Status.هالك:
        return 54;
      case Status.حجز:
        return 15;
      default:
        return 0;
    }
  }
}
