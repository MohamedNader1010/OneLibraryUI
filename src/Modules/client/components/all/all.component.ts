import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Client } from '../../interFaces/Iclient';
import { ClientService } from './../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
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
	formName = FormDialogNames.ClientFormDialogComponent;
	constructor(private dialogService: DialogServiceService, private _client: ClientService, public dialog: MatDialog, private toastr: ToastrService) { }
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.getAll();
		this.onDialogClosed();
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe(_ => {
			this.getAll()
		})
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Client) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Client) => element.name,
			},
			{
				columnDef: 'PhoneNumber',
				header: 'رقم التليفون',
				cell: (element: Client) => element.phoneNumber,
			},
			{
				columnDef: 'type',
				header: 'النوع',
				cell: (element: Client) => element.clientType,
			},
			{
				columnDef: 'total',
				header: 'اجمالي التعاملات',
				cell: (element: Client) => element.total,
			},
			{
				columnDef: 'paid',
				header: 'قام بدفع',
				cell: (element: Client) => element.paid,
			},
			{
				columnDef: 'rset',
				header: 'المبلغ المتبقي',
				cell: (element: Client) => element.rest,
			},
		];
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
