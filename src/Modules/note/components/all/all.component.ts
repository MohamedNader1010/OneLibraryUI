import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {Note} from './../../interfaces/Inote';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Note[];
	loading!: boolean;
	formName = FormDialogNames.NoteFormDialogComponent;
	constructor(private dialogService: DialogServiceService, private _note: NoteService, public dialog: MatDialog, private toastr: ToastrService, private router: Router, private route: ActivatedRoute) {}
	ngOnInit(): void {
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
		this.onDialogClosed();
		this.getAll();
	}

	private onDialogClosed() {
		this.dialogService.onClose().subscribe(_ => {
			this.getAll()
		})
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._note.getAll().subscribe({
				next: (res) => {
					if (res.body) {
						this.tableData = res.body;
					} else this.toastr.error(res.message);
				},
				error: (res) => {
					this.toastr.error(res.error.body.Message, res.error.message);
					this.loading = false;
				},
				complete: () => {
					this.loading = false;
				},
			})
		);
	}
	handleView(row: any) {
		this.router.navigate([`../details`], {queryParams: {id: row.id}, relativeTo: this.route});
	}
	handleDelete = (id: number) =>
		this.subscriptions.push(
			this._note.delete(id).subscribe({
				error: (res) => this.toastr.error(res.error.body.Message, res.error.message),
				complete: () => this.getAll(),
			})
		);
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
