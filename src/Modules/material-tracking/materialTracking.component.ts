import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {IncomeOutcome} from './Enums/IncomeOutcomeEnum';
import {MaterialTracking} from './interfaces/materialTracking';
import {MaterialTrackingService} from './services/materialTracking.service';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

@Component({
	selector: 'app-materialTracking',
	templateUrl: './materialTracking.component.html',
	styleUrls: ['./materialTracking.component.css'],
})
export class materialTrackingComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.materialTrackingFormDialogComponent;
	componentName = ComponentsName.materialTracking;

	constructor(httpClient: HttpClient, public override database: MaterialTrackingService, private translate: TranslateService, toastr: ToastrService, public dialog: MatDialog) {
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
				cell: (element: MaterialTracking) => element.id,
			},
			{
				columnDef: 'material',
				header: 'أسم الخامة',
				cell: (element: MaterialTracking) => element.material,
			},
			{
				columnDef: 'quantity',
				header: 'الكمية',
				cell: (element: MaterialTracking) => element.quantity,
			},
			{
				columnDef: 'status',
				header: 'الحالة',
				cell: (element: MaterialTracking) => (element.status == IncomeOutcome.صادر ? 'صادر' : 'وارد'),
			},
			{
				columnDef: 'comment',
				header: 'ملاحظات',
				cell: (element: MaterialTracking) => element.comment,
			},
			{
				columnDef: 'createdBy',
				header: 'التسجيل بواسطة',
				cell: (element: MaterialTracking) => element.createdBy,
			},
			{
				columnDef: 'time-createdOn',
				header: 'وقت التسجيل',
				cell: (element: MaterialTracking) => element.createdOn,
			},
		];
	}

	public loadData() {
		this.database.getAllMaterialTracking();
	}
}
