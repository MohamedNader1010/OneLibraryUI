import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';
import {Employee} from '../interFaces/Iemployee';
import {ToastrService} from 'ngx-toastr';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Employee');
	}

	getAllEmployees() {
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.loadingData.next(true);
				this.dataChange.next(data.body);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}
}
