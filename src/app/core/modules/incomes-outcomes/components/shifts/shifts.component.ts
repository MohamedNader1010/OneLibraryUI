import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommonFunctionality } from '../../../../../shared/classes/tableCommonFunctionality';
import { ComponentsName } from '../../../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../../../shared/enums/forms-name.enum';
import { Shift } from '../../../../data/project-management/models/shift.model';
import { ShiftService } from '../../../../data/project-management/repositories/shift.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css'],
})
export class ShiftsComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.shiftFormDialogComponent;
  componentName = ComponentsName.shift;
  constructor(override databaseService: ShiftService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
    super(httpClient, toastrService, databaseService);
  }
  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
        cell: (element: Shift) => `${element.id}`,
      },
      {
        columnDef: this._translateService.instant('table.startTime'),
        header: this._translateService.instant('table.startTime.label'),
        cell: (element: Shift) => element.startTime,
      },
      {
        columnDef: this._translateService.instant('table.endTime'),
        header: this._translateService.instant('table.endTime.label'),
        cell: (element: Shift) => element.endTime,
      },
      {
        columnDef: this._translateService.instant('table.startingBalance'),
        header: this._translateService.instant('table.startingBalance.label'),
        cell: (element: Shift) => element.startingBalance,
      },
      {
        columnDef: this._translateService.instant('table.totalIncome'),
        header: this._translateService.instant('table.totalIncome.label'),
        cell: (element: Shift) => element.totalIncome,
      },
      {
        columnDef: this._translateService.instant('table.totalOutcome'),
        header: this._translateService.instant('table.totalOutcome.label'),
        cell: (element: Shift) => element.totalOutcome,
      },
      {
        columnDef: this._translateService.instant('table.closingBalance'),
        header: this._translateService.instant('table.closingBalance.label'),
        cell: (element: Shift) => element.closingBalance,
      },
      {
        columnDef: this._translateService.instant('table.createdBy'),
        header: this._translateService.instant('table.createdBy.label'),
        cell: (element: Shift) => element.createdBy,
      },
    ];
  }

  override handleNewRow = (message: string) => {
    this.loadData();
  };
}
