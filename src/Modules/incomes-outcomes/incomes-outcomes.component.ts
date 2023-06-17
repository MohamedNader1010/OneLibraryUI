import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {IncomeOutcome} from './Enums/IncomeOutcomeEnum';
import {IncomesOutcomes} from './interfaces/Incomes-outcomes';
import {IncomesOutcomesService} from './services/Incomes-outcomes.service';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

@Component({
	selector: 'app-Incomes-outcomes',
	templateUrl: './Incomes-outcomes.component.html',
	styleUrls: ['./Incomes-outcomes.component.css'],
})
export class IncomesOutcomesComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	loading!: boolean;
	formName = FormDialogNames.incomeOutcomeFormDialogComponent;
	componentName = ComponentsName.incomeOutcome;

	constructor(httpClient: HttpClient, toastr: ToastrService, public override database: IncomesOutcomesService, private translate: TranslateService, public dialog: MatDialog) {
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
				cell: (element: IncomesOutcomes) => element.id,
			},
			{
				columnDef: 'amount',
				header: 'المبلغ',
				cell: (element: IncomesOutcomes) => element.amount,
			},
			{
				columnDef: 'status',
				header: 'الحالة',
				cell: (element: IncomesOutcomes) => (element.status == IncomeOutcome.صادر ? 'صادر' : 'وارد'),
			},
			{
				columnDef: 'comment',
				header: 'ملاحظات',
				cell: (element: IncomesOutcomes) => element.comment,
			},
			{
				columnDef: 'createdBy',
				header: 'التسجيل بواسطة',
				cell: (element: IncomesOutcomes) => element.createdBy,
			},
			{
				columnDef: 'time-createdOn',
				header: 'وقت التسجيل',
				cell: (element: IncomesOutcomes) => element.createdOn,
			},
		];
	}

	public loadData() {
		this.database.getAllIncomesOutcomes();
	}
}
