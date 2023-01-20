import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {Subscription} from 'rxjs';
import {ServicePricePerClientTypeService} from '../../API_Services/service-price-per-client-type.service';

import {ServicePricePerClientType} from './../../Interfaces/ServicePricePerClientType';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
	constructor(private _sp: ServicePricePerClientTypeService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'Id',
				header: '#',
				cell: (element: ServicePricePerClientType) => `${element.id}`,
			},
			{
				columnDef: 'Price',
				header: 'السعر',
				cell: (element: ServicePricePerClientType) => `${element.price}`,
			},
			{
				columnDef: 'Service Name',
				header: 'الأسم',
				cell: (element: ServicePricePerClientType) => `${element.serviceName}`,
			},
			{
				columnDef: 'Client Type',
				header: 'نوع العميل',
				cell: (element: ServicePricePerClientType) => `${element.clientType}`,
			},
		];
		this.getAll();
	}

	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: [];
	loading!: boolean;

	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._sp.getAll().subscribe((data: any) => {
				this.tableData = data;
				this.loading = false;
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._sp.delete(id).subscribe(() => this.getAll()));

	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
