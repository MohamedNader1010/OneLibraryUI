import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Attendance} from '../attendance/interfaces/attendance';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {ServicePricePerClientType} from './Interfaces/ServicePricePerClientType';
import {ServicePricePerClientTypeService} from './services/service-price-per-client-type.service';
import {Response} from '../shared/interfaces/Iresponse';

@Component({
	selector: 'app-service-price-per-client-Type',
	templateUrl: './service-price-per-client-Type.component.html',
	styleUrls: ['./service-price-per-client-Type.component.css'],
})
export class ServicePricePerClientTypeComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Attendance[];
	loading!: boolean;
	formName = FormDialogNames.ServicePricePerClientFormDialogComponent;
	componentName = ComponentsName.servicePricePerClientType;
	database!: ServicePricePerClientTypeService;
	dataSource!: TableDataSource;

	constructor(private httpClient: HttpClient, private _servicePricePerClientType: ServicePricePerClientTypeService, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'Id',
				header: '#',
				cell: (element: ServicePricePerClientType) => `${element.id}`,
			},
			{
				columnDef: 'Service Name',
				header: 'الخدمة',
				cell: (element: ServicePricePerClientType) => `${element.service}`,
			},
			{
				columnDef: 'Client Type',
				header: 'نوع العميل',
				cell: (element: ServicePricePerClientType) => `${element.clientType}`,
			},
			{
				columnDef: 'Price',
				header: 'السعر',
				cell: (element: ServicePricePerClientType) => `${element.price}`,
			},
		];
	}
	private loadData() {
		this.database = new ServicePricePerClientTypeService(this.httpClient, this.toastr);
		this.database.getAllServicePrices();
	}
	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}
	public handleNewRow(message: string) {
		this.database.dataChange.value.push(this._servicePricePerClientType.dialogData);
		this.toastr.success(message);
	}
	public handleEditRow(data: Response) {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._servicePricePerClientType.dialogData;
		this.toastr.success(data.message);
	}

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
