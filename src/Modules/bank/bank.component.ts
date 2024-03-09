import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsName } from '../shared/enums/components.name.enum';
import { FormDialogNames } from '../shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { BankService } from './services/bank.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Bank } from './interfaces/Ibank';
import { TransactionStatus } from '../shared/enums/TransactionStatus.enum';
import { IncomeOutcome } from '../incomes-outcomes/interfaces/Iincome-outcome';
import { CommitmentAndDueTotal } from '../commitment-and-due/interfaces/Icommitment-and-due-total.interface';
import { CommitmentAndDueService } from '../commitment-and-due/services/commitment-and-due.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.bankFormDialogComponent;
  componentName = ComponentsName.Bank;
  bank!: Bank | null;
  defaultBankId: number = 3;
  commitments: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;
  dues: CommitmentAndDueTotal = {} as CommitmentAndDueTotal;

  constructor(
    httpClient: HttpClient,
    toastrService: ToastrService,
    override databaseService: BankService,
    private _translateService: TranslateService,
    private _commitmentAndDueService: CommitmentAndDueService,
    public dialog: MatDialog,
  ) {
    super(httpClient, toastrService, databaseService);
  }
  isHovered = false;

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
        columnDef: this._translateService.instant('table.id'),
        header: this._translateService.instant('table.id.label'),
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

  override loadData() {
    this.databaseService.getAllBankTransactions(this.defaultBankId);
  }

  override handleNewRow = (message: string) => {
    this.getBankData();
    this.toastrService.success(message);
  };
}
