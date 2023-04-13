import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {ServicesTypeService} from './services/serviceType.service';
import {Response} from '../shared/interfaces/Iresponse';

@Component({
	selector: 'app-serviceType',
	templateUrl: './serviceType.component.html',
	styleUrls: ['./serviceType.component.css'],
})
export class ServiceTypeComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.ServiceTypeFormDialogComponent;
	componentName = ComponentsName.service;
	database!: ServicesTypeService;
	dataSource!: TableDataSource;

	constructor(private tranlate: TranslateService, private httpClient: HttpClient, private dialog: MatDialog, private _serviceType: ServicesTypeService, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
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
	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}
	public handleNewRow(message: string) {
		this.database.dataChange.value.push(this._serviceType.dialogData);
		this.toastr.success(message);
	}
	public handleEditRow(data: Response) {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._serviceType.dialogData;
		this.toastr.success(data.message);
	}

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
