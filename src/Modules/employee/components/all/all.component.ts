import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {EmployeeService} from '../../services/employee.service';
import {Employee} from './../../interFaces/Iemployee';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Employee[];
	loading!: boolean;
	constructor(private _employee: EmployeeService, public dialog: MatDialog, private toastr: ToastrService) {}
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
			this._employee.getAll().subscribe({
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
	handleDelete = (id: number) => this.subscriptions.push(this._employee.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
