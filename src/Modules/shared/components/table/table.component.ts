import { SendDataFromTableToMatDialoge } from './../../services/sendDataFromTableToMatDialoge.service';
import { Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { FormHelpers } from '../../classes/form-helpers';

@Component({
	selector: 'app-table[dialogDisplayName][tableColumns][tableData][dialogHeader]',
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
	@Output() onClose = new EventEmitter();
	@Input() dialogDisplayName!: string;
	@Input() dialogHeader!: string;
	@Input() loading: any;
	@Input() tableColumns: any;
	@Input() canView: boolean = false;
	@Input() canEdit: boolean = true;
	@Input() hasTransaction: boolean = false;
	@Input() isDisplayDeleteButton: boolean = true;
	@Input() isHideAllButtons: boolean = false;
	@Input() formName!: FormDialogNames;
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
	constructor(private _router: Router, public dialog: MatDialog, private route: ActivatedRoute, private sendRowId: SendDataFromTableToMatDialoge) { }
	ngOnInit(): void {
		this.displayedColumns = [...this.tableColumns.map((c: any) => c.columnDef), 'actions'];
	}
	applyFilter = (event: Event) => {
		this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	};

	async HandleNew() {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		this.dialog.open(dialogComponent)
	}
	async handleEdit(row: any) {
		const dialogComponent = await FormHelpers.getAppropriateDialogComponent(this.formName);
		this.dialog.open(dialogComponent, { data: row })

	}
	handleView = (id: number) => {
		this.OnView.emit();
		this.sendRowId.setOrderId(id);
	};
	handleTransaction = (row: any) => this._router.navigate([`../transaction`], { queryParams: { id: row.id }, relativeTo: this.route });
	handleDelete = (row: any) => {
		this.subscriptions.push(
			this.dialog
				.open(DialogComponent, { data: { location: this.dialogHeader, msg: `هل انت متاكد من حذف "${row[this.dialogDisplayName]}"؟` } })
				.afterClosed()
				.subscribe(() => this.OnDelete.emit(row.id))
		);
	};
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}

}
