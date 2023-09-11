import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {Client} from './interFaces/Iclient';
import {ClientService} from './services/client.service';
import {ToastrService} from 'ngx-toastr';
import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';
import { TableCommonFunctionality } from '../shared/classes/tableCommonFunctionality';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { ComponentsName } from 'src/Modules/shared/enums/components.name.enum';
@Component({
  selector: 'app-all',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent extends TableCommonFunctionality implements OnInit, OnDestroy {
  formName = FormDialogNames.ClientFormDialogComponent;
  componentName = ComponentsName.client;
  constructor(override databaseService: ClientService, httpClient: HttpClient, toastrService: ToastrService, private _translateService: TranslateService) {
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
        cell: (element: Client) => element.id,
      },
      {
        columnDef: this._translateService.instant('form.name'),
        header: this._translateService.instant('form.name.label'),
        cell: (element: Client) => element.name,
      },
      {
        columnDef: this._translateService.instant('form.phoneNumber'),
        header: this._translateService.instant('form.phoneNumber.label'),
        cell: (element: Client) => element.phoneNumber,
      },
      {
        columnDef: this._translateService.instant('form.client.type'),
        header: this._translateService.instant('form.client.type.label'),
        cell: (element: Client) => element.clientType,
      },
      {
        columnDef: this._translateService.instant('form.client.total'),
        header: this._translateService.instant('form.client.total.label'),
        cell: (element: Client) => element.total,
      },
      {
        columnDef: this._translateService.instant('form.client.paid'),
        header: this._translateService.instant('form.client.paid.label'),
        cell: (element: Client) => element.paid,
      },
      {
        columnDef: this._translateService.instant('form.client.rest'),
        header: this._translateService.instant('form.client.rest.label'),
        cell: (element: Client) => element.rest,
      },
    ];
  }
}
