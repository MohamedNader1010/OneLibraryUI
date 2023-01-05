import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Observable, BehaviorSubject, of, Subscription} from "rxjs";
import {Order} from "../../interfaces/Iorder";
import {OrderService} from "../../services/orders.service";
@Component({
	selector: "app-all",
	templateUrl: "./all.component.html",
	styleUrls: ["./all.component.css"],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns = new Observable();
	tableData = new BehaviorSubject([]);
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
	constructor(private _order: OrderService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = of(this.columns).pipe();
		this.getAll();
	}
	getAll = () => this.subscriptions.push(this._order.getAll().subscribe((data: any) => this.tableData.next(data)));
	handleDelete = (id: number) => this.subscriptions.push(this._order.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
