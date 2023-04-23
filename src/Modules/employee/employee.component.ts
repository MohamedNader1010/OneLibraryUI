import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {EmployeeService} from './services/employee.service';
import {Employee} from './interFaces/Iemployee';
import {ToastrService} from 'ngx-toastr';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-employee',
	templateUrl: './employee.component.html',
	styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	formName = FormDialogNames.EmployeeFormDialogComponent;
	componentName = ComponentsName.employee;
	tableColumns!: any[];
	loading!: boolean;
	constructor(public override database: EmployeeService, public override httpClient: HttpClient, public override toastr: ToastrService, private translate: TranslateService) {
		super(httpClient, toastr, database);
	}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.getAll();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			// {
			// 	columnDef: this.translate.instant('form.id'),
			// 	header: this.translate.instant('form.id.label'),
			// 	cell: (element: Employee) => element.id,
			// },
			{
				columnDef: this.translate.instant('form.name'),
				header: this.translate.instant('form.name.label'),
				cell: (element: Employee) => element.name,
			},
			{
				columnDef: this.translate.instant('form.username'),
				header: this.translate.instant('form.username.label'),
				cell: (element: Employee) => element.userName,
			},
			{
				columnDef: this.translate.instant('form.phoneNumber'),
				header: this.translate.instant('form.phoneNumber.label'),
				cell: (element: Employee) => element.phoneNumber,
			},
			{
				columnDef: this.translate.instant('form.email'),
				header: this.translate.instant('form.email.label'),
				cell: (element: Employee) => element.email,
			},
			{
				columnDef: this.translate.instant('form.emailComfirmed'),
				header: this.translate.instant('form.emailConfirmed.label'),
				cell: (element: Employee) => (element.emailConfirmed ? this.translate.instant('form.email.active') : this.translate.instant('form.email.inactive')),
			},
		];
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this.database.getAll().subscribe({
				next: (res) => {
					this.database.loadingData.next(true);
					this.database.dataChange.next(res.body);
				},
				error: (res) => {
					this.database.loadingData.next(false);
					this.toastr.error(res.error.body.Message, res.error.message);
					this.loading = false;
				},
				complete: () => {
					this.database.loadingData.next(false);
				},
			})
		);
	}
}
