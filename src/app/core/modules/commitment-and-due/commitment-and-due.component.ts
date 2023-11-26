import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { TableCommonFunctionality } from '../../../shared/classes/tableCommonFunctionality';
import { TableDataSource } from '../../../shared/classes/tableDataSource';
import { TransactionType } from '../../../shared/enums/TransactionType.enum';
import { ComponentsName } from '../../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../../shared/enums/forms-name.enum';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { CommitmentAndDue } from '../../data/project-management/models/commitment-and-due.model';
import { CommitmentAndDueService } from '../../data/project-management/repositories/commitment-and-due.service';

@Component({
  selector: 'app-commitmentAndDue',
  templateUrl: './commitment-and-due.component.html',
  styleUrls: ['./commitment-and-due.component.css'],
})
export class CommitmentAndDueComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.commitmentAndDueComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.commitmentAndDue;
  constructor(override databaseService: CommitmentAndDueService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
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
        cell: (element: CommitmentAndDue) => element.id,
      },
      {
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: CommitmentAndDue) => element.name,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: CommitmentAndDue) => element.amount,
      },
      {
        columnDef: this._translateService.instant('shared.rest.label'),
        header: this._translateService.instant('shared.rest'),
        cell: (element: CommitmentAndDue) => element.rest,
      },
      {
        columnDef: this._translateService.instant('shared.paid.label'),
        header: this._translateService.instant('shared.paid'),
        cell: (element: CommitmentAndDue) => element.paid,
      },
      {
        columnDef: 'type',
        header: 'النوع',
        cell: (element: CommitmentAndDue) => TransactionType[element.type],
      },
      {
        columnDef: 'supplier',
        header: 'المورد',
        cell: (element: CommitmentAndDue) => element.supplier ?? '-',
      },
      {
        columnDef: 'employee',
        header: 'الموظف',
        cell: (element: CommitmentAndDue) => element.employee ?? '-',
      },
      {
        columnDef: 'comment',
        header: 'الملاحظات',
        cell: (element: CommitmentAndDue) => element.comment,
      },
      {
        columnDef: this._translateService.instant('table.createdBy'),
        header: this._translateService.instant('table.createdBy.label'),
        cell: (element: CommitmentAndDue) => element.createdBy,
      },
      {
        columnDef: this._translateService.instant('table.createdAt'),
        header: this._translateService.instant('table.createdAt.label'),
        cell: (element: CommitmentAndDue) => element.createdOn,
      },
    ];
  }

  public handleTransaction(data: ResponseDto) {
    this.handleEditRow(data);
  }
}
