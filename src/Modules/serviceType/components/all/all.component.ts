import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ServicesTypeService } from '../../services/serviceType.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceType } from '../../interFaces/IserviceType';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: ServiceType[];
	loading!: boolean;
	formName = FormDialogNames.ServiceTypeFormDialogComponent
	constructor(private dialogService: DialogServiceService, private _serviceType: ServicesTypeService, public dialog: MatDialog, private toastr: ToastrService) { }
	ngOnInit(): void {
		this.initiateTableHeaders()
		this.getAll();
		this.onDialogClosed()
	}
	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: any) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'نوع الخدمة',
				cell: (element: any) => element.name,
			},
		];
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe(_ => {
			this.getAll()
		})
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._serviceType.getAll().subscribe({
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
	handleDelete = (id: number) => this.subscriptions.push(this._serviceType.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
