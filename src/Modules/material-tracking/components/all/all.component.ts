import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {Subscription, fromEvent} from 'rxjs';
import {TableDataSource} from 'src/Modules/shared/classes/tableDataSource';
import {IncomeOutcome} from '../../Enums/IncomeOutcomeEnum';
import {MaterialTracking} from '../../interfaces/materialTracking';
import {DeleteDialogComponent} from '../delete/delete.dialog.component';
import {FormDialogComponent} from '../formDialog/form.dialog.component';
import {MaterialTrackingService} from './../../services/materialTracking.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	database!: MaterialTrackingService;
	dataSource!: TableDataSource;
	@Input() paginationSizes: number[] = [10, 20, 50, 100];
	constructor(public httpClient: HttpClient, public dialog: MatDialog, private _mat: MaterialTrackingService, private toastr: ToastrService) {}
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
			// {
			// 	columnDef: 'modefiedBy',
			// 	header: 'التحديث بواسطة',
			// 	cell: (element: MaterialTracking) => element.modifiedBy,
			// },
			// {
			// 	columnDef: 'time-modefiedOn',
			// 	header: 'وقت التحديث',
			// 	cell: (element: MaterialTracking) => element.modifiedOn,
			// },
		];
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}
	public loadData() {
		this.database = new MaterialTrackingService(this.httpClient, this.toastr);
		this.database.getAllMaterialTracking();
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
					this.database.dataChange.value.push(this._mat.DialogData);
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	startEdit(row: MaterialTracking) {
		const dialogRef = this.dialog.open(FormDialogComponent, {data: row});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === row.id)] = this._mat.DialogData;
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	deleteItem(row: MaterialTracking) {
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
