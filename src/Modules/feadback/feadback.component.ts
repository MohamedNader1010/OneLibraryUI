import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {FeedbackService} from './services/feedback.service';
import {Feedback} from './interfaces/feedback';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';
import { PaginationDto } from '../shared/interfaces/paginationDto';

@Component({
	selector: 'app-feadback',
	templateUrl: './feadback.component.html',
	styleUrls: ['./feadback.component.css'],
})
export class FeadbackComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
	tableColumns!: any[];
	loading!: boolean;
	formName = FormDialogNames.feedbackFormDialogComponent;
	componentName = ComponentsName.feedback;

	constructor(httpClient: HttpClient, toastr: ToastrService, public override database: FeedbackService, private translate: TranslateService, public dialog: MatDialog) {
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
				cell: (element: Feedback) => element.id,
			},
			{
				columnDef: 'cleint',
				header: 'أسم العميل',
				cell: (element: Feedback) => element.cleint,
			},
			{
				columnDef: 'feedBack',
				header: 'التعليق',
				cell: (element: Feedback) => element.feedBack,
			},
			{
				columnDef: 'time-feedBackDate',
				header: 'التاريخ',
				cell: (element: Feedback) => element.feedBackDate,
			},
		];
	}

	public loadData() {
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
