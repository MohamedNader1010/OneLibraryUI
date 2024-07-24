import { Component, inject, OnInit } from '@angular/core';
import { Bank } from '../../core/data/models/bank/Ibank';
import { CommitmentAndDueTotal } from '../../core/data/models/commitment-and-due/Icommitment-and-due-total.interface';
import { Transaction } from '../../core/data/models/money-transaction/Iincome-outcome';
import { BankService } from '../../core/data/services/bank.service';
import { CommitmentAndDueService } from '../../core/data/services/commitment-and-due.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit {
  formName = FormDialogNames.bankFormDialogComponent;
  componentName = ComponentsName.Bank;
  bank!: Bank | null;
  defaultBankId: number = 3;
  commitments: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;
  dues: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;
  databaseService = inject(BankService);
  _commitmentAndDueService = inject(CommitmentAndDueService);
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
    this.loadData();
    this.getBankData();
    this._commitmentAndDueService.TotalCommitments().subscribe({
      next: (res) => (this.commitments = res.body),
    });
    this._commitmentAndDueService.TotalDues().subscribe({
      next: (res) => (this.dues = res.body),
    });

    this.tableCommunicationService.reloadTable$.subscribe(() => {
      console.log('reloading table');
      this.loadData();
      this.getBankData();
    });
  }

  getBankData() {
    this.databaseService.GetById(this.defaultBankId).subscribe({
      next: (response) => {
        this.bank = response.body;
      },
    });
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

  loadData() {
    this.databaseService.getAllBankTransactions(this.defaultBankId);
  }
}
