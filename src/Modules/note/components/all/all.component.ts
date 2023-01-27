import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {Note} from './../../interfaces/Inote';
import {ToastrService} from 'ngx-toastr';
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
	constructor(private _note: NoteService, public dialog: MatDialog, private toastr: ToastrService) {}
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
				cell: (element: Note) => `${element.client.name}`,
			},
			{
				columnDef: 'term',
				header: 'الترم',
				cell: (element: Note) => `${element.term.name}`,
			},
			{
				columnDef: 'stage',
				header: 'المرحلة',
				cell: (element: Note) => `${element.stage.name}`,
			},
			{
				columnDef: 'quantity',
				header: 'الكمية',
				cell: (element: Note) => `${element.quantity}`,
			},
			{
				columnDef: 'actualPrice',
				header: 'السعر الفعلي',
				cell: (element: Note) => `${element.actualPrice}`,
			},
			{
				columnDef: 'teacherPrice',
				header: 'سعر المدرس',
				cell: (element: Note) => `${element.teacherPrice}`,
			},
			{
				columnDef: 'finalPrice',
				header: 'السعر النهائي',
				cell: (element: Note) => `${element.finalPrice}`,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._note.getAll().subscribe({
				next: (data) => {
					this.tableData = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
					this.loading = false;
				},
				complete: () => {
					this.loading = false;
				},
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._note.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
