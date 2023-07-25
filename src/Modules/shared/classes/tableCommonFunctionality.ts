import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Response } from '../interfaces/Iresponse';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GenericService } from '../services/genericCRUD.service';
@Injectable()
export class TableCommonFunctionality {
  subscriptions: Subscription[] = [];

  constructor(
    public httpClient: HttpClient,
    public toastr: ToastrService,
    public database: GenericService<any>
  ) {}

  handleNewRow = (message: string) => {
    if(this.database.DialogData)
    (this.database.dataChange.value as Response).body.push(this.database.DialogData);
    this.toastr.success(message);
  };

  handleEditRow = (data: Response) => {
    if(this.database.DialogData)
	(this.database.dataChange.value as Response).body[(this.database.dataChange.value as Response).body.findIndex((x: any) => x.id === data.body.id)] = this.database.DialogData;
    this.toastr.success(data.message);
    this.database.DialogData = null;
  };

  handleDelete = (data: Response) => {
    if(this.database.DialogData)
    (this.database.dataChange.value as Response).body.splice(
      (this.database.dataChange.value as Response).body.findIndex((x: any) => x.id === data),
      1
    );
    this.toastr.success(data.message);
    this.database.DialogData = null;
  };

  ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
