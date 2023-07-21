import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Client} from './interFaces/Iclient';
import {ClientService} from './services/client.service';
import {ToastrService} from 'ngx-toastr';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import { PaginationDto } from '../shared/interfaces/paginationDto';
@Component({
	selector: 'app-all',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css'],
})
export class ClientComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	loading!: boolean;
	formName = FormDialogNames.ClientFormDialogComponent;
	componentName = ComponentsName.client;
	constructor(public override database: ClientService, public override httpClient: HttpClient, public override toastr: ToastrService, private translate: TranslateService) {
		super(httpClient, toastr, database);
	}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
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
	loadData() {
		this.loading = true;
		// this is the defaul criteria when first call the endpoint.
		const pagingCriteria : PaginationDto = {
			isDesc: true, 
			keyWord: '', 
			length: 25,
			orderByPropertyName: 'id', 
			pageIndex: 0
		} 
		this.database.getOrderPerPage(pagingCriteria).subscribe();
	}
}
