import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Subscription} from 'rxjs';

import {SendDataFromTableToMatDialoge} from './../../../shared/services/sendDataFromTableToMatDialoge.service';
import {OrderService} from '../../services/orders.service';
import {Order} from '../../interfaces/Iorder';
import {Status} from '../../Enums/status';
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	id!: number;
	order!: Order;

	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _order: OrderService, public dialog: MatDialog, private getRowId: SendDataFromTableToMatDialoge) {}
	ngOnInit(): void {
		this.id = this.getRowId.getOrderId();
		this._order.GetById(this.id).subscribe((data) => {
			this.order = data.body;
		});
	}

	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

	orderTrackingProgress(status: Status): number {
		switch (status) {
			case Status.غير_مكتمل:
				return 0;
			case Status.اعداد:
				return 25;
			case Status.جاهز:
				return 50;
			case Status.استلم:
				return 75;
			case Status.اكتمل:
				return 100;
			// case Status.مرتجع:
			// 	return 5;
			// case Status.هالك:
			// 	return 54;
			// case Status.حجز:
			// 	return 15;
			default:
				return 0;
		}
	}
}
