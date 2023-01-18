import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {Note} from './../../interfaces/Inote';
@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: [];
	loading!: boolean;
	constructor(private _note: NoteService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: 'id',
				cell: (element: Note) => `${element.id}`,
			},
			{
				columnDef: 'name',
				header: 'name',
				cell: (element: Note) => `${element.name}`,
			},
			{
				columnDef: 'teacher',
				header: 'teacher',
				cell: (element: Note) => `${element.client.name}`,
			},
			{
				columnDef: 'term',
				header: 'term',
				cell: (element: Note) => `${element.term.name}`,
			},
			{
				columnDef: 'stage',
				header: 'stage',
				cell: (element: Note) => `${element.stage.name}`,
			},
			{
				columnDef: 'quantity',
				header: 'quantity',
				cell: (element: Note) => `${element.quantity}`,
			},
			{
				columnDef: 'actualPrice',
				header: 'actual Price',
				cell: (element: Note) => `${element.actualPrice}`,
			},
			{
				columnDef: 'teacherPrice',
				header: 'teacher Price',
				cell: (element: Note) => `${element.teacherPrice}`,
			},
			{
				columnDef: 'finalPrice',
				header: 'final Price',
				cell: (element: Note) => `${element.finalPrice}`,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._note.getAll().subscribe({
				next: (data: any) => {
					this.tableData = data;
				},
				complete: () => (this.loading = false),
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._note.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
