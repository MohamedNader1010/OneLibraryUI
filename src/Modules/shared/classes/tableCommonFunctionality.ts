import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../interfaces/IResponse.dto';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/genericCRUD.service';
import { PagingCriteria } from '../interfaces/pagingCriteria';
@Injectable()
export class TableCommonFunctionality {
  tableColumns!: any[];
  destroy$ = new Subject<void>();

  constructor(public httpClient: HttpClient, public toastrService: ToastrService, public databaseService: GenericService<any>) {}

  handleNewRow = (message: string) => {
    if (this.databaseService.DialogData) (this.databaseService.dataChange.value as ResponseDto).body.push(this.databaseService.DialogData);
    this.toastrService.success(message);
  };

  handleEditRow = (data: ResponseDto) => {
    if (this.databaseService.DialogData) {
      const updatedElementIndex = (this.databaseService.dataChange.value as ResponseDto).body.findIndex((x: any) => x.id === data.body.id);
      (this.databaseService.dataChange.value as ResponseDto).body[updatedElementIndex] = this.databaseService.DialogData;
      this.databaseService.DialogData = null;
    }
    this.toastrService.success(data.message);
  };

  handleDelete = (data: ResponseDto) => {
    const deletedElementIndex = (this.databaseService.dataChange.value as ResponseDto).body.findIndex((x: any) => x.id === data.body.id);
    ((this.databaseService.dataChange.value as ResponseDto).body as []).splice(deletedElementIndex, 1);
    this.toastrService.success(data.message);
    this.databaseService.DialogData = null;
  };

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  loadPaginatedData = () => {
    const pagingCriteria: PagingCriteria = {
      direction: 'desc',
      filter: '',
      orderBy: 'Id',
      pageIndex: 0,
      pageSize: 25,
    };
    this.databaseService.getPagedData(pagingCriteria).subscribe();
  };

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
