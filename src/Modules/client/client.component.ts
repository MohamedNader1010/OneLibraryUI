import { Component, OnInit, inject } from '@angular/core';
import { Client } from './interFaces/Iclient';
import { ClientService } from './services/client.service';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../shared/components/table/tableCommonFunctionality';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
@Component({
  selector: 'app-all',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent extends TableCommonFunctionality implements OnInit {
  formName = FormDialogNames.ClientFormDialogComponent;
  componentName = ComponentsName.client;
  override databaseService = inject(ClientService);

  ngOnInit(): void {
    this.initiateTableHeaders();
    this.loadPaginatedData();
    this.tableCommunicationService.reloadTable$.subscribe(() => this.loadPaginatedData());
  }
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
