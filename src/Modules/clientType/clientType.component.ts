import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {ClientType} from './interFaces/IclientType';
import {ClientTypeService} from './services/clientType.service';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {HttpClient} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

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
	componentName = ComponentsName.clientType;
	constructor(public override database: ClientTypeService, public override httpClient: HttpClient, public override toastr: ToastrService, private translate: TranslateService) {
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
				cell: (element: any) => element.id,
			},
			{
				columnDef: this.translate.instant('form.name'),
				header: this.translate.instant('form.name.label'),
				cell: (element: any) => element.name,
			},
		];
	}
	loadData() {
		this.loading = true;
		this.database = new ClientTypeService(this.httpClient, this.toastr);
		this.database.getAllClientTypes();
	}
}
