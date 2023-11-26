import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { TransactionStatus } from '../../../shared/enums/TransactionStatus.enum';
import { ComponentsName } from '../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../shared/enums/forms-name.enum';
import { Bank } from '../../data/project-management/models/bank.model';
import { CommitmentAndDueTotal } from '../../data/project-management/models/commitment-and-due-total.model';
import { IncomeOutcome } from '../../data/project-management/models/income-outcome.model';
import { BankService } from '../../data/project-management/repositories/bank.service';
import { CommitmentAndDueService } from '../../data/project-management/repositories/commitment-and-due.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.bankFormDialogComponent;
  componentName = ComponentsName.Bank;
  bank!: Bank | null;
  defualtBankId: number = 3;
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
    this.getBankDtata();
    this._commitmentAndDueService.TotalCommitments().subscribe({
      next: (res) => (this.commitments = res.body),
    });
    this._commitmentAndDueService.TotalDues().subscribe({
      next: (res) => (this.dues = res.body),
    });
  }

  getBankDtata() {
    this.databaseService.GetById(this.defualtBankId).subscribe({
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
    this.databaseService.getAllBankTransactions(this.defualtBankId);
  }

  override handleNewRow = (message: string) => {
    this.getBankDtata();
    this.toastrService.success(message);
  };
}
