import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {TermService} from '../../services/term.service';

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
	constructor(private _term: TermService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: any) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: any) => element.name,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._term.getAll().subscribe((data: any) => {
				this.tableData = data;
				this.loading = false;
			})
		);
	}
	handleDelete = (id: number) => this.subscriptions.push(this._term.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
