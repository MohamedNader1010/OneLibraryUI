import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Service} from './interfaces/Iservice';
import {ServicesService} from './services/services.service';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

@Component({
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.css'],
})
export class ServiceComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	loading!: boolean;
	formName = FormDialogNames.ServiceFormDialogComponent;
	componentName = ComponentsName.service;

	constructor(httpClient: HttpClient, public override database: ServicesService, private translate: TranslateService, toastr: ToastrService, public dialog: MatDialog) {
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
				cell: (element: Service) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Service) => element.name,
			},
			{
				columnDef: 'Material',
				header: 'الخامات',
				cell: (element: Service) => {
					let materials = '';
					element.serviceMaterials?.forEach((m) => (materials += `عدد (${m.quantity}) من ${m.material}, `));
					return materials.slice(0, -2);
				},
			},
			{
				columnDef: 'Originalprice',
				header: 'سعر التكلفة',
				cell: (element: Service) => element.originalPrice,
			},
			{
				columnDef: 'Type',
				header: 'النوع',
				cell: (element: Service) => element.serviceType,
			},
		];
	}

	public loadData() {
		this.database.getAllServices();
	}
}
