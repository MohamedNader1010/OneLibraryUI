import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {ServicesTypeService} from './services/serviceType.service';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

@Component({
	selector: 'app-serviceType',
	templateUrl: './serviceType.component.html',
	styleUrls: ['./serviceType.component.css'],
})
export class ServiceTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.ServiceTypeFormDialogComponent;
	componentName = ComponentsName.serviceType;

	constructor(private translate: TranslateService, httpClient: HttpClient, private dialog: MatDialog, public override database: ServicesTypeService, toastr: ToastrService) {
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
				cell: (element: any) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'نوع الخدمة',
				cell: (element: any) => element.name,
			},
		];
	}

	private loadData() {
		this.database = new ServicesTypeService(this.httpClient, this.toastr);
		this.database.getAllServices();
	}
}
