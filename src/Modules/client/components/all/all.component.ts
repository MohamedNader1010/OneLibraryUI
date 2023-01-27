import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Client} from '../../interFaces/Iclient';
import {ClientService} from './../../services/client.service';
import {ToastrService} from 'ngx-toastr';
@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Client[];
	loading!: boolean;

	constructor(private _client: ClientService, public dialog: MatDialog, private toastr: ToastrService) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: any) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: any) => element.name,
			},
			{
				columnDef: 'PhoneNumber',
				header: 'رقم التلفون',
				cell: (element: any) => element.phoneNumber,
			},
			{
				columnDef: 'type',
				header: 'النوع',
				cell: (element: any) => element.clientType,
			},
		];
		this.getAll();
	}

	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._client.getAll().subscribe({
				next: (data) => {
					this.tableData = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
					this.loading = false;
				},
				complete: () => {
					this.loading = false;
				},
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._client.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
