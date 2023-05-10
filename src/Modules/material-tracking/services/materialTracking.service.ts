import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {MaterialTracking} from '../interfaces/materialTracking';
import {Response} from '../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class MaterialTrackingService extends GenericService<MaterialTracking> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'MaterialIncomeOutcome');
	}
	getAllMaterialTracking() {
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
