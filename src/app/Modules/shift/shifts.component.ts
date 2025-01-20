import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Shift } from '../../core/data/models/shift/IShift';
import { ShiftService } from '../../core/data/services/shift.service';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
})
export class ShiftsComponent implements OnInit {
  formName = FormDialogNames.shiftFormDialogComponent;
  componentName = ComponentsName.shift;
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);
  databaseService = inject(ShiftService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: "Id",
        header: this.translateService.instant('table.id.label'),
        cell: (element: Shift) => `${element.id}`,
      },
      {
        columnDef: "StartTime",
        header: this.translateService.instant('table.startTime.label'),
        cell: (element: Shift) => element.startTime,
      },
      {
        columnDef: "EndTime",
        header: this.translateService.instant('table.endTime.label'),
        cell: (element: Shift) => element.endTime,
      },
      {
        columnDef: "StartingBalance",
        header: this.translateService.instant('table.startingBalance.label'),
        cell: (element: Shift) => element.startingBalance,
      },
      {
        columnDef: "TotalDebit",
        header: this.translateService.instant('table.totalIncome.label'),
        cell: (element: Shift) => element.totalDebit,
      },
      {
        columnDef: "TotalCredit",
        header: this.translateService.instant('table.totalOutcome.label'),
        cell: (element: Shift) => element.totalCredit,
      },
      {
        columnDef: "ClosingBalance",
        header: this.translateService.instant('table.closingBalance.label'),
        cell: (element: Shift) => element.closingBalance,
      },
      {
        columnDef: "CreatedBy",
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: Shift) => element.createdBy,
      },
    ];
  }
}
