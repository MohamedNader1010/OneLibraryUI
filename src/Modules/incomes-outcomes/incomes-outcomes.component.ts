import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {IncomeOutcome} from './Enums/IncomeOutcomeEnum';
import {IncomesOutcomes} from './interfaces/Incomes-outcomes';
import {IncomesOutcomesService} from './services/Incomes-outcomes.service';
import {Response} from '../shared/interfaces/Iresponse';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-Incomes-outcomes',
	templateUrl: './Incomes-outcomes.component.html',
	styleUrls: ['./Incomes-outcomes.component.css'],
})
export class IncomesOutcomesComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.incomeOutcomeFormDialogComponent;
	componentName = ComponentsName.incomeOutcome;
	database!: IncomesOutcomesService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private toastr: ToastrService, private _incomesOutcomes: IncomesOutcomesService,
		private translate: TranslateService, public dialog: MatDialog) {}
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
				header: 'الكمية',
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
		this.database = new IncomesOutcomesService(this.httpClient, this.toastr);
		this.database.getAllIncomesOutcomes();
	}

	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}

	handleNewRow = (message: string) => {
		console.log(this._incomesOutcomes.dialogData);

		this.database.dataChange.value.push(this._incomesOutcomes.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._incomesOutcomes.dialogData;
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
