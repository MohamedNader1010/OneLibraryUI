import { DestroyRef, inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../../services/genericCRUD.service';
import { PagingCriteria } from '../../interfaces/pagingCriteria';
import { TableCommunicationService } from './table-communication.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
@Injectable()
export class TableCommonFunctionality {
  public tableColumns!: any[];
  public destroyRef = inject(DestroyRef);
  public tableCommunicationService = inject(TableCommunicationService);
  public httpClient = inject(HttpClient);
  public toastrService = inject(ToastrService);
  public databaseService!: GenericService<any>;
  public translateService = inject(TranslateService);
  public dialog = inject(MatDialog);

  public loadData() {
    this.databaseService.getAllDataForTable();
  }

  public loadPaginatedData = () => {
    const pagingCriteria: PagingCriteria = {
      direction: 'desc',
      filter: '',
      orderBy: 'Id',
      pageIndex: 0,
      pageSize: 25,
    };
    this.databaseService.getPagedData(pagingCriteria).subscribe();
  };
}
