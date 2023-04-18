import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {Service} from '../service/interfaces/Iservice';
import {TableDataSource} from '../shared/classes/tableDataSource';
import {NoteService} from './services/note.service';
import {Response} from '../shared/interfaces/Iresponse';
import {Note} from './interfaces/Inote';

@Component({
	selector: 'app-note',
	templateUrl: './note.component.html',
	styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	formName = FormDialogNames.NoteFormDialogComponent;
	componentName = ComponentsName.note;
	database!: NoteService;
	dataSource!: TableDataSource;

	constructor(public httpClient: HttpClient, private toastr: ToastrService, private _note: NoteService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Note) => `${element.id}`,
			},
			{
				columnDef: 'name',
				header: 'الأسم',
				cell: (element: Note) => `${element.name}`,
			},
			{
				columnDef: 'teacher',
				header: 'المدرس',
				cell: (element: Note) => `${element.client}`,
			},
			{
				columnDef: 'term',
				header: 'الترم',
				cell: (element: Note) => `${element.term}`,
			},
			{
				columnDef: 'stage',
				header: 'المرحلة',
				cell: (element: Note) => `${element.stage}`,
			},
			{
				columnDef: 'actualPrice',
				header: 'السعر الفعلي',
				cell: (element: Note) => `${element.actualPrice}`,
			},
			{
				columnDef: 'originalPrice',
				header: 'سعر التكلفة',
				cell: (element: Note) => `${element.originalPrice}`,
			},
			{
				columnDef: 'earning',
				header: 'الربح',
				cell: (element: Note) => `${element.earning}`,
			},
			{
				columnDef: 'teacherPrice',
				header: 'ربح المدرس',
				cell: (element: Note) => `${element.teacherPrice}`,
			},
			{
				columnDef: 'finalPrice',
				header: 'السعر النهائي',
				cell: (element: Note) => `${element.finalPrice}`,
			},
			{
				columnDef: 'quantity',
				header: 'الكمية',
				cell: (element: Note) => `${element.quantity}`,
			},
		];
	}

	public loadData() {
		this.database = new NoteService(this.httpClient, this.toastr);
		this.database.getAllNotes();
	}

	public handleDelete(data: Response) {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	}

	handleNewRow = (message: string) => {
		console.log(this._note.dialogData);

		this.database.dataChange.value.push(this._note.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x) => x.id === data.body.id)] = this._note.dialogData;
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
