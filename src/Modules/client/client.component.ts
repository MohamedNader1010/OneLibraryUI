import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Client} from './interFaces/Iclient';
import {ClientService} from './services/client.service';
import {ToastrService} from 'ngx-toastr';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { TranslateService } from '@ngx-translate/core';
import { EmployeeService } from '../employee/services/employee.service';
import { HttpClient } from '@angular/common/http';
import { ComponentsName } from 'src/Persistents/enums/components.name';
@Component({
	selector: 'app-all',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css'],
})
export class ClientComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Client[];
	loading!: boolean;
	formName = FormDialogNames.ClientFormDialogComponent;
	componentName = ComponentsName.client;
	constructor(
		public override database: ClientService,
		public override httpClient: HttpClient,
		public override toastr: ToastrService,
		private translate: TranslateService) {
			super(httpClient, toastr, database);
		}
	
	
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.getAll();
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
				cell: (element: Client) => element.id,
			},
			{
				columnDef: this.translate.instant('form.name'),
				header: this.translate.instant('form.name.label'),
				cell: (element: Client) => element.name,
			},
			{
				columnDef: this.translate.instant('form.phoneNumber'),
				header: this.translate.instant('form.phoneNumber.label'),
				cell: (element: Client) => element.phoneNumber,
			},
			{
				columnDef: this.translate.instant('form.client.type'),
				header: this.translate.instant('form.client.type.label'),
				cell: (element: Client) => element.clientType,
			},
			{
				columnDef: this.translate.instant('form.client.total'),
				header: this.translate.instant('form.client.total.label'),
				cell: (element: Client) => element.total,
			},
			{
				columnDef: this.translate.instant('form.client.paid'),
				header: this.translate.instant('form.client.paid.label'),
				cell: (element: Client) => element.paid,
			},
			{
				columnDef: this.translate.instant('form.client.rest'),
				header: this.translate.instant('form.client.rest.label'),
				cell: (element: Client) => element.rest,
			},
		];
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this.database.getAll().subscribe({
				next: (res) => {
					this.database.loadingData.next(true)
					this.database.dataChange.next(res.body)
				},
				error: (res) => {
					this.database.loadingData.next(false)
					this.toastr.error(res.error.body.Message, res.error.message);
					this.loading = false;
				},
				complete: () => {
					this.database.loadingData.next(false)
				},
			})
		);
	}
	
}
