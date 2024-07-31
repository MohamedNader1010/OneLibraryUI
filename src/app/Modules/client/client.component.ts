import { Component, OnInit, inject } from '@angular/core';
import { Client } from '../../core/data/models/client/Iclient';
import { ClientService } from '../../core/data/services/client.service';
import { ComponentsName } from '../../shared/enums/components.name.enum';
import { FormDialogNames } from '../../shared/enums/forms-name.enum';
import { TranslateService } from '@ngx-translate/core';
import { TableCommunicationService } from '../../shared/components/table/table-communication.service';
import { IPagingCriteria } from '../../core/data/interfaces/paging-criteria.interface';
@Component({
  selector: 'app-all',
  templateUrl: './client.component.html',
})
export class ClientComponent implements OnInit {
  formName = FormDialogNames.ClientFormDialogComponent;
  componentName = ComponentsName.client;
  databaseService = inject(ClientService);
  tableColumns!: any[];
  tableCommunicationService = inject(TableCommunicationService);
  translateService = inject(TranslateService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }

  loadPaginatedData = () => {
    const pagingCriteria: IPagingCriteria = {
      direction: 'desc',
      filter: '',
      orderBy: 'Id',
      pageIndex: 0,
      pageSize: 25,
    };
    this.databaseService.getPagedData(pagingCriteria).subscribe();
  };

  private initiateTableHeaders() {
    this.tableColumns = [
      {
        columnDef: this.translateService.instant('table.id'),
        header: this.translateService.instant('table.id.label'),
        cell: (element: Client) => element.id,
      },
      {
        columnDef: this.translateService.instant('form.name'),
        header: this.translateService.instant('form.name.label'),
        cell: (element: Client) => element.name,
      },
      {
        columnDef: this.translateService.instant('form.phoneNumber'),
        header: this.translateService.instant('form.phoneNumber.label'),
        cell: (element: Client) => element.phoneNumber,
      },
      {
        columnDef: this.translateService.instant('form.client.type'),
        header: this.translateService.instant('form.client.type.label'),
        cell: (element: Client) => element.clientType,
      },
      {
        columnDef: this.translateService.instant('form.client.total'),
        header: this.translateService.instant('form.client.total.label'),
        cell: (element: Client) => element.total,
      },
      {
        columnDef: this.translateService.instant('form.client.paid'),
        header: this.translateService.instant('form.client.paid.label'),
        cell: (element: Client) => element.paid,
      },
      {
        columnDef: this.translateService.instant('form.client.rest'),
        header: this.translateService.instant('form.client.rest.label'),
        cell: (element: Client) => element.rest,
      },
    ];
  }
}
