import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Attendance} from './interfaces/attendance';
import {AttendanceService} from './services/attendance.service';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
@Component({
	selector: 'attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Attendance[];
	loading!: boolean;
	formName = FormDialogNames.AttendanceFormDialogComponent;
	componentName = ComponentsName.attendance;

	constructor(httpClient: HttpClient, public override database: AttendanceService, private translate: TranslateService, toastr: ToastrService) {
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
		this.database.getAllAttendance();
	}
}
