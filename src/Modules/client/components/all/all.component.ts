import {Component, OnInit, OnDestroy} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Subscription, Observable, BehaviorSubject, of} from "rxjs";
import {ClientService} from "./../../services/client.service";
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
			cell: (element: any) => element.id,
		},
		{
			columnDef: "Name",
			header: "Name",
			cell: (element: any) => element.name,
		},
		{
			columnDef: "PhoneNumber",
			header: "Phone Number",
			cell: (element: any) => element.phoneNumber,
		},
		{
			columnDef: "type",
			header: "type",
			cell: (element: any) => element.clientType?.name,
		},
	];
	constructor(private _client: ClientService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = of(this.columns).pipe();
		this.getAll();
	}
	getAll = () => this.subscriptions.push(this._client.getAll().subscribe((data: any) => this.tableData.next(data)));
	handleDelete = (id: number) => this.subscriptions.push(this._client.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
