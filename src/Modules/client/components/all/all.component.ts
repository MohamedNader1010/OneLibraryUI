import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ClientService} from './../../services/client.service';
@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: [];
	loading!: boolean;

	constructor(private _client: ClientService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: 'id',
				cell: (element: any) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'Name',
				cell: (element: any) => element.name,
			},
			{
				columnDef: 'PhoneNumber',
				header: 'Phone Number',
				cell: (element: any) => element.phoneNumber,
			},
			{
				columnDef: 'type',
				header: 'type',
				cell: (element: any) => element.clientType?.name,
			},
		];
		this.getAll();
	}

	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._client.getAll().subscribe((data: any) => {
				this.tableData = data;
				this.loading = false;
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._client.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
