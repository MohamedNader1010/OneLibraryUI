import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Attendance} from '../attendance/interfaces/attendance';
import {ServicePricePerClientType} from './Interfaces/ServicePricePerClientType';
import {ServicePricePerClientTypeService} from './services/service-price-per-client-type.service';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-service-price-per-client-Type',
	templateUrl: './service-price-per-client-Type.component.html',
	styleUrls: ['./service-price-per-client-Type.component.css'],
})
export class ServicePricePerClientTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Attendance[];
	loading!: boolean;
	formName = FormDialogNames.ServicePricePerClientFormDialogComponent;
	componentName = ComponentsName.servicePricePerClientType;

	constructor(private translate: TranslateService, httpClient: HttpClient, public override database: ServicePricePerClientTypeService, toastr: ToastrService) {
		super(httpClient, toastr, database);
	}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
		this.database.getAllServicePrices();
	}
}
