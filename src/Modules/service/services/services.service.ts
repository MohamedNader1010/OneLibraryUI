import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Service} from '../interfaces/Iservice';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class ServicesService extends GenericService<Service> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Service');
	}

	getAllServices() {
		this.loadingData.next(true);
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.dataChange.next(data);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}

	GetAllPriced = () => this.http.get<Response>(`${this.uri}/GetAllPriced`);

	deleteServiceMaterials = (ids: number[]) => this.http.delete<Response>(`${this.uri}DeleteServiceMaterials`, {body: ids});
}
