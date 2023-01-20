import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable, BehaviorSubject, of, Subscription} from 'rxjs';
import {Order} from '../../interfaces/Iorder';
import {OrderService} from '../../services/orders.service';
import {Client} from './../../../client/interFaces/Iclient';
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
	constructor(private _order: OrderService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Order) => `${element.id}`,
			},
			{
				columnDef: 'TotalPrice',
				header: 'السعر الكلي',
				cell: (element: Order) => `${element.totalPrice}`,
			},
			{
				columnDef: 'rest',
				header: 'الباقي',
				cell: (element: Order) => `${element.rest}`,
			},
			{
				columnDef: 'Paid',
				header: 'المدفوع',
				cell: (element: Order) => `${element.paid}`,
			},
			{
				columnDef: 'Status',
				header: 'الحالة',
				cell: (element: Order) => `${element.status}`,
			},
			{
				columnDef: 'Client',
				header: 'العميل',
				cell: (element: Order) => `${element.client.name}`,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._order.getAll().subscribe((data: any) => {
				this.tableData = data;
				this.loading = false;
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._order.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
