import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServiceType} from '../interFaces/IserviceType';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class ServicesTypeService extends GenericService<ServiceType> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'ServiceType');
	}

	getAllServices() {
		this.loadingData.next(true);
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
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
