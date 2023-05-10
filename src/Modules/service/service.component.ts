import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {Service} from './interfaces/Iservice';
import {ServicesService} from './services/services.service';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {Response} from '../shared/interfaces/Iresponse';
import {TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-service',
	templateUrl: './service.component.html',
	styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.ServiceFormDialogComponent;
	componentName = ComponentsName.service;
	database!: ServicesService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private translate: TranslateService, private toastr: ToastrService, private _service: ServicesService, public dialog: MatDialog) {}
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
		this.database = new ServicesService(this.httpClient, this.toastr);
		this.database.getAllServices();
	}

	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}

	handleNewRow = (message: string) => {
		console.log(this._service.dialogData);

		this.database.dataChange.value.push(this._service.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._service.dialogData;
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
