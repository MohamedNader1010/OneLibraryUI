import {HttpClient} from '@angular/common/http';
import {Component, OnInit, OnDestroy, Input, ViewChild, ElementRef} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ToastrService} from 'ngx-toastr';
import {Subscription, fromEvent} from 'rxjs';
import {TableDataSource} from 'src/Modules/shared/classes/tableDataSource';
import {FeadbackService} from './../../services/feadback.service';
import {Feadback} from './../../interfaces/feadback';
import {FormDialogComponent} from '../formDialog/form.dialog.component';
import {DeleteDialogComponent} from '../delete/delete.dialog.component';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	database!: FeadbackService;
	dataSource!: TableDataSource;
	@Input() paginationSizes: number[] = [10, 20, 50, 100];
	constructor(public httpClient: HttpClient, public dialog: MatDialog, private _feedback: FeadbackService, private toastr: ToastrService) {}
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
				cell: (element: Feadback) => element.id,
			},
			{
				columnDef: 'cleint',
				header: 'أسم العميل',
				cell: (element: Feadback) => element.cleint,
			},
			{
				columnDef: 'feedBack',
				header: 'التعليق',
				cell: (element: Feadback) => element.feedBack,
			},
			{
				columnDef: 'time-feedBackDate',
				header: 'التاريخ',
				cell: (element: Feadback) => element.feedBackDate,
			},
		];
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}
	public loadData() {
		this.database = new FeadbackService(this.httpClient, this.toastr);
		this.database.getAllClientFeedbacks();
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
					this.database.dataChange.value.push(this._feedback.DialogData);
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	startEdit(row: Feadback) {
		const dialogRef = this.dialog.open(FormDialogComponent, {data: row});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === row.id)] = this._feedback.DialogData;
					this.refreshTable();
					this.toastr.success(result.data.message);
				}
			})
		);
	}
	deleteItem(row: Feadback) {
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
