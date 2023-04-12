import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {DialogServiceService} from '../shared/services/dialog-service.service';
import {Service} from './interfaces/Iservice';
import {ServicesService} from './services/services.service';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {HttpClient} from '@angular/common/http';
import {Response} from '../shared/interfaces/Iresponse';

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
	database!: ServicesService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private toastr: ToastrService, private dialogService: DialogServiceService, private _service: ServicesService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
		// this.onDialogClosed();
	}
	// private onDialogClosed() {
	// 	this.dialogService.onClose().subscribe((_) => {
	// 		this.getAll();
	// 	});
	// }
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Service) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Service) => element.name,
			},
			{
				columnDef: 'Material',
				header: 'الخامة',
				cell: (element: Service) => element.serviceMaterial?.map((s) => s.material),
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

	handleNewRow = (message: string) => {
		console.log(this._service.dialogData);

		this.database.dataChange.value.push(this._service.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._service.dialogData;
		this.toastr.success(data.message);
	};

	handleDelete = (data: any) => {
		this._service.delete(data).subscribe({
			next: (res) => {
				this.toastr.success(res.message);
			},
			error: (e) => {
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => {
				this.database.dataChange.value.splice(
					this.database.dataChange.value.findIndex((x) => x.id === data),
					1
				);
			},
		});
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
