import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {FeedbackService} from './services/feedback.service';
import {Response} from '../shared/interfaces/Iresponse';
import {Feedback} from './interfaces/feedback';

@Component({
	selector: 'app-feadback',
	templateUrl: './feadback.component.html',
	styleUrls: ['./feadback.component.css'],
})
export class FeadbackComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.feedbackFormDialogComponent;
	componentName = ComponentsName.feedback;
	database!: FeedbackService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private toastr: ToastrService, private _feedback: FeedbackService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
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
		this.database = new FeedbackService(this.httpClient, this.toastr);
		this.database.getAllClientFeedbacks();
	}

	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}

	handleNewRow = (message: string) => {
		console.log(this._feedback.dialogData);

		this.database.dataChange.value.push(this._feedback.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._feedback.dialogData;
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
