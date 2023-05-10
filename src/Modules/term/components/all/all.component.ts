import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {TermService} from '../../services/term.service';
import {TranslateService} from '@ngx-translate/core';

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
	constructor(private _term: TermService, private translate: TranslateService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
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
