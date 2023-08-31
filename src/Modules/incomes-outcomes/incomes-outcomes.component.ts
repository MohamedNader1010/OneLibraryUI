import { Shift } from './interfaces/Ishift';
import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {FormDialogNames} from 'src/Persistents/enums/forms-name';
import {IncomeOutcomeStatus} from '../../Persistents/enums/IncomeOutcome.enum';
import {IncomesOutcomesService} from './services/Incomes-outcomes.service';
import {TranslateService} from '@ngx-translate/core';
import {TableCommonFunctionality} from '../shared/classes/tableCommonFunctionality';

import { ShiftService } from "./services/shift.service"

import { IncomeOutcomeSource } from "../../Persistents/enums/IncomeOutcomeSource.emun";
import { IncomeOutcome } from './interfaces/Iincome-outcome';

@Component({
  selector: 'app-Incomes-outcomes',
  templateUrl: './Incomes-outcomes.component.html',
  styleUrls: ['./Incomes-outcomes.component.css'],
})
export class IncomesOutcomesComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.incomeOutcomeFormDialogComponent;
  componentName = ComponentsName.incomeOutcome;
  currentShift!: Shift | null;

  constructor(
    httpClient: HttpClient,
    toastrService: ToastrService,
    override databaseService: IncomesOutcomesService,
    private _translateService: TranslateService,
    public dialog: MatDialog,
    private _shiftService: ShiftService,
  ) {
    super(httpClient, toastrService, databaseService);
  }
  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.getCurrentShift();
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
        cell: (element: IncomeOutcome) => (element.status == IncomeOutcomeStatus.صادر ? 'صادر' : 'وارد'),
      },
      {
        columnDef: 'source',
        header: 'المصدر',
        cell: (element: IncomeOutcome) => (element.source == IncomeOutcomeSource.IcoumeOutcome ? 'اليومية' : 'البنك'),
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

  override handleNewRow = (message: string) => {
    this.databaseService.dataChange.value.body.push(this.databaseService.DialogData);
    this.toastrService.success(message);
    this.getCurrentShift();
  };
}
