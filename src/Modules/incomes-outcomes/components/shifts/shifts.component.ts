import { HttpClient } from "@angular/common/http"
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core"
import { ToastrService } from "ngx-toastr"
import { ComponentsName } from "../../../../Persistents/enums/components.name"
import { FormDialogNames } from "../../../../Persistents/enums/forms-name"
import { TableCommonFunctionality } from "../../../shared/classes/tableCommonFunctionality"
import { ShiftService } from "../../services/shift.service"
import { Shift } from "../../interFaces/Ishift"

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class ShiftsComponent  extends TableCommonFunctionality implements OnInit, OnDestroy {
	formName = FormDialogNames.shiftFormDialogComponent;
	componentName = ComponentsName.shift;
	tableColumns!: any[];
	loading!: boolean;
	constructor(public override database: ShiftService, public override httpClient: HttpClient, public override toastr: ToastrService, private translate: TranslateService) {
		super(httpClient, toastr, database);
	}
	ngOnInit(): void {
		this.initiateTableHeaders();
		this.loadData();
	}

	private initiateTableHeaders() {
		this.tableColumns = [
			{
				columnDef: this.translate.instant('table.id'),
				header: this.translate.instant('table.id.label'),
				cell: (element: Shift) => `${element.id}`,
			},
			{
				columnDef: this.translate.instant('table.startTime'),
				header: this.translate.instant('table.startTime.label'),
				cell: (element: Shift) => element.startTime,
			},
			{
				columnDef: this.translate.instant('table.endTime'),
				header: this.translate.instant('table.endTime.label'),
				cell: (element: Shift) => element.endTime,
			},
			{
				columnDef: this.translate.instant('table.startingBalance'),
				header: this.translate.instant('table.startingBalance.label'),
				cell: (element: Shift) => element.startingBalance,
			},
			{
				columnDef: this.translate.instant('table.totalIncome'),
				header: this.translate.instant('table.totalIncome.label'),
				cell: (element: Shift) => element.totalIncome,
			},
			{
				columnDef: this.translate.instant('table.totalOutcome'),
				header: this.translate.instant('table.totalOutcome.label'),
				cell: (element: Shift) => element.totalOutcome,
			},
			{
				columnDef: this.translate.instant('table.closingBalance'),
				header: this.translate.instant('table.closingBalance.label'),
				cell: (element: Shift) => element.closingBalance,
			},
			{
				columnDef: this.translate.instant('table.createdBy'),
				header: this.translate.instant('table.createdBy.label'),
				cell: (element: Shift) => element.createdBy,
			},
		];
	}

	loadData() {
		this.loading = true;
		this.database.getAllShifts();
	}
	
	override handleNewRow = (message: string) => {
		this.loadData();
	};
}
