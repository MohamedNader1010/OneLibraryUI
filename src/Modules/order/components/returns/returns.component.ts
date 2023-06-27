import {TranslateService} from '@ngx-translate/core';
import {OrderDetail} from './../../interfaces/IorderDetail';
import {OrderService} from './../../services/orders.service';
import {Component, OnInit} from '@angular/core';
import {Status} from '../../Enums/status';
import {ToastrService} from 'ngx-toastr';
import {HttpClient} from '@angular/common/http';
import {TableCommonFunctionality} from 'src/Modules/shared/classes/tableCommonFunctionality';
import {ComponentsName} from 'src/Persistents/enums/components.name';

@Component({
	selector: 'app-returns',
	templateUrl: './returns.component.html',
	styleUrls: ['./returns.component.css'],
})
export class ReturnsComponent extends TableCommonFunctionality implements OnInit {
	tableColumns!: {columnDef: string; header: string; cell: any}[];
	orderDetails: OrderDetail[] = [];
	loading: boolean = false;
	constructor(private translate: TranslateService, public override database: OrderService, public override toastr: ToastrService, public override httpClient: HttpClient) {
		super(httpClient, toastr, database);
	}
	ngOnInit(): void {
		this.initializeTableColumns();
		this.loadData();
	}

	private initializeTableColumns() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
				cell: (orderDetails: OrderDetail) => orderDetails.id,
			},
			{
				columnDef: this.translate.instant('order.item.label'),
				header: this.translate.instant('order.item'),
				cell: (orderDetails: OrderDetail) => orderDetails.service ?? orderDetails.note,
			},
			{
				columnDef: this.translate.instant('order.number.label'),
				header: this.translate.instant('order.number'),
				cell: (orderDetails: OrderDetail) => orderDetails.orderId,
			},
			{
				columnDef: this.translate.instant('shared.price.label'),
				header: this.translate.instant('shared.price'),
				cell: (orderDetails: OrderDetail) => orderDetails.price,
			},
			{
				columnDef: this.translate.instant('quantity'),
				header: this.translate.instant('quantity.label'),
				cell: (orderDetails: OrderDetail) => orderDetails.quantity,
			},
		];
	}

	loadData() {
		this.database = new OrderService(this.httpClient, this.toastr);
		this.database.getOrdersByStatus(Status.مرتجع);
	}
}
