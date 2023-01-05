import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Component, EventEmitter, Input, OnInit, OnDestroy, Output, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
	selector: "app-table[controllerName][dialogDisplayName][tableColumns][tableData]",
	templateUrl: "./table.component.html",
	styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	@ViewChild(MatTable) matTable!: MatTable<any>;
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
	@Input() controllerName!: string;
	@Input() dialogDisplayName!: string;
	@Input() tableColumns: any;
	@Input() tableData: any;
	@Output() OnDelete = new EventEmitter<any>();
	columns: any[] = [];
	displayedColumns: any[] = [];
	constructor(private _router: Router, private _liveAnnouncer: LiveAnnouncer, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.subscriptions.push(this.tableData.subscribe((data: any) => (this.dataSource.data = data)));
		this.subscriptions.push(
			this.tableColumns.subscribe((data: any) => {
				this.columns = data;
				this.displayedColumns = [...data.map((c: any) => c.columnDef), "actions"];
			})
		);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
	announceSortChange = (sortState: Sort) => (sortState.direction ? this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`) : this._liveAnnouncer.announce("Sorting cleared"));
	applyFilter = (event: Event) => {
		this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	};
	HandleNew = () => this._router.navigate([`${this.controllerName}/new`]);
	handleEdit = (row: any) => this._router.navigate([`${this.controllerName}/edit`], {queryParams: {id: row.id}});
	handleDelete = (row: any) => {
		this.subscriptions.push(
			this.dialog
				.open(DialogComponent, {data: {location: "controllerName", msg: `are you sure you want to delete "${row[this.dialogDisplayName]}"?`}})
				.afterClosed()
				.subscribe(() => this.OnDelete.emit(row.id))
		);
	};
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
