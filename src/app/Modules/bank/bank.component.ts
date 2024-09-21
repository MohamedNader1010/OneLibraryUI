import { Component, inject, OnInit } from '@angular/core';
import { Bank } from '../../core/data/models/bank/Ibank';
import { CommitmentAndDueTotal } from '../../core/data/models/commitment-and-due/Icommitment-and-due-total.interface';
import { Transaction } from '../../core/data/models/money-transaction/ITransaction';
import { BankService } from '../../core/data/services/bank.service';
import { CommitmentAndDueService } from '../../core/data/services/commitment-and-due.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { MoneyTransactionService } from '../../core/data/services/money-transaction.service';
import { forkJoin, switchMap } from 'rxjs';
import { TransactionStatusMapper } from '../../shared/mappers/transaction-status.mapper';
import { getEnumOptions } from '../../shared/utilities/enum.utility';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  formName = FormDialogNames.bankFormDialogComponent;
  componentName = ComponentsName.Bank;
  bankStatistics!: Bank | null;
  defaultBankId: number = 4;
  commitments: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;
  dues: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;
  databaseService = inject(MoneyTransactionService);
  #bankService = inject(BankService);
  #commitmentAndDueService = inject(CommitmentAndDueService);
  isHovered = false;
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  onMouseEnter() {
    this.isHovered = true;
  }

  onMouseLeave() {
    this.isHovered = false;
  }

  ngOnInit(): void {
    this.initiateTableHeaders();

    forkJoin([this.#commitmentAndDueService.TotalCommitments(), this.#commitmentAndDueService.TotalDues(), this.#bankService.GetStatisticsById(this.defaultBankId)]).subscribe({
      next: ([commitments, dues, statistics]) => {
        this.commitments = commitments.body;
        this.dues = dues.body;
        this.bankStatistics = statistics.body;
      },
    });

    this.databaseService.bankId = this.defaultBankId;
    this.tableCommunicationService.reloadTable$.pipe(switchMap(() => this.databaseService.getPagedData())).subscribe();

    this.tableCommunicationService.reloadTable$.next();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: 'Id',
        header: this.translateService.instant('table.id.label'),
        cell: (element: Transaction) => element.id,
      },
      {
        columnDef: 'Amount',
        header: 'المبلغ',
        cell: (element: Transaction) => element.amount,
      },
      {
        columnDef: 'Status',
        header: 'الحالة',
        cell: (element: Transaction) => TransactionStatusMapper.get(element.status),
        enumOptions: getEnumOptions(TransactionStatus, TransactionStatusMapper),
      },
      {
        columnDef: 'Comment',
        header: 'ملاحظات',
        cell: (element: Transaction) => element.comment,
      },
      {
        columnDef: 'CreatedBy',
        header: 'التسجيل بواسطة',
        cell: (element: Transaction) => element.createdBy,
      },
      {
        columnDef: 'CreatedOn',
        header: 'وقت التسجيل',
        cell: (element: Transaction) => element.createdOn,
      },
    ];
  }
}
