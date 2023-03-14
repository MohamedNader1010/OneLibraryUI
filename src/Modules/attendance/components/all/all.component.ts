import {DatePipe} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {Subscription, fromEvent} from 'rxjs';
import {TableDataSource} from 'src/Modules/shared/classes/tableDataSource';
import {Attendance} from '../../interfaces/attendance';
import {AttendanceService} from '../../services/attendance.service';
import {DeleteDialogComponent} from '../delete/delete.dialog.component';
import {FormDialogComponent} from '../formDialog/form.dialog.component';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	database!: AttendanceService;
	dataSource!: TableDataSource;
	@Input() paginationSizes: number[] = [10, 20, 50, 100];
	constructor(public httpClient: HttpClient, public dialog: MatDialog, private _attendance: AttendanceService, private toastr: ToastrService, public datepipe: DatePipe) {}
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;
	@ViewChild('filter', {static: true}) filter!: ElementRef;
	displayedColumns!: string[];
	tableColumns: any[] = [];
	ngOnInit(): void {
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
				columnDef: 'day',
				header: 'التاريخ',
				cell: (element: Attendance): Date | null | string => (element.checkIn !== null ? this.datepipe.transform(new Date(element.checkIn), 'yyyy-MM-dd') : null),
			},
			{
				columnDef: 'in',
				header: 'حضور',
				cell: (element: Attendance): Date | null | string => (element.checkIn !== null ? this.datepipe.transform(new Date(element.checkIn), 'hh:mm a') : null),
			},
			{
				columnDef: 'out',
				header: 'انصراف',
				cell: (element: Attendance): Date | null | string => (element.checkOut !== null ? this.datepipe.transform(new Date(element.checkOut), 'hh:mm a') : null),
			},
		];
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}
	public loadData() {
		this.database = new AttendanceService(this.httpClient, this.toastr);
		this.database.getAllAttendance();
		this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
		this.subscriptions.push(
			fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
				if (!this.dataSource) return;
				this.dataSource.filter = this.filter.nativeElement.value;
			})
		);
	}
	clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');
	addNew() {
		const dialogRef = this.dialog.open(FormDialogComponent, {
			minWidth: '30%',
		});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value.push(this._attendance.getDialogData());
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	startEdit(row: Attendance) {
		const dialogRef = this.dialog.open(FormDialogComponent, {data: row});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === row.id)] = this._attendance.getDialogData();
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	deleteItem(row: Attendance) {
		const dialogRef = this.dialog.open(DeleteDialogComponent, {
			data: row,
			minWidth: '30%',
		});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value.splice(
						this.database.dataChange.value.findIndex((x) => x.id === row.id),
						1
					);
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);
	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
