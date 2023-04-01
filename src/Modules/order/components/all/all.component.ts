import {AlertServiceService} from './../../../shared/services/alert-service.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Status} from '../../Enums/status';
import {Order} from '../../interfaces/Iorder';
import {OrderService} from '../../services/orders.service';
import {DetailsComponent} from '../details/details.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Order[];
	loading!: boolean;
	constructor(private translate: TranslateService, private _order: OrderService, public dialog: MatDialog, private alertService: AlertServiceService) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: this.translate.instant('order.number'),
				cell: (element: Order) => `${element.id}`,
			},
			{
				columnDef: 'TotalPrice',
				header: this.translate.instant('shared.totalPrice'),
				cell: (element: Order) => `${element.totalPrice}`,
			},
			{
				columnDef: 'rest',
				header: this.translate.instant('order.rest'),
				cell: (element: Order) => `${element.rest}`,
			},
			{
				columnDef: 'Paid',
				header: this.translate.instant('order.paid'),
				cell: (element: Order) => `${element.paid}`,
			},
			{
				columnDef: 'Status',
				header: this.translate.instant('order.status'),
				cell: (element: Order) => `${this.getStatusText(element.orderStatus)}`,
			},
			{
				columnDef: 'Client',
				header: this.translate.instant('shared.clientName'),
				cell: (element: Order) => `${element.clientName}`,
			},
			{
				columnDef: 'Remarks',
				header: this.translate.instant('shared.notice'),
				cell: (element: Order) => element.remarks,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._order.getAll().subscribe({
				next: (data) => {
					this.tableData = data;
				},
				error: (e) => {
					this.alertService.onError(e.message, this.translate.instant('cantLoadData'));
					this.loading = false;
				},
				complete: () => {
					this.loading = false;
				},
			})
		);
	}
	handleOrderDetails(data: any) {
		this.subscriptions.push(
			this.dialog
				.open(DetailsComponent)
				.afterClosed()
				.subscribe(() => {})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._order.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
	private getStatusText(status: Status) {
		switch (status) {
			case Status.استلم:
				return 'استلم';
			case Status.اعداد:
				return 'اعداد';
			case Status.اكتمل:
				return 'اكتمل';
			case Status.جاهز:
				return 'جاهز';
			case Status.حجز:
				return 'حجز';
			case Status.غير_مكتمل:
				return 'غير مكتمل';
			case Status.مرتجع:
				return 'مرتجع';
			default:
				return '';
		}
	}
}
