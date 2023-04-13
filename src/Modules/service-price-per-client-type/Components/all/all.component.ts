import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';

import {Subscription} from 'rxjs';
import {ServicePricePerClientTypeService} from '../../API_Services/service-price-per-client-type.service';

import {ServicePricePerClientType} from './../../Interfaces/ServicePricePerClientType';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit {
	constructor(private dialogService: DialogServiceService, private _sp: ServicePricePerClientTypeService, public dialog: MatDialog, private toastr: ToastrService) {}

	ngOnInit(): void {
		this.initiateTableHeader();
		this.getAll();
		this.onDialogClosed();
	}

	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: any[];
	loading!: boolean;
	formName = FormDialogNames.ServicePricePerClientFormDialogComponent;

	private initiateTableHeader() {
		this.tableColumns = [
			{
				columnDef: 'Id',
				header: '#',
				cell: (element: ServicePricePerClientType) => `${element.id}`,
			},
			{
				columnDef: 'Service Name',
				header: 'الخدمة',
				cell: (element: ServicePricePerClientType) => `${element.service}`,
			},
			{
				columnDef: 'Client Type',
				header: 'نوع العميل',
				cell: (element: ServicePricePerClientType) => `${element.clientType}`,
			},
			{
				columnDef: 'Price',
				header: 'السعر',
				cell: (element: ServicePricePerClientType) => `${element.price}`,
			},
		];
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe((_) => {
			this.getAll();
		});
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._sp.getAll().subscribe({
				next: (data) => {
					this.tableData = data.body;
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
	handleDelete = (id: number) => this.subscriptions.push(this._sp.delete(id).subscribe(() => this.getAll()));

	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
