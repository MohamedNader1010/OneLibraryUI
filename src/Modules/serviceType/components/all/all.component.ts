import {Component, OnDestroy, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import {ServicesTypeService} from "../../services/serviceType.service";

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
	];
	constructor(private _serviceType: ServicesTypeService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = of(this.columns).pipe();
		this.getAll();
	}
	getAll = () => this.subscriptions.push(this._serviceType.getAll().subscribe((data: any) => this.tableData.next(data)));
	handleDelete = (id: number) => this.subscriptions.push(this._serviceType.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
