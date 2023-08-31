import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../interfaces/Iresponse';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/genericCRUD.service';
@Injectable()
export class TableCommonFunctionality {
  tableColumns!: any[];
  destroy$ = new Subject<void>();

  constructor(public httpClient: HttpClient, public toastrService: ToastrService, public databaseService: GenericService<any>) {}

  handleNewRow = (message: string) => {
    if (this.databaseService.DialogData) (this.databaseService.dataChange.value as Response).body.push(this.databaseService.DialogData);
    this.toastrService.success(message);
  };

  handleEditRow = (data: Response) => {
    if (this.databaseService.DialogData) {
      const updatedElementIndex = (this.databaseService.dataChange.value as Response).body.findIndex((x: any) => x.id === data.body.id);
      (this.databaseService.dataChange.value as Response).body[updatedElementIndex] = this.databaseService.DialogData;
      this.databaseService.DialogData = null;
    }
    this.toastrService.success(data.message);
  };

  handleDelete = (data: Response) => {
    const deletedElementIndex = (this.databaseService.dataChange.value as Response).body.findIndex((x: any) => x.id === data.body.id);
    ((this.databaseService.dataChange.value as Response).body as []).splice(deletedElementIndex, 1);
    this.toastrService.success(data.message);
    this.databaseService.DialogData = null;
  };

  loadData() {
    this.databaseService.getAllDataForTable();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
