import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild, ElementRef, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription, fromEvent} from 'rxjs';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {FormHelpers} from '../../classes/form-helpers';
import {TableDataSource} from '../../classes/tableDataSource';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {DeleteDialogComponent} from '../delete-dialog/delete-dialog.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	public displayedColumns!: string[];

	@Output() OnDelete = new EventEmitter<any>();
	@Output() OnView = new EventEmitter<any>();
	@Output() onClose = new EventEmitter();
	@Output() onNew = new EventEmitter<any>();
	@Output() onEdit = new EventEmitter<any>();
	@Output() onTransaction = new EventEmitter<any>();

	@Input() database: any;
	dataSource!: TableDataSource;
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort!: MatSort;
	@ViewChild('filter', {static: true}) filter!: ElementRef;

	@Input() loading: any;
	@Input() tableColumns: any;
	@Input() canAdd: boolean = true;
	@Input() canEdit: boolean = true;
	@Input() canDelete: boolean = true;
	@Input() canView: boolean = false;
	@Input() hasTransaction: boolean = false;
	@Input() formName!: FormDialogNames;
	@Input() componentName!: ComponentsName;

	columns: any[] = [];
	constructor(public dialog: MatDialog) {}
	ngOnInit(): void {
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
		this.loadData();
	}

	public loadData() {
		this.dataSource = new TableDataSource(this.database, this.paginator, this.sort);
		this.subscriptions.push(
			fromEvent(this.filter.nativeElement, 'keyup').subscribe(() => {
				if (!this.dataSource) return;
				this.dataSource.filter = this.filter.nativeElement.value;
			})
		);
	}

	clearFilter = () => (this.dataSource.filter = this.filter.nativeElement.value = '');

	async HandleNew() {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		const dialogRef = this.dialog.open<any>(dialogComponent, {minWidth: '30%'});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) this.onNew.emit(result.data.message);
				},
				complete: () => this.refreshTable(),
			})
		);
	}
	async handleEdit(row: any) {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		const dialogRef = this.dialog.open<any>(dialogComponent, {data: row});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) this.onEdit.emit(result.data);
				},
				complete: () => this.refreshTable(),
			})
		);
	}

	async handleDelete(row: any) {
		const deleteDialogComponent = await FormHelpers.getDeleteDialogComponent();
		const dialogRef = this.dialog.open<DeleteDialogComponent>(deleteDialogComponent, {data: {row: row, componentName: this.componentName}, minWidth: '30%'});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe((result) => {
				if (result?.data) {
					result.data.body = row;
					this.OnDelete.emit(result.data);
					this.refreshTable();
				}
			})
		);
	}

	async handleTransaction(row: any) {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.orderTransactionFormDialogComponent);
		const dialogRef = this.dialog.open<any>(dialogComponent, {data: row, minWidth: '30%'});
		this.subscriptions.push(
			dialogRef.afterClosed().subscribe({
				next: (result) => {
					if (result?.data) this.onTransaction.emit(result.data.message);
				},
				complete: () => this.refreshTable(),
			})
		);
	}

	async handleView(row: any) {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(FormDialogNames.orderDetailsDialogComponent);
		const dialogRef = this.dialog.open<any>(dialogComponent, {data: row, minWidth: '30%'});
	}

	private refreshTable = () => this.paginator._changePageSize(this.paginator.pageSize);

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
