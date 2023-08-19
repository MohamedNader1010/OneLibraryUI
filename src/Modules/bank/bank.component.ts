import { Component, OnDestroy, OnInit } from '@angular/core';
import { ComponentsName } from "../../Persistents/enums/components.name";
import { FormDialogNames } from "../../Persistents/enums/forms-name";
import { TableCommonFunctionality } from "../shared/classes/tableCommonFunctionality";
import { BankService } from "./services/bank.service";
import { HttpClient } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Bank } from "./interfaces/Ibank";
import { IncomeOutcomeStatus } from "../../Persistents/enums/IncomeOutcome.enum";
import { IncomeOutcome } from "../incomes-outcomes/interfaces/Iincome-outcome";

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  tableColumns!: any[];
  loading!: boolean;
  formName = FormDialogNames.bankFormDialogComponent;
  componentName = ComponentsName.Bank;
  bank!: Bank | null;
  defualtBankId: number = 3;

  constructor(httpClient: HttpClient, toastr: ToastrService, public override database: BankService, private translate: TranslateService, public dialog: MatDialog) {
    super(httpClient, toastr, database);
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
  }

  getBankDtata() {
    this.database.GetById(this.defualtBankId).subscribe({
      next: (response) => {
        this.bank = response.body;
      },
    });
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translate.instant('table.id'),
        header: this.translate.instant('table.id.label'),
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
        cell: (element: IncomeOutcome) => (element.status == IncomeOutcomeStatus.صادر ? 'صادر' : 'وارد'),
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

  public loadData() {
    this.database.getAllBankTransactions(this.defualtBankId);
  }

  override handleNewRow = (message: string) => {
    this.getBankDtata();
    this.toastr.success(message);
  };
}
