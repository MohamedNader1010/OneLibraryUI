import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ClientType} from '../../interFaces/IclientType';
import {ClientTypeService} from '../../services/clientType.service';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css'],
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: ClientType[];
	loading!: boolean; 
	formName = FormDialogNames.ClientTypeFormDialogComponent; 
	constructor(private dialogService: DialogServiceService ,private _clientType: ClientTypeService, public dialog: MatDialog, private toastr: ToastrService) {}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.getAll();
		this.onDialogClosed()
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe(_ => {
			this.getAll()
		})
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
				header: 'الأسم',
				cell: (element: any) => element.name,
			},
		];
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
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
	handleDelete = (id: number) => this.subscriptions.push(this._clientType.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
