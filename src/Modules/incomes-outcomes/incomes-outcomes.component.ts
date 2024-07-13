import { Shift } from './interfaces/Ishift';
import { Component, inject, OnInit } from '@angular/core';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TransactionStatus } from '../shared/enums/TransactionStatus.enum';
import { MoneyTransactionService } from './services/Incomes-outcomes.service';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';

import { ShiftService } from './services/shift.service';

import { TransactionSource } from '../shared/enums/TransactionSource.emun';
import { IncomeOutcome } from './interfaces/Iincome-outcome';

@Component({
  selector: 'app-Incomes-outcomes',
  templateUrl: './Incomes-outcomes.component.html',
  styleUrls: ['./Incomes-outcomes.component.css'],
})
export class IncomesOutcomesComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.incomeOutcomeFormDialogComponent;
  componentName = ComponentsName.incomeOutcome;
  currentShift!: Shift | null;
  override databaseService = inject(MoneyTransactionService);
  _shiftService = inject(ShiftService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.getCurrentShift();
    this.tableCommunicationService.reloadTable$.subscribe(() => {
      this.loadData();
      this.getCurrentShift();
    });
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: IncomeOutcome) => element.id,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: IncomeOutcome) => element.amount,
      },
      {
        columnDef: 'status',
        header: 'الحالة',
        cell: (element: IncomeOutcome) => (element.status == TransactionStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'source',
        header: 'المصدر',
        cell: (element: IncomeOutcome) => (element.source == TransactionSource.IncomeOutcome ? 'اليومية' : 'البنك'),
      },
      {
        columnDef: 'comment',
        header: 'ملاحظات',
        cell: (element: IncomeOutcome) => element.comment,
      },
      {
        columnDef: 'createdBy',
        header: 'التسجيل بواسطة',
        cell: (element: IncomeOutcome) => element.createdBy,
      },
      {
        columnDef: 'time-createdOn',
        header: 'وقت التسجيل',
        cell: (element: IncomeOutcome) => element.createdOn,
      },
    ];
  }

  getCurrentShift() {
    this._shiftService.GetCurrentShift().subscribe({
      next: (response) => {
        this.currentShift = response.body;
      },
    });
  }
}
