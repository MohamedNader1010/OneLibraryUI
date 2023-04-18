import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClientType } from './interFaces/IclientType';
import { ClientTypeService } from './services/clientType.service';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { ComponentsName } from 'src/Persistents/enums/components.name';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-clientType',
	templateUrl: './clientType.component.html',
	styleUrls: ['./clientType.component.css'],
})
export class ClientTypeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: ClientType[];
	loading!: boolean;
	formName = FormDialogNames.ClientTypeFormDialogComponent;
	componentName = ComponentsName.client;
	constructor(
		public override database: ClientTypeService,
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
				columnDef: this.translate.instant('form.id'),
				header: this.translate.instant('form.id.label'),
				cell: (element: any) => element.id,
			},
			{
				columnDef: this.translate.instant('form.name'),
				header: this.translate.instant('form.name.label'),
				cell: (element: any) => element.name,
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
