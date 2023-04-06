import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Material } from '../../interfaces/Imaterial';
import { MaterialService } from '../../services/material.service';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';


@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	tableColumns!: any[];
	tableData!: Material[];
	loading!: boolean;
	formName = FormDialogNames.MaterialFormDialogComponent;
	constructor(private dialogService: DialogServiceService, private _material: MaterialService, public dialog: MatDialog, private toastr: ToastrService) { }
	ngOnInit(): void {
		this.tableColumns = [
			{
				columnDef: 'id',
				header: '#',
				cell: (element: Material) => element.id,
			},
			{
				columnDef: 'Name',
				header: 'الأسم',
				cell: (element: Material) => element.name,
			},
			{
				columnDef: 'price',
				header: 'سعر الجملة',
				cell: (element: Material) => element.price,
			},
			{
				columnDef: 'CurrentQty',
				header: 'الكمية الحالية',
				cell: (element: Material) => element.quantity,
			},
		];
		this.onDialogClosed()
		this.getAll();
	}
	private onDialogClosed() {
		this.dialogService.onClose().subscribe(() => {
			this.getAll()
		})
	}
	getAll() {
		this.loading = true;
		this.subscriptions.push(
			this._material.getAll().subscribe({
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
	handleDelete = (id: number) => this.subscriptions.push(this._material.delete(id).subscribe(() => this.getAll()));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
