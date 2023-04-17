import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
import { TableDataSource } from '../shared/classes/tableDataSource';
import { Material } from './interfaces/Imaterial';
import { MaterialService } from './services/material.service';
import { ComponentsName } from 'src/Persistents/enums/components.name';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-material',
	templateUrl: './material.component.html',
	styleUrls: ['./material.component.css'],
})
export class MaterialComponent extends TableCommonFunctionality implements OnInit, OnDestroy {

	tableColumns!: any[];
	tableData!: Material[];
	loading!: boolean;
	formName = FormDialogNames.MaterialFormDialogComponent;
	dataSource!: TableDataSource;
	componentName = ComponentsName.material;
	constructor(
		public override database: MaterialService, 
		public override httpClient: HttpClient, 
		public override toastr: ToastrService, 
		private translate: TranslateService
		) {
		super(httpClient, toastr, database)
	}

	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('form.id'),
				header: this.translate.instant('form.id.label'),
				cell: (element: Material) => element.id,
			},
			{
				columnDef: this.translate.instant('form.name'),
				header: this.translate.instant('form.name.label'),
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
	}

	public loadData() {
		this.database.getAllMaterials();
	}

}
