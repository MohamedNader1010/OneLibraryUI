import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {ServicesService} from '../../services/services.service';
import {Service} from '../../interfaces/Iservice';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Service[];
	loading!: boolean;
	constructor(private _service: ServicesService, public dialog: MatDialog, private toastr: ToastrService) {}
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Service) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Service) => element.name,
			},
			{
				columnDef: 'Material',
				header: 'الخامة',
				cell: (element: Service) => element.material,
			},
			{
				columnDef: 'Type',
				header: 'النوع',
				cell: (element: Service) => element.serviceType,
			},
		];
		this.getAll();
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => {
					this.tableData = data;
					console.log(data);
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
	handleDelete = (id: number) => this.subscriptions.push(this._service.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
