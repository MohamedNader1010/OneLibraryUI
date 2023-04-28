import { HttpClient } from '@angular/common/http';
import { AlertServiceService } from '../shared/services/alert-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Status } from './Enums/status';
import { Order } from './interfaces/Iorder';
import { OrderService } from './services/orders.service';
import { DetailsComponent } from './components/details/details.component';
import { TranslateService } from '@ngx-translate/core';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { ComponentsName } from 'src/Persistents/enums/components.name';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css'],
})
export class OrderComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Order[];
	loading!: boolean;
	formName = FormDialogNames.OrderFormDialogComponent;
	componentName = ComponentsName.order;
	constructor(
		private translate: TranslateService,
		public dialog: MatDialog,
		private alertService: AlertServiceService,
		private dialogService: DialogServiceService,
		public override database: OrderService,
		public override toastr: ToastrService,
		public override httpClient: HttpClient
	) {
		super(httpClient, toastr, database)
	}

	ngOnInit(): void {
		this.initiateTableHeader();
		this.getAll();
	}
	private initiateTableHeader() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('form.id'),
				header: this.translate.instant('form.id.label'),
				cell: (element: Order) => `${element.id}`,
			},
			{
				columnDef: this.translate.instant('shared.totatPrice.label'),
				header: this.translate.instant('shared.totalPrice'),
				cell: (element: Order) => `${element.totalPrice}`,
			},
			{
				columnDef: this.translate.instant('shared.rest.label'),
				header: this.translate.instant('shared.rest'),
				cell: (element: Order) => `${element.rest}`,
			},
			{
				columnDef: this.translate.instant('shared.paid.label'),
				header: this.translate.instant('shared.paid'),
				cell: (element: Order) => `${element.paid}`,
			},
			{
				columnDef: this.translate.instant('order.status'),
				header: this.translate.instant('order.status.label'),
				cell: (element: Order) => `${this.getStatusText(element.orderStatus)}`,
			},
			{
				columnDef: this.translate.instant('shared.client.label'),
				header: this.translate.instant('shared.client'),
				cell: (element: Order) => `${element.clientName}`,
			},
			{
				columnDef: this.translate.instant('shared.remarks.label'),
				header: this.translate.instant('shared.remarks'),
				cell: (element: Order) => element.remarks,
			},
		];
	}

	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this.database.getAll().subscribe({
				next: (res) => {
					console.log(res.body)
					this.database.loadingData.next(true)
					this.database.dataChange.next(res.body)
				},
				error: (res) => {
					this.database.loadingData.next(false)
					this.toastr.error(res.error.message, res.error.message);
					this.loading = false;
				},
				complete: () => {
					this.database.loadingData.next(false)
				},
			})
		);
	}
	handleOrderDetails(data: any) {
		this.subscriptions.push(
			this.dialog
				.open(DetailsComponent)
				.afterClosed()
				.subscribe(() => { })
		);
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
