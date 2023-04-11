import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {DialogServiceService} from '../shared/services/dialog-service.service';
import {Material} from './interfaces/Imaterial';
import {MaterialService} from './services/material.service';
import {Response} from '../shared/interfaces/Iresponse';

@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.css'],
})
export class MaterialComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Material[];
	loading!: boolean;
	formName = FormDialogNames.MaterialFormDialogComponent;
	database!: MaterialService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private dialogService: DialogServiceService, private _material: MaterialService, public dialog: MatDialog, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
		// this.onDialogClosed();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Material) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Material) => element.name,
			},
			{
				columnDef: 'price',
				header: 'سعر الجملة',
				cell: (element: Material) => element.price,
			},
			{
				columnDef: 'CurrentQty',
				header: 'الكمية الحالية',
				cell: (element: Material) => element.quantity,
			},
		];
	}

	// private onDialogClosed() {
	// 	this.dialogService.onClose().subscribe((_) => {
	// 	});
	// }

	public loadData() {
		this.database = new MaterialService(this.httpClient, this.toastr);
		this.database.getAllMaterials();
	}

	handleNewRow = (data: any) => {
		this.database.dataChange.value.push(this._material.dialogData);
		this.toastr.success(data.message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._material.dialogData;
		this.toastr.success(data.message);
	};

	handleDelete = (data: Response) => {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data.body.id),
			1
		);
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
