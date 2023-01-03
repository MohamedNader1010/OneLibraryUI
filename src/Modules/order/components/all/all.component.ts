import {LiveAnnouncer} from "@angular/cdk/a11y";
import {Component, OnInit, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";
import {DialogComponent} from "src/Modules/shared/components/dialog/dialog.component";
import {Order} from "../../interfaces/Iorder";
import {OrderDetail} from "../../interfaces/IorderDetail";
import {OrderTransaction} from "../../interfaces/IorderTransaction";
import {OrderService} from "../../services/orders.service";

@Component({
	selector: "app-all",
	templateUrl: "./all.component.html",
	styleUrls: ["./all.component.css"],
})
export class AllComponent implements OnInit {
	@ViewChild(MatTable) servicesTable!: MatTable<any>;
	DetailsDataSource: OrderDetail[] = [];
	TransactionsDataSource: OrderTransaction[] = [];
	constructor(private _router: Router, private _liveAnnouncer: LiveAnnouncer, private _order: OrderService, public dialog: MatDialog) {}
	columns = [
		{
			columnDef: "id",
			header: "id",
			cell: (element: Order) => `${element.id}`,
		},
		{
			columnDef: "TotalPrice",
			header: "Total Price",
			cell: (element: Order) => `${element.totalPrice}`,
		},
		{
			columnDef: "rest",
			header: "Rest",
			cell: (element: Order) => `${element.rest}`,
		},
		{
			columnDef: "Paid",
			header: "Paid",
			cell: (element: Order) => `${element.paid}`,
		},
		{
			columnDef: "Status",
			header: "Status",
			cell: (element: Order) => `${element.status}`,
		},
		{
			columnDef: "ClientId",
			header: "Client Id",
			cell: (element: Order) => `${element.clientId}`,
		},
		{
			columnDef: "Details",
			header: "Details",
			cell: (element: Order) => {
				let details = "";
				element.orderDetails.map((detail) => {
					details += `${detail.noteId} ,`;
				});
				return details;
			},
		},
	];
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;
	dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
	ngOnInit(): void {
		// this.getAllDetails();
		// this.getAllTransactions();
		this.getAll();
	}
	getAll() {
		this._order.getAll().subscribe({
			next: (data) => {
				this.dataSource.data = data;
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
			},
			// error: (e) => console.log(e),
		});
	}
	// getAllDetails = () => this._details.getAll().subscribe({next: (data) => (this.DetailsDataSource = data)});
	// getAllTransactions = () => this._transactions.getAll().subscribe({next: (data) => (this.TransactionsDataSource = data)});
	dcols = this.columns.map((c) => c.columnDef);
	displayedColumns = [...this.dcols, "actions"];
	announceSortChange = (sortState: Sort) => (sortState.direction ? this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`) : this._liveAnnouncer.announce("Sorting cleared"));
	applyFilter = (event: Event) => {
		this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
		if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
	};
	HandleNew = () => this._router.navigate(["orders/new"]);
	handleEdit = (row: Order) => this._router.navigate(["orders/edit"], {queryParams: {id: row.id}});
	handleDelete = (row: Order) => {
		this.dialog
			.open(DialogComponent, {data: {location: "orders", msg: `are you sure you want to delete "${row.id}"?`}})
			.afterClosed()
			.subscribe((result) => {
				if (result) this._order.delete(row.id).subscribe({complete: () => this.getAll()});
			});
	};
}
