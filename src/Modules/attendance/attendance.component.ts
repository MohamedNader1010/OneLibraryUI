import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TableDataSource } from 'src/Modules/shared/classes/tableDataSource';
import { Attendance } from './interfaces/attendance';
import { AttendanceService } from './services/attendance.service';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { ComponentsName } from 'src/Persistents/enums/components.name';
import { TranslateService } from '@ngx-translate/core';
import { Response } from '../shared/interfaces/Iresponse';

@Component({
	selector: 'attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit, OnDestroy {

	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Attendance[];
	loading!: boolean;
	formName = FormDialogNames.AttendanceFormDialogComponent;
	componentName = ComponentsName.attendance;
	database!: AttendanceService;
	dataSource!: TableDataSource;
	displayedColumns!: string[];

	constructor(
		private tranlate: TranslateService,
		private httpClient: HttpClient,
		private dialog: MatDialog,
		private _attendance: AttendanceService,
		private toastr: ToastrService
	) { }

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Attendance) => element.id,
			},
			{
				columnDef: 'name',
				header: 'أسم الموظف',
				cell: (element: Attendance) => element.employee,
			},
			{
				columnDef: 'time-in',
				header: 'حضور',
				cell: (element: Attendance) => element.checkIn,
			},
			{
				columnDef: 'time-out',
				header: 'انصراف',
				cell: (element: Attendance) => element.checkOut,
			},
		];
	}
	private loadData() {
		this.database = new AttendanceService(this.httpClient, this.toastr);
		this.database.getAllAttendance();
	}
	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message)
	}
	public handleNewRow(message: string) {
		this.database.dataChange.value.push(this._attendance.dialogData);
		this.toastr.success(message);
	}
	public handleEditRow(data: Response) {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._attendance.dialogData;
		this.toastr.success(data.message);
	}

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
