import {AlertServiceService} from './../../../shared/services/alert-service.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Status} from '../../Enums/status';
import {Order} from '../../interfaces/Iorder';
import {OrderService} from '../../services/orders.service';
import {DetailsComponent} from '../details/details.component';
import {TranslateService} from '@ngx-translate/core';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';

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
	formName = FormDialogNames.OrderFormDialogComponent;
	constructor(private translate: TranslateService, private _order: OrderService, public dialog: MatDialog, private alertService: AlertServiceService, private dialogService: DialogServiceService) {}
	ngOnInit(): void {
		this.initiateTableHeader()
		this.onDialogClosed();
		this.getAll();
	}
	private initiateTableHeader() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Order) => `${element.id}`,
			},
			{
				columnDef: 'TotalPrice',
				header: 'الاجمالي',
				cell: (element: Order) => `${element.totalPrice}`,
			},
			{
				columnDef: 'rest',
				header: 'المتبقي',
				cell: (element: Order) => `${element.rest}`,
			},
			{
				columnDef: 'Paid',
				header: 'المدفوع',
				cell: (element: Order) => `${element.paid}`,
			},
			{
				columnDef: 'Status',
				header: 'حالة الطلب',
				cell: (element: Order) => `${this.getStatusText(element.orderStatus)}`,
			},
			{
				columnDef: 'Client',
				header: 'العميل',
				cell: (element: Order) => `${element.clientName}`,
			},
			{
				columnDef: 'Remarks',
				header: 'ملاحظات',
				cell: (element: Order) => element.remarks,
			},
		];
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe(_ => {
			this.getAll()
		})
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._order.getAll().subscribe({
				next: (data) => {
					this.tableData = data;
				},
				error: (e) => {
					this.alertService.onError(e.message, '');
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
