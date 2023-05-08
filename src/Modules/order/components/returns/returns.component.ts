import { TranslateService } from '@ngx-translate/core';
import { OrderDetail } from './../../interfaces/IorderDetail';
import { OrderService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { Status } from '../../Enums/status';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { TableCommonFunctionality } from 'src/Modules/shared/classes/tableCommonFunctionality';
import { ComponentsName } from 'src/Persistents/enums/components.name';

@Component({
	selector: 'app-returns',
	templateUrl: './returns.component.html',
	styleUrls: ['./returns.component.css'],
})
export class ReturnsComponent extends TableCommonFunctionality implements OnInit {
	tableColumns!: { columnDef: string; header: string; cell: any }[];
	orderDetails: OrderDetail[] = [];
	loading: boolean = false;
	componentName = ComponentsName.order;
	constructor(
		private translate: TranslateService,
		public override database: OrderService,
		public override toastr: ToastrService,
		public override httpClient: HttpClient
	) {
		super(httpClient, toastr, database)
	}
	ngOnInit(): void {
		this.initializeTableColumns();
		this.getOrdersByStatus();
	}

	private initializeTableColumns() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('order.number.label'),
				header: this.translate.instant('order.number'),
				cell: (orderDetails: OrderDetail) => orderDetails.id,
			},
			{
				columnDef: this.translate.instant('order.status.label'),
				header: this.translate.instant('order.status'),
				cell: (orderDetails: OrderDetail) => orderDetails.orderStatus,
			},
			{
				columnDef: this.translate.instant('shared.price.label'),
				header: this.translate.instant('shared.price'),
				cell: (orderDetails: OrderDetail) => orderDetails.price,
			},
			{
				columnDef: this.translate.instant('order.quantity.label'),
				header: this.translate.instant('order.quantity'),
				cell: (orderDetails: OrderDetail) => orderDetails.quantity,
			},
			{
				columnDef: this.translate.instant('order.item.label'),
				header: this.translate.instant('order.item'),
				cell: (orderDetails: OrderDetail) => orderDetails.service ?? orderDetails.note,
			},
		];
	}
	private getOrdersByStatus() {
		this.loading = true;
		this.database.getOrdersByStatus(Status.مرتجع).subscribe({
			next: (res) => {
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
				this.loading = false
			},
		});
	}
}
