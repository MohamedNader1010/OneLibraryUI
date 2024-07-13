import { Shift } from './../../interfaces/Ishift';
import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from '../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../../../shared/components/table/tableCommonFunctionality';
import { ShiftService } from '../../services/shift.service';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css'],
})
export class ShiftsComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.shiftFormDialogComponent;
  componentName = ComponentsName.shift;
  override databaseService = inject(ShiftService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Shift) => `${element.id}`,
      },
      {
        columnDef: this.translateService.instant('table.startTime'),
        header: this.translateService.instant('table.startTime.label'),
        cell: (element: Shift) => element.startTime,
      },
      {
        columnDef: this.translateService.instant('table.endTime'),
        header: this.translateService.instant('table.endTime.label'),
        cell: (element: Shift) => element.endTime,
      },
      {
        columnDef: this.translateService.instant('table.startingBalance'),
        header: this.translateService.instant('table.startingBalance.label'),
        cell: (element: Shift) => element.startingBalance,
      },
      {
        columnDef: this.translateService.instant('table.totalIncome'),
        header: this.translateService.instant('table.totalIncome.label'),
        cell: (element: Shift) => element.totalDebit,
      },
      {
        columnDef: this.translateService.instant('table.totalOutcome'),
        header: this.translateService.instant('table.totalOutcome.label'),
        cell: (element: Shift) => element.totalCredit,
      },
      {
        columnDef: this.translateService.instant('table.closingBalance'),
        header: this.translateService.instant('table.closingBalance.label'),
        cell: (element: Shift) => element.closingBalance,
      },
      {
        columnDef: this.translateService.instant('table.createdBy'),
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: Shift) => element.createdBy,
      },
    ];
  }
}
