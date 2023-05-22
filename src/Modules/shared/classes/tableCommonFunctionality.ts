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
		this.database.dataChange.value.push(this.database.dialogData);
		this.toastr.success(message);
	};

	handleEditRow = (data: Response) => {
		console.log(data);

		this.database.dataChange.value[this.database.dataChange.value.findIndex((x: any) => x.id === data.body.id)] = this.database.dialogData;
		this.toastr.success(data.message);
	};

	handleDelete = (data: Response) => {
		this.database.dataChange.value.splice(
			this.database.dataChange.value.findIndex((x: any) => x.id === data),
			1
		);
		this.toastr.success(data.message);
	};

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
