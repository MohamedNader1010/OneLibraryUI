import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Response} from '../interfaces/Iresponse';
import {Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {GenericService} from '../services/genericCRUD.service';
@Injectable()
export class TableCommonFunctionality {
	subscriptions: Subscription[] = [];

	constructor(public httpClient: HttpClient, public toastr: ToastrService, public database: GenericService<any>) {}

	handleNewRow = (message: string) => {
		if(this.database.DialogData)
      this.database.dataChange.value.push(this.database.DialogData);
      this.toastr.success(message);
      this.database.DialogData = null;
	};

	handleEditRow = (data: Response) => {
		this.database.dataChange.value[this.database.dataChange.value.findIndex((x: any) => x.id === data.body.id)] = this.database.DialogData;
		this.toastr.success(data.message);
    this.database.DialogData = null;
	};

	handleDelete = (data: Response) => {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x: any) => x.id === data),
			1
		);
		this.toastr.success(data.message);
    this.database.DialogData = null;
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
