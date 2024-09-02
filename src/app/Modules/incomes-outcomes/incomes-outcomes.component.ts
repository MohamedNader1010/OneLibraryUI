import { Component, inject, OnInit } from '@angular/core';
import { Transaction } from '../../core/data/models/money-transaction/ITransaction';
import { Shift } from '../../core/data/models/shift/Ishift';
import { MoneyTransactionService } from '../../core/data/services/money-transaction.service';
import { ShiftService } from '../../core/data/services/shift.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TransactionSource } from '../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-Incomes-outcomes',
  templateUrl: './Incomes-outcomes.component.html',
  styleUrls: ['./Incomes-outcomes.component.css'],
})
export class IncomesOutcomesComponent implements OnInit {
  formName = FormDialogNames.incomeOutcomeFormDialogComponent;
  componentName = ComponentsName.incomeOutcome;
  currentShift!: Shift | null;
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);
  databaseService = inject(MoneyTransactionService);
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

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Transaction) => element.id,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: Transaction) => element.amount,
      },
      {
        columnDef: 'status',
        header: 'الحالة',
        cell: (element: Transaction) => (element.status == TransactionStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'source',
        header: 'المصدر',
        cell: (element: Transaction) => (element.source == TransactionSource.daily ? 'اليومية' : 'البنك'),
      },
      {
        columnDef: 'comment',
        header: 'ملاحظات',
        cell: (element: Transaction) => element.comment,
      },
      {
        columnDef: 'createdBy',
        header: 'التسجيل بواسطة',
        cell: (element: Transaction) => element.createdBy,
      },
      {
        columnDef: 'time-createdOn',
        header: 'وقت التسجيل',
        cell: (element: Transaction) => element.createdOn,
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
