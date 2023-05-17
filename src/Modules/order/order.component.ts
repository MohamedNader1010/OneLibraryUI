import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Status} from './Enums/status';
import {Order} from './interfaces/Iorder';
import {OrderService} from './services/orders.service';
import {TranslateService} from '@ngx-translate/core';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css'],
})
export class OrderComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	formName = FormDialogNames.OrderFormDialogComponent;
	componentName = ComponentsName.order;
	constructor(private translate: TranslateService, public dialog: MatDialog, public override database: OrderService, public override toastr: ToastrService, public override httpClient: HttpClient) {
		super(httpClient, toastr, database);
	}

	ngOnInit(): void {
		this.initiateTableHeader();
		this.loadData();
	}
	private initiateTableHeader() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
				columnDef: this.translate.instant('order.status.label'),
				header: this.translate.instant('order.status'),
				cell: (element: Order) => `${this.getStatusText(element.orderStatus)}`,
			},
			{
				columnDef: this.translate.instant('shared.client.label'),
				header: this.translate.instant('shared.client'),
				cell: (element: Order) => `${element.clientName}`,
			},
			{
				columnDef: this.translate.instant('shared.clientPhoneNumber.label'),
				header: this.translate.instant('shared.clientPhoneNumber'),
				cell: (element: Order) => `${element.clientPhoneNumber}`,
			},
			{
				columnDef: this.translate.instant('shared.remarks.label'),
				header: this.translate.instant('shared.remarks'),
				cell: (element: Order) => element.remarks,
			},
		];
	}

	loadData() {
		this.database.getAllOrders();
	}

	public handleOrderTransaction(message: string) {
		this.toastr.success(message);
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
