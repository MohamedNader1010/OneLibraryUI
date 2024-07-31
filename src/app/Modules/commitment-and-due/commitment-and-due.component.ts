import { Component, inject, OnInit } from '@angular/core';
import { CommitmentAndDue } from '../../core/data/models/commitment-and-due/Icommitment-and-due.interface';
import { CommitmentAndDueService } from '../../core/data/services/commitment-and-due.service';
import { TableDataSource } from '../../shared/components/table/tableDataSource';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TransactionType } from '../../shared/enums/TransactionType.enum';
import { ResponseDto } from '../../shared/interfaces/response.dto';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';

@Component({
  selector: 'app-commitmentAndDue',
  templateUrl: './commitment-and-due.component.html',
})
export class CommitmentAndDueComponent implements OnInit {
  formName = FormDialogNames.commitmentAndDueComponent;
  dataSource!: TableDataSource;
  componentName = ComponentsName.commitmentAndDue;
  databaseService = inject(CommitmentAndDueService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadData());
  }

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: CommitmentAndDue) => element.id,
      },
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
        cell: (element: CommitmentAndDue) => element.name,
      },
      {
        columnDef: 'amount',
        header: 'المبلغ',
        cell: (element: CommitmentAndDue) => element.amount,
      },
      {
        columnDef: this.translateService.instant('shared.rest.label'),
        header: this.translateService.instant('shared.rest'),
        cell: (element: CommitmentAndDue) => element.rest,
      },
      {
        columnDef: this.translateService.instant('shared.paid.label'),
        header: this.translateService.instant('shared.paid'),
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
        columnDef: this.translateService.instant('table.createdBy'),
        header: this.translateService.instant('table.createdBy.label'),
        cell: (element: CommitmentAndDue) => element.createdBy,
      },
      {
        columnDef: this.translateService.instant('table.createdAt'),
        header: this.translateService.instant('table.createdAt.label'),
        cell: (element: CommitmentAndDue) => element.createdOn,
      },
    ];
  }

  public handleTransaction(data: ResponseDto) {}
}
