import {LiveAnnouncer} from '@angular/cdk/a11y';
import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
	selector: 'app-table[controllerName][dialogDisplayName][tableColumns][tableData][dialogHeader]',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	public dataSource = new MatTableDataSource<any>([]);
	public displayedColumns!: string[];
	private paginator!: MatPaginator;
	private sort!: MatSort;
	@Output() OnDelete = new EventEmitter<any>();
	@Output() OnView = new EventEmitter<any>();
	@Input() dialogDisplayName!: string;
	@Input() controllerName!: string;
	@Input() dialogHeader!: string;
	@Input() loading: any;
	@Input() tableColumns: any;
	@Input() canView: boolean = false;
	@Input() hasTransaction: boolean = false;
	@ViewChild(MatSort) set matSort(ms: MatSort) {
		this.sort = ms;
		this.setDataSourceAttributes();
	}
	@ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
		this.paginator = mp;
		this.setDataSourceAttributes();
	}
	@Input() set tableData(data: any[]) {
		this.dataSource = new MatTableDataSource<any>(data);
		this.setDataSourceAttributes();
	}
	setDataSourceAttributes() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	columns: any[] = [];
	constructor(private _router: Router, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
	}
	applyFilter = (event: Event) => {
		this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	};
	HandleNew = () => this._router.navigate([`${this.controllerName}/new`]);
	handleEdit = (row: any) => this._router.navigate([`${this.controllerName}/edit`], {queryParams: {id: row.id}});
	handleTransaction = (row: any) => this._router.navigate([`${this.controllerName}/transaction`], {queryParams: {id: row.id}});
	handleDelete = (row: any) => {
		this.subscriptions.push(
			this.dialog
				.open(DialogComponent, {data: {location: this.dialogHeader, msg: `هل انت متاكد من حذف "${row[this.dialogDisplayName]}"؟`}})
				.afterClosed()
				.subscribe(() => this.OnDelete.emit(row.id))
		);
	};
	handleView = (row: any) => {
		this.OnView.emit(row.id);
	};
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
