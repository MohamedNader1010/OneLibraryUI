import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {ServicesService} from '../service/services/services.service';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {IncomeOutcome} from './Enums/IncomeOutcomeEnum';
import {MaterialTracking} from './interfaces/materialTracking';
import {MaterialTrackingService} from './services/materialTracking.service';
import {Response} from '../shared/interfaces/Iresponse';

@Component({
	selector: 'app-materialTracking',
	templateUrl: './materialTracking.component.html',
	styleUrls: ['./materialTracking.component.css'],
})
export class materialTrackingComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.materialTrackingFormDialogComponent;
	componentName = ComponentsName.materialTracking;
	database!: MaterialTrackingService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private toastr: ToastrService, private _materialTracking: MaterialTrackingService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: MaterialTracking) => element.id,
			},
			{
				columnDef: 'material',
				header: 'أسم الخامة',
				cell: (element: MaterialTracking) => element.material,
			},
			{
				columnDef: 'quantity',
				header: 'الكمية',
				cell: (element: MaterialTracking) => element.quantity,
			},
			{
				columnDef: 'status',
				header: 'الحالة',
				cell: (element: MaterialTracking) => (element.status == IncomeOutcome.صادر ? 'صادر' : 'وارد'),
			},
			{
				columnDef: 'comment',
				header: 'ملاحظات',
				cell: (element: MaterialTracking) => element.comment,
			},
			{
				columnDef: 'createdBy',
				header: 'التسجيل بواسطة',
				cell: (element: MaterialTracking) => element.createdBy,
			},
			{
				columnDef: 'time-createdOn',
				header: 'وقت التسجيل',
				cell: (element: MaterialTracking) => element.createdOn,
			},
		];
	}

	public loadData() {
		this.database = new MaterialTrackingService(this.httpClient, this.toastr);
		this.database.getAllMaterialTracking();
	}

	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}

	handleNewRow = (message: string) => {
		this.database.dataChange.value.push(this._materialTracking.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._materialTracking.dialogData;
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
