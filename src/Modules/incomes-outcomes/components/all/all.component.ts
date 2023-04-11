import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {Subscription, fromEvent} from 'rxjs';
import {TableDataSource} from 'src/Modules/shared/classes/tableDataSource';
import {IncomeOutcome} from '../../Enums/IncomeOutcomeEnum';
import {IncomesOutcomes} from '../../interfaces/Incomes-outcomes';
import {DeleteDialogComponent} from '../delete/delete.dialog.component';
import {FormDialogComponent} from '../formDialog/form.dialog.component';
import {IncomesOutcomesService} from '../../services/Incomes-outcomes.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	database!: IncomesOutcomesService;
	dataSource!: TableDataSource;
	@Input() paginationSizes: number[] = [10, 20, 50, 100];
	constructor(public httpClient: HttpClient, public dialog: MatDialog, private _inOut: IncomesOutcomesService, private toastr: ToastrService) {}
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
				cell: (element: IncomesOutcomes) => element.id,
			},
			{
				columnDef: 'amount',
				header: 'الكمية',
				cell: (element: IncomesOutcomes) => element.amount,
			},
			{
				columnDef: 'status',
				header: 'الحالة',
				cell: (element: IncomesOutcomes) => (element.status == IncomeOutcome.صادر ? 'صادر' : 'وارد'),
			},
			{
				columnDef: 'comment',
				header: 'ملاحظات',
				cell: (element: IncomesOutcomes) => element.comment,
			},
			{
				columnDef: 'createdBy',
				header: 'التسجيل بواسطة',
				cell: (element: IncomesOutcomes) => element.createdBy,
			},
			{
				columnDef: 'time-createdOn',
				header: 'وقت التسجيل',
				cell: (element: IncomesOutcomes) => element.createdOn,
			},
		];
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}
	public loadData() {
		this.database = new IncomesOutcomesService(this.httpClient, this.toastr);
		this.database.getAllIncomesOutcomes();
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
					this.database.dataChange.value.push(this._inOut.DialogData);
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	startEdit(row: IncomesOutcomes) {
		const dialogRef = this.dialog.open(FormDialogComponent, {data: row});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === row.id)] = this._inOut.DialogData;
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	deleteItem(row: IncomesOutcomes) {
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
